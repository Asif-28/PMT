from ninja import Router
from ninja.security import HttpBearer
from ninja import Form
from django.utils import timezone

import json
from django.http import HttpRequest, HttpResponse
from django.shortcuts import render
from django.views.decorators.csrf import (
    csrf_exempt,
    ensure_csrf_cookie,
    requires_csrf_token,
)
from ..modules.app_user import AppUser
from ..modules._custom_schemas import AppUserSchema
from ..utils import uniq_md5_hash

router = Router()


def get_header_bearer(request: HttpRequest):
    """
    # get token from request
    # -H 'Authorization: Bearer kj3h4kj2h42kjh2g34f'
    """
    return request.headers.get("Authorization", "").split("Bearer ")[-1]


@router.get("/xcsrf", auth=None)
@csrf_exempt
@requires_csrf_token
def read_user(request):
    data: HttpResponse = render(request, "csrf.html", {})
    # get csrf token from data
    csrf_token = (
        data.content.decode()
        .split('name="csrfmiddlewaretoken" value="')[1]
        .split('"')[0]
    )
    _d = {
        "csrf_token": request.COOKIES.get("csrftoken"),
        "x_csrf_token": csrf_token,
    }

    return HttpResponse(
        content=json.dumps(_d),
        content_type="application/json",
        headers={"X-CSRFToken": csrf_token},
    )


@router.post("/create")
def create_user(request, user_in: AppUserSchema):
    token = get_header_bearer(request)
    if not token:
        return {"error": "Not authenticated"}

    user = AppUser.objects.filter(token=token).first()

    if user.role.lower() != "admin":
        return {"error": f"Not {user.role} authorized to create user"}

    user = AppUser.objects.create(
        username=user_in.username,
        email=user_in.email,
        password=user_in.password,
    )

    return {"id": user.id, "username": user.username, "email": user.email}


@router.post("/generate_token", auth=None)  # < overriding global auth
def get_token(
    request: HttpRequest,
    username: str = Form(...),
    password: str = Form(...),
):
    user = AppUser.objects.filter(username=username, password=password)

    if len(user) != 0:
        token = uniq_md5_hash(value=f"{username}{password}", value_only=False)

        user.update(token=token, last_token_refresh=timezone.now())

        return {"token": token}


@router.post("/logout")
def logout(request: HttpRequest):
    token = get_header_bearer(request)
    AppUser.objects.filter(token=token).update(token=None)
    return {"message": "Logged out"}


@router.get("/verify_token")
def verify_token(request: HttpRequest):
    return {"message": "Token is valid"}
