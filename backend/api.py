# third prarty
from fastapi import FastAPI, status
import pymongo

# locals
from models import Project, Client
from database import db
from constants import message, JSONResponse
from _country_codes import countries


app = FastAPI()

"""
Project
"""


@app.post("/project/create")
async def create_project(project: Project) -> JSONResponse:
    """
    Create a new project
    """

    db_projects = db["Projects"]
    db_projects.create_index(project.index_key(), unique=True)

    try:
        db_projects.insert_one(project.model_dump())
        return message.success(text="Project created")
    except pymongo.errors.DuplicateKeyError:
        return message.error(text=f"Project {project.projectName} already exists.")


@app.get("/project/list")
async def list_projects() -> list[Project]:
    """
    List all projects
    """

    db_projects = db["Projects"]
    projects = db_projects.find()
    return [Project(**project) for project in projects]


"""
Client
"""


@app.post("/client/create")
async def create_client(client: Client) -> JSONResponse:
    """
    Create a new client
    """

    db_clients = db["Clients"]
    db_clients.create_index(client.index_key(), unique=True)

    try:
        db_clients.insert_one(client.model_dump())
        return message.success(text="Client created")
    except pymongo.errors.DuplicateKeyError:
        return message.error(text="Client already exists")


@app.get("/client/list")
async def list_clients() -> list[Client]:
    """
    List all clients
    """

    db_clients = db["Clients"]
    clients = db_clients.find()
    print(clients)
    return [Client(**client) for client in clients]

@app.get("/countries_code/get")
async def get_countries_code():
    """
    list of names of all countries with their 2 letter code
    """
    return countries