from ninja import ModelSchema, Schema
from .vendor import Vendor


class CreateVendorSchema(ModelSchema):
    class Meta:
        model = Vendor
        fields = "__all__"
        exclude = ["id"]


class IDReconciliationSchema(Schema):
    status: str
    project_code: str
    ids: list


class AppUserSchema(Schema):
    username: str
    email: str
    password: str
