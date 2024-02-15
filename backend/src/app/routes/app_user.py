from ninja import Router
from ninja.security import HttpBearer
from ninja import Form
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


@router.post("/csrf", auth=None)
@ensure_csrf_cookie
@csrf_exempt
def get_csrf_token(request, response):
    """
    Implementing CSRF token for the frontend
    ref: https://github.com/vitalik/django-ninja/issues/908
    """
    response.set_cookie("test", "restricted")
    return HttpResponse(content=json.dumps({}), content_type="application/json")


@router.get("/xcsrf", auth=None)
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
    # get token from request
    token = request.COOKIES.get("X-API-KEY")
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
    response: HttpResponse,
    username: str = Form(...),
    password: str = Form(...),
):
    user = AppUser.objects.filter(username=username, password=password)

    if len(user) != 0:
        token = uniq_md5_hash(value=f"{username}{password}", value_only=False)
        response.set_cookie("X-API-KEY", token, max_age=36000)
        user.update(token=token)

        return {"token": token}


@router.post("/logout")
def logout(request: HttpRequest, response: HttpResponse):
    response.delete_cookie("X-API-KEY")
    return {"message": "Logged out"}

@router.get("/verify_token")
def verify_token(request: HttpRequest):
    return {"message": "Token is valid"}
