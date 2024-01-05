from fastapi import APIRouter
from ..utils import message
from ..models.survey import GetSurvey, PostSurvey
from ..models.project import Project
from ..models.project_client import ProjectClient
from ..database import db_projects, db_clients
from .._country_codes import countries
from ..views import check_ip

router = APIRouter()
"""
Survey
"""


@router.get("/survey/start")
def get_survey(survey: GetSurvey):
    """
    Get survey details
    """
    # Survey
    # Check if project exists
    try:
        project = Project(**db_projects.find_one({"ProjectCode": survey.ProjectCode}))
        project_client = ProjectClient(**db_clients.find_one({"ProjectCode": survey.ProjectCode}))
    except Exception as e:
        return message.error(text=f"{e}")

    # Check if country exists
    if survey.CountryCode not in countries:
        return message.error(text="Country does not exist")

    # validate Ip
    data = check_ip(survey.Ip)
    if not isinstance(data, dict):
        return message.error(text="Invalid Ip")

    # Check if client exists
    data = PostSurvey(
        Ip=survey.Ip,
        Country=data["Country"],
        CountryCode=survey.CountryCode,
        ProjectCode=survey.ProjectCode,
        Loi=None,
        TransId=None,
        VendorId=None,
        VendorCode=None,
        Status=None,
        StartTime=None,  # Epoch time
        EndTime=None,  # Epoch time
        FraudScore=None,
    )

@router.post("/survey/end/{TransId}")
def end_survey(TransId: str):
    """
    End survey
    """
    # Survey
    # Check if project exists
    ...