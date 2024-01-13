from .routes.project import router as project_router
from .routes.project_client import router as project_client_router

from ninja import Router

router = Router()

router.add_router("project", project_router)
router.add_router("project_client", project_client_router)
