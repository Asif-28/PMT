from .project import ProjectCreation
from .client import Client
from .project_client import ProjectClient
from .vendor import Vendor

from ninja import ModelSchema


class ProjectCreationSchema(ModelSchema):
    class Meta:
        model = ProjectCreation
        fields = "__all__"
        exclude = ["id"]


class ProjectClientSchema(ModelSchema):
    class Meta:
        model = ProjectClient
        fields = "__all__"
        exclude = ["id"]


class ClientSchema(ModelSchema):
    class Meta:
        model = Client
        fields = "__all__"
        exclude = ["id"]


class VendorSchema(ModelSchema):
    class Meta:
        model = Vendor
        fields = "__all__"
        exclude = ["id"]
