from .routes.project import router as project_router
from .routes.project_client import router as project_client_router
from .routes.vendor import router as vendor_router
from .routes.client import router as client_router
from .routes.utils import router as utils_router
from .routes.project_vendor import router as project_vendor_router
from .routes.id_reconciliation import router as id_reconciliation_router
from .routes.app_user import router as users_router


from ninja import Router

router = Router()

router.add_router("project", project_router)
router.add_router("project_client", project_client_router)
router.add_router("vendor", vendor_router)
router.add_router("client", client_router)
router.add_router("utils", utils_router)
router.add_router("project_vendor", project_vendor_router)
router.add_router("id_reconciliation", id_reconciliation_router)
router.add_router("users", users_router)
