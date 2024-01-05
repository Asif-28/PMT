from pydantic import BaseModel, Field
from typing import Optional

class ProjectClient(BaseModel):
    """
    ProjectCode relates to -> class Project
    """

    ProjectCode: str
    InputField: str
    Country: str
    CountryCode: str
    Scope: int
    TestLink: str
    LiveLink: str
    CheckCountry: bool

    @staticmethod
    def index_key() -> str:
        return "ProjectCode"
