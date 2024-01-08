from fastapi import APIRouter

from ..utils import message, JSONResponse
from ..models.project_client import ProjectClient
from ..database import db_project_clients
import pymongo


router = APIRouter()

"""
Client
"""

@router.post("/project_client/create")
def create_client(project_client: ProjectClient) -> JSONResponse:
    """
    Create a new client
    """

    db_project_clients.create_index(project_client.index_key(), unique=True)

    try:
        model = project_client.model_dump()
        # add one to 
        db_project_clients.insert_one()
        return message.success(text="Client created")
    except pymongo.errors.DuplicateKeyError:
        return message.error(text="Client already exists")


@router.get("/project_client/list/")
def list_clients() -> list[ProjectClient]:
    """
    List all clients
    """

    project_clients = db_project_clients.find()
    print(project_clients)
    return [ProjectClient(**client) for client in project_clients]
