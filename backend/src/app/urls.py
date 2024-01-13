from .routes.project import router as project_router

from ninja import Router

router = Router()

router.add_router("project", project_router)
