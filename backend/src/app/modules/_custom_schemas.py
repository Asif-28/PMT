from ninja import ModelSchema, Schema
from typing import Optional
from .vendor import Vendor


class CreateVendorSchema(ModelSchema):
    class Meta:
        model = Vendor
        fields = "__all__"
        exclude = ["id"]


class IDReconciliationSchema(Schema):
    status: str
    project_code: str
    qc_remarks: Optional[str]
    ids: list

    # set default values for qc_remarks
    def __init__(self, **data):
        super().__init__(**data)
        if not self.qc_remarks:
            self.qc_remarks = "No remarks"


class AppUserSchema(Schema):
    username: str
    email: str
    password: str
