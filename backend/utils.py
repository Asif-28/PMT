from bson.objectid import ObjectId
from fastapi import status
from fastapi.responses import JSONResponse

class BsonObjectId(ObjectId):
    @classmethod
    def __get_validators__(cls):
        yield cls.validate

    @classmethod
    def validate(cls, v) -> str:
        if not ObjectId.is_valid(v):
            raise ValueError("ObjectId is not valid")
        return str(v)


class Message:
    def __init__(self):
        ...

    @staticmethod
    def info(text: str, status: int = status.HTTP_200_OK) -> JSONResponse:
        return JSONResponse(
            content={"message": text, "level": "INFO"}, status_code=status
        )

    @staticmethod
    def error(text: str, status: int = status.HTTP_400_BAD_REQUEST) -> JSONResponse:
        return JSONResponse(
            content={"message": text, "level": "ERROR"}, status_code=status
        )

    @staticmethod
    def success(text: str, status: int = status.HTTP_200_OK) -> JSONResponse:
        return JSONResponse(
            content={"message": text, "level": "SUCESS"}, status_code=status
        )

    @staticmethod
    def warning(text: str, status: int = status.HTTP_200_OK) -> JSONResponse:
        return JSONResponse(
            content={"message": text, "level": "WARNING"}, status_code=status
        )


message = Message()
