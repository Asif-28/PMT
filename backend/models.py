from pydantic import BaseModel, validator
from typing import Optional


class Project(BaseModel):
    projectName: str
    projectCode: str
    projectManager: str
    clientProjectManager: str
    incidenceRate: str
    loi: str
    scope: int
    selectedOption: str
    targetDescription: str
    selectedCountry: str
    onlineOffline: str
    selectedDiv: str
    billingComments: str

    @validator("incidenceRate", pre=True, always=True)
    def append_percentage(cls, v):
        if v is not None:
            return f"{v}%"
        return v

    @validator("loi", pre=True, always=True)
    def append_min(cls, v):
        if v is not None:
            return f"{v} Min"
        return v

    @staticmethod
    def index_key() -> str:
        return "projectCode"


class Client(BaseModel):
    projectCode: str
    inputField: str
    selectedCountry: str
    countryCode: str
    scope: int
    testLink: str
    liveLink: str

    @staticmethod
    def index_key() -> str:
        return "projectCode"
