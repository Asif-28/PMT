from ninja.security import APIKeyCookie
from ..modules.app_user import AppUser


class CookieAuth(APIKeyCookie):
    def __init__(self):
        self.param_name = "X-API-KEY"
        super().__init__()

    def authenticate(self, request, token):
        if token:
            user = AppUser.objects.get(token=token)
            if user:
                return token
