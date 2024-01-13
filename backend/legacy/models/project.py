from fastapi import HTTPException
from mongoengine import Document, StringField, IntField, BooleanField

from ..utils import mongoengine_to_pydantic

class ProjectCreationModel(Document):
    """
    Create a new Project model.
    """
    project_name = StringField(required=True)
    project_code = StringField(required=True, unique=True, index=True)
    project_manager = StringField(required=True)
    client_project_manager = StringField(required=True)
    incidence_rate = StringField(required=True)
    loi = StringField(required=True)
    scope = IntField(required=True)
    target = StringField(required=True)
    target_description = StringField(required=True)
    selected_project_status = StringField(required=True)
    online = StringField(required=True)
    selected_div = StringField(required=True)
    billing_comments = StringField(required=True)
    security_check = BooleanField(required=True)
    # Define the meta dictionary
    

    def clean(self):
        """
        Clean the data before saving it to the database.
        """
        # Validate incidence_rate
        if not self.incidence_rate.endswith('%'):
            self.incidence_rate = f"{self.incidence_rate}%"

        # Validate loi
        if not self.loi.endswith(' Min'):
            self.loi = f"{self.loi} Min"

        # Validate target
        if self.target not in ["HCP", "B2B", "B2C"]:
            raise HTTPException(status_code=400, detail="'target' must be one of HCP, B2B, B2C")

    @classmethod
    def index_key(cls):
        return "project_code"


Project = mongoengine_to_pydantic(ProjectCreationModel)

