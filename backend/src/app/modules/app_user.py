from django.db import models
from django.utils import timezone


class AppUser(models.Model):
    email = models.EmailField(unique=True)
    username = models.CharField(max_length=30, unique=True)
    password = models.CharField(max_length=255)
    is_active = models.BooleanField(db_default=True)
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
        if len(self.password) < 6:
            raise ValueError("Password must be at least 6 characters long")

        # Check if the token has changed and update last_token_refresh accordingly
        if self.pk is not None:  # Check if the object already exists in the database
            original = AppUser.objects.get(pk=self.pk)
            if self.token != original.token:
                self.last_token_refresh = timezone.now()

        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.username} - {self.email}"
