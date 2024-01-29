from django.http import HttpResponse
from django.shortcuts import redirect

from .modules.project_survey_trace import ProjectSurveyTrace
from .utils import get_request_ip


def survey(request):
    ip = get_request_ip(request)
    return redirect(f"https://ipqualityscore.com/api/json/ip/{ip}?strictness=2&fast=1")
