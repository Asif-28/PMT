from pydantic import BaseModel, Field
from typing import Optional

class ProjectClient(BaseModel):
    """
    ProjectCode relates to -> class Project
    """

    Project: Optional[str] = Field(
        default=None,
        description="Relation with Project class its the mongo objectid of project collection, ignore this filed in UI.",
    )
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
