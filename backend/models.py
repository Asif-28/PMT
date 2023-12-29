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
    SelectedOption: str
    TargetDescription: str
    SelectedCountry: str
    OnlineOffline: str
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

    @staticmethod
    def index_key() -> str:
        return "ProjectCode"


class Client(BaseModel):
    ProjectCode: str
    InputField: str
    Country: str
    CountryCode: str
    Scope: int
    TestLink: str
    LiveLink: str

    @staticmethod
    def index_key() -> str:
        return "ProjectCode"
