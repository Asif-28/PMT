from pydantic import BaseModel, Field


class GetSurvey(BaseModel):
    """ """

    Ip: str
    CountryCode: str
    ProjectCode: str
    VendorId: str
    VendorCode: str
    Test: bool = Field(default=False)


class PostSurvey(BaseModel):
    """ """

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
