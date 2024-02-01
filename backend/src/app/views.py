import logging
from django.http import HttpResponse
from django.shortcuts import redirect
from hashlib import md5

import time
import datetime
from .modules.project_survey_trace import ProjectSurveyTrace
from .modules.project import ProjectCreation
from .modules.project_client import ProjectClient
from .modules.project_vendor import ProjectVendor

from ._country_codes import countries
from .utils import get_request_ip
from .validators import validate_ipqualityscore


def get_survey(request):
    """
    # GET /survey?project_code=123&country_code=US&vendor_code=123&vendor_id=123&id_test=true
    is_test
    project_code
    country_code

    vendor_code
    vendor_id

    key = "test_|live_" (ip + project_code + country_code) -> md5
    """
    FRAUD_THRESHOLD = 70

    is_test = request.GET.get("is_test", False)
    project_code = request.GET["project_code"]
    country_code = request.GET["country_code"]
    vendor_code = request.GET["vendor_code"]
    vendor_id = request.GET["vendor_id"]

    try:
        project = ProjectCreation.objects.get(project_code=project_code)
    except Exception as e:
        return HttpResponse(f"project_code {project_code} dose not exist", status=400)

    # epoch time int UTC
    start_time = int(time.time())

    ip = get_request_ip(request)

    # Validate Request IP
    check = validate_ipqualityscore(ip, "r1LFO51aNeoubwpklFFjseJTqYlTNojF")
    logging.info(f"IPQualityScore: {check}")

    check_country = check["country_code"]

    if not is_test or project.security_check == False:
        # Bypass fraud check
        if check["fraud_score"] > FRAUD_THRESHOLD:
            logging.info(f"Fraud Score is too high: {check['fraud_score']} for {ip}")
            return HttpResponse(
                f"Fraud Score is too high: {check['fraud_score']} for {ip}", status=400
            )
        if check["vpn"] or check["tor"] or check["proxy"]:
            return HttpResponse("Proxy/VPN detected", status=400)

        try:
            project_client = ProjectClient.objects.get(
                index_key=f"{project_code}+{country_code}"
            )
            project_vendor = ProjectVendor.objects.get(
                index_key=f"{project_code}+{vendor_code}"
            )
        except Exception as e:
            return HttpResponse(f"Invalid Project Code or Vendor Code: {e}", status=400)


    if (
        project_vendor.pause_vendor == True
        or project_client.country_pause == True
        or project.status == "closed"
    ):
        return HttpResponse("Survey is paused", status=400)
    
    if countries[check_country] != project_client.country:
        logging.info(f"project_client.country: {project_client.country}")
        return HttpResponse(
            f"Country Code is invalid {countries[check_country]} {project_client.country}",
            status=400,
        )

    # Setup Index Key Hash for Survey Trace
    _key = md5(f"{ip}_{project_code}_{country_code}".encode()).hexdigest()
    if is_test:
        key = "test_" + _key
    else:
        key = "live_" + _key

    # Save Survey Trace to DB
    if ProjectSurveyTrace.objects.filter(key=key).exists():
        return HttpResponse(
            f"Survey Trace already exists by {ip} for {project_code}", status=400
        )

    ProjectSurveyTrace(
        key=key,
        test=is_test,
        start_time=start_time,
        project_code=project_code,
        country_code=country_code,
        vendor_code=project_vendor.vendor_code,
        vendor_id=vendor_id,
        ip_address=ip,
        fraud_score=check["fraud_score"],
        ip_proxy=check["proxy"],
        ip_region=check["region"],
        qc_remarks=check["message"],
        project_client=project_client,
        project_vendor=project_vendor,
    ).save()

    logging.info(f"Survey Trace: {key}")
    logging.info(f"Redirecting to: {project_client.live_link}")

    # return redirect(f"https://ipqualityscore.com/api/json/ip/{ip}?strictness=2&fast=1")
    if is_test:
        return redirect(project_client.test_link + f"&trans={key}")
    else:
        return redirect(project_client.live_link)


def complete_survey(request):
    """
    GET /complete_survey?key=123
    """
    key = request.GET.get("key", None)
    status = request.GET.get("status", None)

    if not key:
        return HttpResponse("Key is required", status=400)

    try:
        project_survey_trace = ProjectSurveyTrace.objects.get(key=key)
        if project_survey_trace.status == "complete":
            return HttpResponse("Survey already completed", status=400)

        project_survey_trace.objects.filter(key=key).update(
            status="complete", end_time=datetime.datetime.utcnow()
        )

    except Exception as e:
        return HttpResponse(f"Error: {e}", status=400)

    return HttpResponse("Survey Completed")
