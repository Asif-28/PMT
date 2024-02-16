import time
import hashlib
from typing import Any
import random

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


def uniq_md5_hash(value: str = None, value_only: bool = True):
    value = value.encode() if value else None
    if value and value_only:
        return hashlib.md5(value).hexdigest()
    elif value:
        return hashlib.md5(value + str(time.time()).encode()).hexdigest()

    return hashlib.md5(str(time.time()).encode()).hexdigest()


def random_value(flag: str = "ip"):
    if flag == "ip":
        return ".".join(str(random.randint(0, 255)) for _ in range(4))


def dictfetchall(cursor):
    """Return all rows from a cursor as a dict"""
    columns = [col[0] for col in cursor.description]
    return [dict(zip(columns, row)) for row in cursor.fetchall()]
