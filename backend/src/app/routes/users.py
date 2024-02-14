from ninja import Router
from ninja.security import HttpBearer
from ninja import Form
from django.http import HttpRequest, HttpResponse
from django.views.decorators.csrf import csrf_exempt, ensure_csrf_cookie
from django.middleware.csrf import get_token as get_csrf_token
from ..modules.app_user import AppUser
from ..modules._custom_schemas import AppUserSchema
from ..utils import uniq_md5_hash

router = Router()

# @router.post("/csrf", auth=None)
# @ensure_csrf_cookie
# @csrf_exempt
# def get_csrf_token(request):
#     return HttpResponse()

@router.get("/csrf-token")
def csrf_token(request: HttpRequest, response: HttpResponse):
    token = get_token(request)
    # response = HttpResponse('{"csrfToken": "%s"}' % token, content_type="application/json")
    response.set_cookie('csrftoken', token, max_age=60*60*24*365*10, samesite='Lax')
    return response


@router.post("/create")
def create_user(request, user_in: AppUserSchema):
    # get token from request
    # token = request.cookies.get("X-API-KEY")
    # if not token:
    #     return {"error": "Not authenticated"}
    # user = AppUser.objects.filter(token=token).first()

    # if user.role != "admin":
    #     return {"error": f"Not {user.role} authorized to create user"}

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
