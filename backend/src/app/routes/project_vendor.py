from ninja import Router

from ..modules.project_vendor import ProjectVendor
from ..modules.vendor import Vendor
from ..modules.project import ProjectCreation
from ..modules._schemas import ProjectVendorSchema
from ..utils import message, JSONResponse

router = Router()


@router.post("/create", response=JSONResponse)
def create_project_vendor(request, project_vendor: ProjectVendorSchema):
    try:
        project = ProjectCreation.objects.get(project_code=project_vendor.project_code)
        vendor = Vendor.objects.get(name=project_vendor.vendor_name)

        data = project_vendor.dict()
        data["project"] = project
        data["vendor"] = vendor

        ProjectVendor(**data).save()

    except Exception as e:
        return message.error(str(e))

    return message.success("Project Vendor created successfully")


@router.get("/list")
def list_project_vendors(request) -> list[ProjectVendorSchema]:
    """
    List all project vendors
    """

    project_vendors = ProjectVendor.objects.all()

    return [
        ProjectVendorSchema.from_orm(project_vendor)
        for project_vendor in project_vendors
    ]
