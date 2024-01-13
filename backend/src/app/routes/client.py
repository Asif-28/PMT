from ninja import Router
from ..modules.client import Client
from ..modules._schemas import ClientSchema
from ..utils import JSONResponse, message

router = Router()


@router.get("/create", response=JSONResponse)
def create_client(request, client: ClientSchema):
    try:
        Client(**client.dict()).save()
        message.success(text="Client created successfully")
    except Exception as e:
        message.error(text=str(e))
