from ninja.security import HttpBearer
from ..modules.app_user import AppUser


class HeaderAuth(HttpBearer):
    def __init__(self):
        super().__init__()

    def authenticate(self, request, token):
        if token:
            user = AppUser.objects.get(token=token)
            if user:
                return token
