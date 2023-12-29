from fastapi import FastAPI

from models import Project, Client
from database import db
import pymongo
from constants import Message

app = FastAPI()


@app.post("/project/create")
async def create_project(project: Project) -> Message:
    """
    Create a new project
    """

    db_projects = db["Projects"]
    db_projects.create_index(project.index_key(), unique=True)

    try:
        db_projects.insert_one(project.model_dump())
        return Message(message="Project created", status_code=200)
    except pymongo.errors.DuplicateKeyError:
        return Message(message="Project already exists", status_code=400)
