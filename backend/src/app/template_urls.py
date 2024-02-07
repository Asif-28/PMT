from django.urls import path
from . import views

urlpatterns = [
    path("", views.get_survey, name="survey"),
    path("complete", views.complete_survey, name="complete"),
]
