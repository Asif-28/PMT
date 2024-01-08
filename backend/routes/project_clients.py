from fastapi import APIRouter
from ..utils import message, JSONResponse
from ..models.project_client import ProjectClient, ProjectClientModel


router = APIRouter()

"""
Client
"""

@router.post("/project_client/create")
def create_client(project_client: ProjectClient) -> JSONResponse:
    """
    Create a new client
    """

    try:
        ProjectClientModel(**project_client.dict()).save()
        return message.success(text="project_client created")
    except Exception as e:
        return message.error(text=f"{e}")


@router.get("/project_client/list/")
def list_clients() -> list[ProjectClient]:
    """
    List all clients
    """

    project_clients: list[ProjectClientModel] = ProjectClientModel.objects.exclude("id").all()

    return [ProjectClient(**client) for client in project_clients]
