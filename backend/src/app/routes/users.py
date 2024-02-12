from ninja import Router

from django.contrib.auth import authenticate, login
from ninja.security import HttpBearer
from typing import Any
from django.http import HttpRequest, JsonResponse
from ..modules.app_user import AppUser
from ..modules._schemas import AppUserSchema
from ..utils import uniq_md5_hash

router = Router()


class AuthBearer(HttpBearer):
    def authenticate(self, request: HttpRequest, token: str) -> Any:
        # Normally, you would validate the token here
        # For demonstration, we'll skip token validation
        user = authenticate(request, username=token, password=token)
        if user:
            return user


@router.post("/create")
def create_user(request, user_in: AppUserSchema):
    user = AppUser.objects.create(
        username=user_in.username,
        email=user_in.email,
        password=uniq_md5_hash(
            value=user_in.password, value_only=True
        ), 
    )
    return {"id": user.id, "username": user.username, "email": user.email}


@router.post("/login")
def login_request(request, username: str, password: str):
    """
    Login the user
    """
    password = uniq_md5_hash(value=password, value_only=True)
    if AppUser.objects.get(username=username, password=password):
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return JsonResponse({"status": "success", "message": "User logged in"})
        else:
            return JsonResponse(
                {"status": "error", "message": "Invalid username or password"}
            )
