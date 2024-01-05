import mongoengine
from fastapi import APIRouter

from ..utils import message, JSONResponse
from ..models.project import Project, ProjectCreationModel
from ..database import db_projects

router = APIRouter()

@router.post("/project/create")
def create_project(project: Project) -> JSONResponse:
    """
    Create a new project
    """
    # ProjectCreationModel.create_index(ProjectCreationModel.index_key(), unique=True)

    try:
        ProjectCreationModel(**project.dict()).save()
        return message.success(text="Project created")
    except mongoengine.errors.NotUniqueError:
        return message.error(text=f"Project {project.project_name} already exists.")


@router.get("/project/list")
def list_projects() -> list[Project]:
    """
    List all projects
    """

    projects: list[ProjectCreationModel] = ProjectCreationModel.objects.exclude("id").all()
    
    return [Project(**project.to_mongo().to_dict()) for project in projects]
