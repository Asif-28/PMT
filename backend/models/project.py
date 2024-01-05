from pydantic import BaseModel, validator

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
    SelectedDiv: str
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
