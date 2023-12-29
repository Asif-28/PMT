from fastapi import FastAPI, Response, status

from models import Project, Client
from database import db
import pymongo

# from constants import Message

app = FastAPI()


@app.post("/project/create")
async def create_project(project: Project) -> Response:
    """
    Create a new project
    """

    db_projects = db["Projects"]
    db_projects.create_index(project.index_key(), unique=True)

    try:
        db_projects.insert_one(project.model_dump())
        return Response(content="Project created", status_code=status.HTTP_200_OK)
    except pymongo.errors.DuplicateKeyError:
        return Response(
            content="Project already exists", status_code=status.HTTP_400_BAD_REQUEST
        )


@app.post("/client/create")
async def create_client(client: Client) -> Response:
    """
    Create a new client
    """

    db_clients = db["Clients"]
    db_clients.create_index(client.index_key(), unique=True)

    try:
        db_clients.insert_one(client.model_dump())
        return Response(content="Client created", status_code=status.HTTP_200_OK)
    except pymongo.errors.DuplicateKeyError:
        return Response(
            content="Client already exists", status_code=status.HTTP_400_BAD_REQUEST
        )
