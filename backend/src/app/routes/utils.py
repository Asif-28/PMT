from typing import Dict
from ninja import Router
from ninja.schema import Schema

from .._country_codes import countries
from ..utils import get_request_ip, uniq_md5_hash

router = Router()

""" Schemas """


class IPResponse(Schema):
    ip: str


class HashResponse(Schema):
    hash: str


""" Routes """


@router.get("/countries", response=Dict[str, str])
def list_countries(request):
    return countries


@router.get("/ip", response=IPResponse)
def get_ip(request):
    return IPResponse(ip=get_request_ip(request))


@router.get("/hash", response=HashResponse)
def get_hash(request):
    return HashResponse(hash=uniq_md5_hash())
