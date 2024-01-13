from ninja import Router
from fastapi.responses import JSONResponse
from typing import List

from ..modules.project import ProjectCreation
from ..modules._schemas import ProjectCreationSchema


router = Router()


@router.post("/create")
def create_project(request, project: ProjectCreationSchema):
    try:
        project_obj = ProjectCreation.objects.create(**project.dict())
        return {"message": "Project created"}
    except Exception:  # Assuming IntegrityError is imported
        return {"error": f"Project {project.project_name} already exists."}

@router.get("/list", response=List[ProjectCreationSchema])
def list_projects(request):
    projects = ProjectCreation.objects.all()
    return [ProjectCreationSchema.from_orm(project) for project in projects]