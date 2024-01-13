from ninja import Router
from ..modules.vendor import Vendor
from ..modules._schemas import VendorSchema
from ..utils import JSONResponse, message

router = Router()


@router.post("/create", response=JSONResponse)
def create_client(request, vendor: VendorSchema):
    try:
        Vendor(**vendor.dict()).save()
        return message.success(text="Vendor created successfully")
    except Exception as e:
        message.error(text=str(e))


@router.get("/list")
def list_clients() -> list[VendorSchema]:
    """
    List all clients
    """

    vendors: list[VendorSchema] = Vendor.objects.exclude("id").all()

    return [VendorSchema(**vendor) for vendor in vendors]
