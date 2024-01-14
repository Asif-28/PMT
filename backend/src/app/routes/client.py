from ninja import Router
from ..modules.client import Client
from ..modules._schemas import ClientSchema
from ..utils import JSONResponse, message, objects_save

router = Router()


@router.post("/create", response=JSONResponse)
def create_client(request, client: ClientSchema):
    """
    Create a new client
    """
    return objects_save(Client, client.dict())


@router.get("/list", response=list[ClientSchema])
def list_clients(request):
    """
    List all clients
    """

    clients = Client.objects.all()
    return [ClientSchema.from_orm(client) for client in clients]
