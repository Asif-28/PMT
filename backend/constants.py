from dotenv import load_dotenv
from pydantic import BaseModel, Field
from typing import Optional

import os

load_dotenv()

MONGO_URI: str = os.getenv("MONGO_URI")
DB_NAME: str = os.getenv("DB_NAME")


class Message(BaseModel):
    message: str
    status_code: Optional[int] = Field(default=200)
    level: Optional[str] = Field(default="INFO") # INFO, WARNING, ERROR
