from ninja import Router, Schema
from ninja.errors import HttpError
# from fastapi.responses import JSONResponse
from typing import List, Dict

from ..modules.project import ProjectCreation
from ..modules._schemas import ProjectCreationSchema


router = Router()


@router.post("/create")
def create_project(request, project: ProjectCreationSchema):
    try:
        project_obj = ProjectCreation.objects.create(**project.dict())
        return {"message": "Project created successfully"}
    except Exception as e:  # Assuming IntegrityError is imported
        raise HttpError(status_code=404,  message=str(e))

@router.get("/list", response=List[ProjectCreationSchema])
def list_projects(request):
    projects = ProjectCreation.objects.all()
    return [ProjectCreationSchema.from_orm(project) for project in projects]
