from ninja import Router
from ..modules.vendor import Vendor
from ..modules._schemas import VendorSchema
from ..utils import JSONResponse, message

router = Router()


@router.get("/create", response=JSONResponse)
def create_client(request, vendor: VendorSchema):
    try:
        Vendor(**vendor.dict()).save()
        message.success(text="Vendor created successfully")
    except Exception as e:
        message.error(text=str(e))
