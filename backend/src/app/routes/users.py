from ninja import Router

from django.contrib.auth import authenticate, login
from ninja.security import HttpBearer
from typing import Any
from django.http import HttpRequest, JsonResponse
from ..modules.app_user import User
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
def create_user(request, user_in):
    user = User.objects.create(
        username=user_in.username,
        email=user_in.email,
        password=uniq_md5_hash(
            value=user_in.password, value_only=True
        ),  # Hash the user password
    )
    return {"id": user.id, "username": user.username, "email": user.email}


@router.post("/login")
def login_request(request, username: str, password: str):
    """
    Login the user
    """
    user = authenticate(request, username=username, password=password)
    if user is not None:
        login(request, user)
        # Set session expiry to 1 day
        request.session.set_expiry(86400)  # 86400 seconds = 1 day
        # Optionally, you can set a cookie directly if you're not using Django's session framework
        response = JsonResponse(
            {"success": True, "message": "User logged in successfully."}
        )
        response.set_cookie(
            key="sessionid", value=request.session.session_key, max_age=86400
        )
        return response
    else:
        return JsonResponse(
            {"success": False, "message": "Invalid username or password"}, status=401
        )
