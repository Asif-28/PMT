from dotenv import load_dotenv
from fastapi import status
from fastapi.responses import JSONResponse

import os

load_dotenv()

MONGO_URI: str = os.getenv("MONGO_URI")
DB_NAME: str = os.getenv("DB_NAME")


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
