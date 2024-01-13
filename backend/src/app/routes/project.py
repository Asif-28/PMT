from ninja import Router
from fastapi.responses import JSONResponse
from typing import List

from ..modules.project import ProjectCreation


router = Router()


# @router.post("/create")
# def create_project(request, project: ProjectSchema):
#     try:
#         project_obj = Project.objects.create(**project.dict())
#         return {"message": "Project created"}
#     except IntegrityError:  # Assuming IntegrityError is imported
#         return {"error": f"Project {project.project_name} already exists."}

# @router.get("/list", response=List[ProjectSchema])
# def list_projects(request):
#     projects = Project.objects.all()
#     return [ProjectSchema.from_orm(project) for project in projects]