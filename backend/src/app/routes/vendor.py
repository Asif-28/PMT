from ninja import Router
from ..modules.vendor import Vendor
from ..modules._schemas import VendorSchema
from ..utils import JSONResponse, message

from ninja import ModelSchema

router = Router()


class CreateVendorSchema(ModelSchema):
    class Meta:
        model = Vendor
        fields = "__all__"
        exclude = ["id"]


@router.post("/create", response=JSONResponse)
def create_client(request, vendor: CreateVendorSchema):
    try:
        Vendor(**vendor.dict()).save()
        return message.success(text="Vendor created successfully")
    except Exception as e:
        message.error(text=str(e))


@router.get("/list")
def list_clients(request) -> list[VendorSchema]:
    """
    List all clients
    """

    vendors = Vendor.objects.all()

    return [VendorSchema.from_orm(vendor) for vendor in vendors]
