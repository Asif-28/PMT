from ..modules.project_client import ProjectClient
from ..modules._schemas import ProjectClientSchema
from ..utils import JSONResponse

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

    try:
        ProjectClient(**project_client.dict()).save()
        # return {"message": "project client created"}
        return 
    except Exception as e:
        return ProjectClientSchema()
        # raise HttpError(status_code=404,  message=str(e))



@router.get("/list")
def list_clients() -> list[ProjectClientSchema]:
    """
    List all clients
    """

    project_clients: list[ProjectClientSchema] = ProjectClient.objects.exclude("id").all()

    return [ProjectClientSchema(**client) for client in project_clients]
