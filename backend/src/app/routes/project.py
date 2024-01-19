from ninja import Router
from typing import List

from ..utils import JSONResponse, message
from ..modules.project import ProjectCreation
from ..modules.client import Client

from ..modules._schemas import ProjectCreationSchema


router = Router()


@router.post("/create", response=JSONResponse)
def create_project(request, project: ProjectCreationSchema):
    try:
        data = project.dict()
        client = Client.objects.get(name=data["client_name"])
        data["client"] = client

        project_obj = ProjectCreation(**data).save()
        return message.success(
            text="project created", data=ProjectCreationSchema.from_orm(project_obj)
        )
    except Exception as e:  # Assuming IntegrityError is imported
        return message.error(text=str(e))


@router.get("/list", response=List[ProjectCreationSchema])
def list_projects(request):
    projects = ProjectCreation.objects.all()
    return [ProjectCreationSchema.from_orm(project) for project in projects]
