from ninja import Router
from ..modules.client import Client
from ..modules._schemas import ClientSchema
from ..utils import JSONResponse, message

router = Router()


@router.get("/create", response=JSONResponse)
def create_client(request, client: ClientSchema):
    try:
        Client(**client.dict()).save()
        return message.success(text="Client created successfully")
    except Exception as e:
        message.error(text=str(e))


@router.get("/list")
def list_clients() -> list[ClientSchema]:
    """
    List all clients
    """

    clients: list[ClientSchema] = Client.objects.exclude("id").all()

    return [ClientSchema(**client) for client in clients]
