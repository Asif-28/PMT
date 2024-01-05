from pydantic import BaseModel, validator, Field
from typing import Optional


class Project(BaseModel):
    """
    Description: Project
    """
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
    SelectedDiv:str
    BillingComments: str

    @validator("IncidenceRate", pre=True, always=True)
    def append_percentage(cls, v):
        return f"{v}%"

    @validator("Loi", pre=True, always=True)
    def append_min(cls, v):
        return f"{v} Min"

    @validator("Target", pre=True, always=True)
    def validate_target(cls, v):
        # check if Target is one of those values
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
    CheckCountry:bool

    @staticmethod
    def index_key() -> str:
        return "ProjectCode"


class GetSurvey(BaseModel):
    """
    """
    Ip: str
    CountryCode: str
    ProjectCode: str
    VendorId: str
    VendorCode: str
    Test: bool = Field(default=False)


class PostSurvey(BaseModel):
    """
    """
    Ip: str
    Country: str  # Project Country
    CountryCode: str  # Project Country Code
    ProjectCode: str
    Loi: str
    TransId: str
    VendorId: str
    VendorCode: str
    Status: str
    FraudScore: int
    Proxy: bool
    StartTime: int  # Epoch time
    EndTime: int  # Epoch time
