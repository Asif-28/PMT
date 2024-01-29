import time
import hashlib
from typing import Any

from requests import Session
from ninja import Schema
from ninja.errors import HttpError


class JSONResponse(Schema):
    detail: str
    status_code: int
    data: Any = None


class Message:
    def __init__(self):
        ...

    def success(self, text: str, data: Any = None) -> JSONResponse:
        return JSONResponse(detail=text, status_code=200, data=data)

    def info(self, text: str, data: Any = None) -> JSONResponse:
        return JSONResponse(detail=text, status_code=200, data=data)

    def error(self, text: str) -> JSONResponse:
        raise HttpError(status_code=400, message=text)


message = Message()

request_session = Session()


def objects_save(obj, data):
    try:
        obj(**data).save()
        return message.success(text=f"Created {obj.__name__} successfully")
    except Exception as e:
        raise message.error(text=str(e))


def get_request_ip(request):
    # Try to get the real IP by checking the 'HTTP_X_FORWARDED_FOR' header
    x_forwarded_for = request.META.get("HTTP_X_FORWARDED_FOR")
    if x_forwarded_for:
        ip = x_forwarded_for.split(",")[
            0
        ]  # In case there is a 'forwarded for' chain, take the first one
    else:
        ip = request.META.get(
            "REMOTE_ADDR"
        )  # Otherwise, use the standard 'REMOTE_ADDR'
    return ip


def validate_ipqualityscore(ip, api_key):
    """
    Validate IP address using IPQualityScore API
    example response:
        {
        "success": true,
        "message": "Success",
        "fraud_score": 100,
        "country_code": "AT",
        "region": "Vienna",
        "city": "Vienna",
        "ISP": "Aeza International",
        "ASN": 210644,
        "organization": "Aeza International",
        "is_crawler": false,
        "timezone": "Europe\/Vienna",
        "mobile": false,
        "host": "tor-exit.node",
        "proxy": true,
        "vpn": true,
        "tor": true,
        "active_vpn": false,
        "active_tor": true,
        "recent_abuse": true,
        "bot_status": true,
        "connection_type": "Premium required.",
        "abuse_velocity": "Premium required.",
        "zip_code": "N\/A",
        "latitude": 48.2,
        "longitude": 16.37,
        "request_id": "KbbpJg7pk9"
    }
    """
    return request_session.get(
        f"https://ipqualityscore.com/api/json/ip/{api_key}/{ip}?strictness=2&fast=1"
    ).json()


def uniq_md5_hash():
    return hashlib.md5(str(time.time()).encode()).hexdigest()
