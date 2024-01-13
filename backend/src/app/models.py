from django.db import models
from django.urls import reverse

# Create your models here.
"""
Client model has a OneToMany relationship with ProjectCreation model.
"""
class Client(models.Model):
    client_name = models.CharField(max_length=255)  # Assuming a maximum length for the name
    client_email = models.EmailField()              # EmailField is appropriate for storing email addresses
    client_project_manager = models.CharField(max_length=255)

    def __str__(self):
        return self.client_name



