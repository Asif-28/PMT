import sys
sys.path.append("..")

import pymongo
from fastapi import APIRouter

from ..utils import message, JSONResponse
from ..models.project import Project
from ..database import db_projects

router = APIRouter()

@router.post("/project/create")
def create_project(project: Project) -> JSONResponse:
    """
    Create a new project
    """

    db_projects.create_index(project.index_key(), unique=True)

    try:
        db_projects.insert_one(project.model_dump())
        return message.success(text="Project created")
    except pymongo.errors.DuplicateKeyError:
        return message.error(text=f"Project {project.ProjectName} already exists.")


@router.get("/project/list")
def list_projects() -> list[Project]:
    """
    List all projects
    """

    projects = db_projects.find()
    return [Project(**project) for project in projects]