from django.db import models
from django.contrib.auth.models import User


class User(User):
    ...
    # You can add additional fields here if required
    # username = models.CharField()
    # email = models.EmailField()
    # password = models.CharField()
    # groups = models.ManyToManyField()
