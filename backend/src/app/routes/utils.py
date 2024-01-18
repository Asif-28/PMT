from ninja import Router
from .._country_codes import countries
from django.http import HttpResponse

router = Router()


@router.get("/countries")
def list_countries(request):
    return countries


@router.get("/ip")
def get_user_ip(request):
    # Try to get the real IP by checking the 'HTTP_X_FORWARDED_FOR' header
    x_forwarded_for = request.META.get("HTTP_X_FORWARDED_FOR")
    if x_forwarded_for:
        ip = x_forwarded_for.split(",")[
            0
        ]  # In case there is a 'forwarded for' chain, take the first one
    else:
        ip = request.META.get(
            "REMOTE_ADDR"
        )  # Otherwise, use the standard 'REMOTE_ADDR'

    return HttpResponse(f"Your IP address is {ip}")
