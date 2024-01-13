from ..modules.project_client import ProjectClient
from ..modules.project import ProjectCreation
from ..modules._schemas import ProjectClientSchema
from ..utils import JSONResponse, message

from ninja import Router

router = Router()

"""
Client
"""


@router.post("/create", response=JSONResponse)
def create_client(project_client: ProjectClientSchema):
    """
    Create a new client
    """
    project_code = project_client.project_code
    project = ProjectCreation.objects.get(project_code=project_code)
    if not project:
        message.error(text="Project not found")
    data = project_client.dict()
    data["project"] = project

    try:
        ProjectClient(**data).save()
    except Exception as e:
        message.error(text=str(e))


@router.get("/list")
def list_clients() -> list[ProjectClientSchema]:
    """
    List all clients
    """

    project_clients: list[ProjectClientSchema] = ProjectClient.objects.exclude(
        "id"
    ).all()

    return [ProjectClientSchema(**client) for client in project_clients]
