from ninja import Router
from ninja.errors import HttpError

from typing import List

from ..utils import JSONResponse, message
from ..modules.project import ProjectCreation
from ..modules._schemas import ProjectCreationSchema


router = Router()


@router.post("/create", response=JSONResponse)
def create_project(request, project: ProjectCreationSchema):
    try:
        project_obj = ProjectCreation.objects.create(**project.dict())
        return message.success(text="project created", data=ProjectCreationSchema.from_orm(project_obj))
    except Exception as e:  # Assuming IntegrityError is imported
        return message.error(text=str(e))

@router.get("/list", response=List[ProjectCreationSchema])
def list_projects(request):
    projects = ProjectCreation.objects.all()
    return [ProjectCreationSchema.from_orm(project) for project in projects]
