from django.http import HttpResponse
from django.shortcuts import redirect
from hashlib import md5

from .modules.project_survey_trace import ProjectSurveyTrace
from .utils import get_request_ip
from .validators import validate_ipqualityscore


def survey(request):
    # GET /survey?project_code=123&country_code=US&vendor_code=123&vendor_id=123
    """
    project_code
    country_code

    vendor_code
    vendor_id

    key = "test_|live_" (ip + project_code + country_code) -> md5
    """
    project_code = request.GET.get("project_code")
    country_code = request.GET.get("country_code")
    vendor_code = request.GET.get("vendor_code")
    vendor_id = request.GET.get("vendor_id")

    ip = get_request_ip(request)
    # validate ip
    valid = validate_ipqualityscore(ip, "r1LFO51aNeoubwpklFFjseJTqYlTNojF")

    key = md5(f"{ip}_{project_code}_{country_code}".encode()).hexdigest()

    ProjectSurveyTrace(
        project_code=project_code,
        country_code=country_code,
        vendor_code=vendor_code,
        vendor_id=vendor_id,
        key=key,
        ip_address=ip,
        fraud_score=valid["fraud_score"],
        ip_proxy=valid["proxy"],
        ip_region=valid["region"],
        qc_remarks=valid["message"],
    )
    return HttpResponse(f"{ip} - {valid}")

    # return redirect(f"https://ipqualityscore.com/api/json/ip/{ip}?strictness=2&fast=1")
