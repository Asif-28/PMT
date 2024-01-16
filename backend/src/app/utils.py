from typing import Any
from ninja import Schema
from ninja.errors import HttpError


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
