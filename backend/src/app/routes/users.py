from ninja import Router
from ninja.security import HttpBearer
from ninja import Form
from typing import Any
from django.http import HttpRequest, HttpResponse
from ..modules.app_user import AppUser
from ..modules._custom_schemas import AppUserSchema
from ..utils import uniq_md5_hash

from ninja.security import APIKeyCookie


router = Router()


class CookieKey(APIKeyCookie):
    def __init__(self):
        self.param_name = "X-API-KEY"
        super().__init__()

    def authenticate(self, request, token):
        if token:
            user = AppUser.objects.get(token=token)
            if user:
                return token


cookie_key = CookieKey()


@router.post("/create")
def create_user(request, user_in: AppUserSchema):
    user = AppUser.objects.create(
        username=user_in.username,
        email=user_in.email,
        password=user_in.password,
    )
    return {"id": user.id, "username": user.username, "email": user.email}


@router.post("/token", auth=None)  # < overriding global auth
def get_token(
    request: HttpRequest,
    response: HttpResponse,
    username: str = Form(...),
    password: str = Form(...),
):
    user = AppUser.objects.filter(username=username, password=password)

    if len(user) != 0:
        token = uniq_md5_hash(value=f"{username}{password}", value_only=False)
        response.set_cookie("X-API-KEY", token, max_age=3600)
        user.update(token=token)

        return {"token": token}


@router.get("/protected", auth=cookie_key)
def protected(request: HttpRequest):
    return {"protected_data": "You are under protection"}
