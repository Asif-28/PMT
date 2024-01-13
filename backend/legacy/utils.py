from typing import Type
from pydantic import BaseModel, create_model
from mongoengine.fields import StringField, IntField, EmailField, BooleanField, Document, ListField, DictField, FloatField
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


def mongoengine_to_pydantic(db_model: Type[Document]) -> Type[BaseModel]:
    annotations = {}
    for field_name, field in db_model._fields.items():
        if isinstance(field, StringField):
            field_type = (str, ...)
        elif isinstance(field, IntField):
            field_type = (int, ...)
        elif isinstance(field, EmailField):
            field_type = (str, ...)
        elif isinstance(field, BooleanField):
            field_type = (bool, ...)
        elif isinstance(field, ListField):
            field_type = (list, ...)
        elif isinstance(field, DictField):
            field_type = (dict, ...)
        # Add more field types here as needed
        else:
            continue
        annotations[field_name] = field_type

    pydantic_model = create_model(db_model.__name__ + 'Pydantic', **annotations)
    return pydantic_model