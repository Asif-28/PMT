from django.utils import timezone
from ninja.security import HttpBearer
from ..utils import message
from ..modules.app_user import AppUser


class HeaderAuth(HttpBearer):
    def __init__(self):
        super().__init__()

    def authenticate(self, request, token):

        # seconds
        max_age = 36000.0
        
        if token:
            user = AppUser.objects.get(token=token)
            if user:
                # return token
                if (timezone.now() - user.last_token_refresh).total_seconds() < max_age:
                    return token
                else:
                    raise message.error("Token expired")

