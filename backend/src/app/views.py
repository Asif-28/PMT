from django.http import HttpResponse
from django.shortcuts import redirect

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

    ip = get_request_ip(request)
    # validate ip
    valid = validate_ipqualityscore(ip, "r1LFO51aNeoubwpklFFjseJTqYlTNojF")

    ProjectSurveyTrace()
    return HttpResponse(f"{ip} - {valid}")

    # return redirect(f"https://ipqualityscore.com/api/json/ip/{ip}?strictness=2&fast=1")
