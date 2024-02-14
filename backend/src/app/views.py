import logging
from django.http import HttpResponse
from django.shortcuts import redirect
from hashlib import md5
from django.db.models import Count
from django.views.decorators.csrf import csrf_exempt, ensure_csrf_cookie
import time
import datetime
from .modules.project_survey_trace import ProjectSurveyTrace
from .modules.project import ProjectCreation
from .modules.project_client import ProjectClient
from .modules.project_vendor import ProjectVendor

from ._country_codes import countries
from .utils import get_request_ip, random_value
from .validators import validate_ipqualityscore


def get_survey(request):
    """
    # GET /survey?project_code=123&country_code=US&vendor_code=123&vendor_id=123&is_test=true
    is_test
    project_code
    country_code

    vendor_code
    vendor_id

    key = "test_|live_" (ip + project_code + country_code) -> md5
    """
    FRAUD_THRESHOLD = 70

    is_test: bool = request.GET.get("is_test", False)
    project_code = request.GET["project_code"]
    country_code = request.GET["country_code"]
    vendor_code = request.GET["vendor_code"]
    vendor_id = request.GET["vendor_id"]
    vpn_flag: bool = False

    ip = get_request_ip(request)

    if is_test:
        ip = random_value("ip")
        is_test = True

    # Setup Index Key Hash for Survey Trace
    _key_prefix = "test_" if is_test else "live_"
    key = _key_prefix + md5(f"{ip}_{project_code}_{country_code}".encode()).hexdigest()

    # Save Survey Trace to DB
    if ProjectSurveyTrace.objects.filter(key=key).exists():
        return HttpResponse(
            f"Survey Trace already exists by {ip} for {project_code}", status=400
        )

    # Validate Request IP
    if not is_test:
        check = validate_ipqualityscore(ip, "r1LFO51aNeoubwpklFFjseJTqYlTNojF")
    else:
        # Temprory Test Check
        check = {
            "fraud_score": 0,
            "message": "Test Survey",
            "country_code": "IN",
            "proxy": False,
            "region": "Test",
            "vpn": False,
            "tor": False,
        }

    logging.info(f"IPQualityScore: {check}")

    check_country = check["country_code"]

    try:
        project_client: ProjectClient = ProjectClient.objects.get(
            index_key=f"{project_code}+{country_code}"
        )

        project_vendor = ProjectVendor.objects.get(
            index_key=f"{project_code}+{vendor_code}"
        )
        project: ProjectCreation = ProjectCreation.objects.get(
            project_code=project_code
        )

    except Exception as e:
        return HttpResponse(f"Invalid Project Code or Vendor Code: {e}", status=400)

    # if not is_test or project.security_check == False:
    #     # Bypass fraud check
    #     if check["fraud_score"] > FRAUD_THRESHOLD:
    #         logging.info(f"Fraud Score is too high: {check['fraud_score']} for {ip}")
    #         return HttpResponse(
    #             f"Fraud Score is too high: {check['fraud_score']} for {ip}", status=400
    #         )

    if (
        project_vendor.pause_vendor == True
        or project_client.country_pause == True
        or project.status == "closed"
    ):
        return HttpResponse("Survey is paused", status=400)

    # if countries[check_country] != project_client.country:
    #     logging.info(f"project_client.country: {project_client.country}")
    #     return HttpResponse(
    #         f"Country Code is invalid {countries[check_country]} {project_client.country}",
    #         status=400,
    #     )

    if check["vpn"] or check["tor"] or check["proxy"]:
        vpn_flag = True

    if (
        vpn_flag == True
        or check["fraud_score"] > FRAUD_THRESHOLD
        or countries[check_country] != project_client.country
    ):
        status = "terminated"
        qc_remarks = "DFP Terminated"
    else:
        status = "insurvey"
        qc_remarks = check["message"]

    if is_test:
        status = "insurvey"
        qc_remarks = "Test Survey"

    # Check country Quota
    if project_client.check_quota == True:
        project_quota_count: int = ProjectSurveyTrace.objects.filter(
            project_code=project_code,
            status="complete",
            country_code=country_code,
            # test=False,
        ).aggregate(complete_count=Count("id"))["complete_count"]

        if project_quota_count >= project_client.scope:
            return HttpResponse("Country Quota is achived", status=200)

    # Check Vendor Quota
    if project_vendor.pause_vendor == False:
        project_vendor_quota_count: int = ProjectSurveyTrace.objects.filter(
            project_code=project_code,
            vendor_code=vendor_code,
            status="complete",
            # test=False,
        ).aggregate(complete_count=Count("id"))["complete_count"]

        if project_vendor_quota_count >= project_vendor.scope:
            return HttpResponse("Vendor Quota is achived", status=200)

    # Check Project Quota
    if (
        ProjectSurveyTrace.objects.filter(
            project_code=project_code,
            status="complete",
            # test=False,
        ).aggregate(complete_count=Count("id"))["complete_count"]
        >= project.scope
    ):
        return HttpResponse("Project Quota is achived", status=200)

    # Save Survey Trace
    ProjectSurveyTrace(
        key=key,
        status=status,
        test=is_test,
        project_code=project_code,
        country_code=country_code,
        country=project_client.country,
        vendor_code=project_vendor.vendor_code,
        vendor_id=vendor_id,
        ip_address=ip,
        fraud_score=check["fraud_score"],
        ip_proxy=check["proxy"],
        ip_region=check["region"],
        qc_remarks=qc_remarks,
        project_client=project_client,
        project_vendor=project_vendor,
    ).save()

    logging.info(f"Survey Trace: {key}")

    if vpn_flag and is_test == False:
        return redirect("https://www.google.com")

    # return redirect(f"https://ipqualityscore.com/api/json/ip/{ip}?strictness=2&fast=1")
    redirect_url = project_client.test_link if is_test else project_client.live_link
    redirect_url = redirect_url.replace("{trans_id}", key)
    logging.info(f"Redirecting to: {redirect_url}")

    return redirect(f"{redirect_url}")


def complete_survey(request):
    """
    GET /survey/status?key=123&status=complete
    """
    key = request.GET.get("key", None)
    status = request.GET.get("status", None)

    if not key:
        return HttpResponse("Key is required", status=400)

    try:
        project_survey_trace = ProjectSurveyTrace.objects.get(key=key)
        project_vendor = project_survey_trace.project_vendor
    except Exception as e:
        return HttpResponse(f"Error: {e}", status=400)

    if project_survey_trace.status != "insurvey":
        return HttpResponse(
            f"Survey Trace is already: {project_survey_trace.status}",
            status=400,
        )

    valid_status = {
        "terminate": project_vendor.terminate,
        "overquota": project_vendor.over_quota,
        "complete": project_vendor.complete,
    }

    if status not in valid_status.keys():
        return HttpResponse(f"Invalid status: {status}", status=400)
    else:
        redirect_url = valid_status[status]
        if status == "terminate":
            ProjectSurveyTrace.objects.filter(key=key).update(
                status=status,
                end_time=datetime.datetime.utcnow(),
                qc_remarks="Client Terminat",
            )
        else:
            ProjectSurveyTrace.objects.filter(key=key).update(
                status=status, end_time=datetime.datetime.utcnow()
            )

    redirect_url = redirect_url.replace("{vendor_id}", project_survey_trace.vendor_id)
    logging.info(f"Redirecting to: {redirect_url}")

    return redirect(redirect_url)

@csrf_exempt
@ensure_csrf_cookie
def health(request):
    return HttpResponse("OK", status=200)