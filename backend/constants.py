from dotenv import load_dotenv
from pydantic import BaseModel

import os

load_dotenv()

MONGO_URI: str = os.getenv("MONGO_URI")
DB_NAME: str = os.getenv("DB_NAME")


class Message(BaseModel):
    message: str
    status_code: int = 200
