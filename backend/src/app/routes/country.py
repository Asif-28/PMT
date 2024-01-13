from ninja import Router
from .._country_codes import countries
router = Router()

@router.get("/countries")
def list_countries(request):
    return countries