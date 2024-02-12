from django.db import models
from django.contrib.auth.models import AbstractUser


class AppUser(models.Model):
    email = models.EmailField(unique=True)
    username = models.CharField(max_length=30, unique=True)
    password = models.CharField(max_length=255)
    is_active = models.BooleanField(default=True)
    token = models.CharField(max_length=255, blank=True, null=True, db_index=True)
    role = models.CharField(max_length=255, db_default="user")
    last_token_refresh = models.DateTimeField(auto_now=True)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username"]

    def save(self, *args, **kwargs):
        if " " in self.username or " " in self.password:
            raise ValueError("Username/Password cannot contain spaces")
        self.username = self.username.lower()
        self.email = self.email.lower()
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.username} - {self.email}"
