from ninja import Router
from typing import List

from ..utils import JSONResponse, message
from ..modules.project import ProjectCreation
from ..modules.client import Client

from ..modules._schemas import ProjectCreationSchema
from datetime import datetime as dt

router = Router()


@router.post("/create", response=JSONResponse)
def create_project(request, project: ProjectCreationSchema):
    """
    Create a new project -> Depends_on: Client
    """
    try:
        data = project.dict()
        client = Client.objects.get(name=data["client_name"])
        data["client"] = client

        ProjectCreation(**data).save()
        return message.success(text=f"Project {data['project_code']} created")
    except Exception as e:  # Assuming IntegrityError is imported
        return message.error(text=str(e))


@router.post("/update", response=JSONResponse)
def update_project(request, project_code: str, status: str, security_check: bool):
    """
    Create a new project -> Depends_on: Client
    """
    try:
        project = ProjectCreation.objects.get(project_code=project_code)
        project.status = status
        project.security_check = security_check
        project.save()
        return message.success(text=f"Project {project_code} updated")
    except Exception as e:  # Assuming IntegrityError is imported
        return message.error(text=str(e))


@router.get("/list", response=List[ProjectCreationSchema])
def list_projects(request):
    projects = ProjectCreation.objects.all()
    return [ProjectCreationSchema.from_orm(project) for project in projects]


@router.get("/generate_code")
def generate_code(request):
    """
    Generate a new project code
    """
    title = "QQ"
    try:
        dt_now = dt.now()
        total_projects = ProjectCreation.objects.count()
        code = f"{title}_{dt_now.month}{dt_now.year}_{total_projects+1}"
        return message.success(text=code)
    except Exception as e:
        return message.error(text=str(e))
