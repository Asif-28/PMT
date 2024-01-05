from pydantic import BaseModel, Field
from typing import Optional
from mongoengine import Document, StringField, URLField, ReferenceField, CASCADE, BooleanField

from .project import ProjectCreationModel
from ..utils import mongoengine_to_pydantic

class ProjectClientModel(Document):
    project_code = StringField(required=True)  # This should match with ProjectCreation's project_code
    input_field = StringField(required=True)
    country = StringField(required=True)
    country_code = StringField(required=True)
    scope = StringField(required=True)
    test_link = URLField(required=True)
    live_link = URLField(required=True)
    check_country = BooleanField(required=True)
    # Add a reference to the ProjectCreationModel
    project_id = ReferenceField(ProjectCreationModel, reverse_delete_rule=CASCADE)

    @classmethod
    def index_key(cls):
        return "project_code"

ProjectClient = mongoengine_to_pydantic(ProjectClientModel)