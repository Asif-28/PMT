from ninja import Router
from ninja.security import HttpBearer
from ninja import Form
from typing import Any
from django.http import HttpRequest, HttpResponse
from ..modules.app_user import AppUser
from ..modules._custom_schemas import AppUserSchema
from ..utils import uniq_md5_hash

router = Router()


@router.post("/create")
def create_user(request, user_in: AppUserSchema):
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


@router.get("/protected")
def protected(request: HttpRequest):
    return {"protected_data": "You are under protection"}
