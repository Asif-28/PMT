from typing import Any
from ninja import Schema
from ninja.errors import HttpError
import time
import hashlib


class JSONResponse(Schema):
    message: str
    status_code: int
    data: Any = None


class Message:
    def __init__(self):
        ...

    def success(self, text: str, data: Any = None) -> JSONResponse:
        return JSONResponse(message=text, status_code=200, data=data)

    def info(self, text: str, data: Any = None) -> JSONResponse:
        return JSONResponse(message=text, status_code=200, data=data)

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


def uniq_md5_hash():
    return hashlib.md5(str(time.time()).encode()).hexdigest()
