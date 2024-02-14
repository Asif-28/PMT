from django.urls import path
from . import views

urlpatterns = [
    path("", views.get_survey, name="survey"),
    path("status", views.complete_survey, name="status"),
    path("health", views.health, name="health"),
]
