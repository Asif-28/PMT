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
def create_client(request, project_client: ProjectClientSchema):
    """
    Create a project client -> Depends_on: ProjectCreation
    """
    project_code = project_client.project_code
    try:
        project = ProjectCreation.objects.get(project_code=project_code)
    except Exception as e:
        raise message.error(text=str(e))

    if not project:
        message.error(text="Project not found")
    data = project_client.dict()
    data["project"] = project

    try:
        ProjectClient(**data).save()
        return message.success(text="Project Client created successfully")
    except Exception as e:
        message.error(text=str(e))


@router.get("/list")
def list_clients(request) -> list[ProjectClientSchema]:
    """
    List all clients
    """

    project_clients = ProjectClient.objects.all()

    return [ProjectClientSchema.from_orm(p_client) for p_client in project_clients]
