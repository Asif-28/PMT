from pydantic import BaseModel, validator
from typing import Optional


class Project(BaseModel):
    ProjectName: str
    ProjectCode: str
    ProjectManager: str
    ClientProjectManager: str
    IncidenceRate: str
    Loi: str
    Scope: int
    Target: str
    TargetDescription: str
    SelectedCountry: str
    Online: str
    SelectedDiv: str
    BillingComments: str

    @validator("IncidenceRate", pre=True, always=True)
    def append_percentage(cls, v):
        if v is not None:
            return f"{v}%"
        return v

    @validator("Loi", pre=True, always=True)
    def append_min(cls, v):
        if v is not None:
            return f"{v} Min"
        return v
    
    @validator("Target", pre=True, always=True)
    def validate_target(cls, v):
        # check if Target is one of those values
        if v is not None:
            if v not in ["HCP", "B2B", "B2C"]:
                raise ValueError("Target must be one of GenPop, B2B, B2C")
        return v

    @staticmethod
    def index_key() -> str:
        return "ProjectCode"


class Client(BaseModel):
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
    CheckCountry:str

    @staticmethod
    def index_key() -> str:
        return "ProjectCode"
