from ninja import Router
from ..modules.client import Client
from ..modules._schemas import ClientSchema
from ..utils import JSONResponse, message, objects_save

router = Router()


@router.post("/create", response=JSONResponse)
def create_client(request, client: ClientSchema):
    return objects_save(Client, client.dict())
    # try:
    #     Client(**client.dict()).save()
    #     return message.success(text="Client created successfully")
    # except Exception as e:
    #     message.error(text=str(e))


@router.get("/list", response=list[ClientSchema])
def list_clients(request):
    """
    List all clients
    """

    clients = Client.objects.all()
    return [ClientSchema.from_orm(client) for client in clients]
