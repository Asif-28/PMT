from .project import ProjectCreation
from .client import Client
from .project_client import ProjectClient
from .vendor import Vendor
from .project_vendor import ProjectVendor
from .app_user import AppUser

from ninja import ModelSchema


class ProjectCreationSchema(ModelSchema):
    class Meta:
        model = ProjectCreation
        fields = "__all__"
        exclude = ["id", "client"]


class ProjectClientSchema(ModelSchema):
    class Meta:
        model = ProjectClient
        fields = "__all__"
        exclude = ["id", "project", "index_key"]


class ClientSchema(ModelSchema):
    class Meta:
        model = Client
        fields = "__all__"
        exclude = ["id"]


class VendorSchema(ModelSchema):
    class Meta:
        model = Vendor
        fields = "__all__"


class ProjectVendorSchema(ModelSchema):
    class Meta:
        model = ProjectVendor
        fields = "__all__"
        exclude = ["id", "project", "vendor", "index_key"]
