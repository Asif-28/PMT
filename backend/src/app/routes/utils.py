from ninja import Router
from .._country_codes import countries
from ..utils import get_request_ip
from ninja.schema import Schema

router = Router()

""" Schemas """
class IPResponse(Schema):
    ip: str


""" Routes """

@router.get("/countries")
def list_countries(request):
    return countries

@router.get("/ip", response=IPResponse)
def get_ip(request):
    return IPResponse(ip=get_request_ip(request))
