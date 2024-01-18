from ninja import Router
from .._country_codes import countries
from ..utils import get_request_ip, uniq_md5_hash
from ninja.schema import Schema

router = Router()

""" Schemas """


class IPResponse(Schema):
    ip: str


class CountriesSchema(Schema):
    name: str
    code: str


class HashResponse(Schema):
    hash: str


""" Routes """


@router.get("/countries", response=list[CountriesSchema])
def list_countries(request):
    return countries


@router.get("/ip", response=IPResponse)
def get_ip(request):
    return IPResponse(ip=get_request_ip(request))


@router.get("/hash", response=HashResponse)
def get_hash(request):
    return HashResponse(hash=uniq_md5_hash())
