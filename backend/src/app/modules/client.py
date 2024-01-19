from django.db import models

"""
Client model has a OneToMany relationship with ProjectCreation model.
"""


class Client(models.Model):
    name = models.CharField(
        max_length=255, unique=True
    )  # Assuming a maximum length for the name
    email = models.EmailField(
        unique=True
    )  # EmailField is appropriate for storing email addresses
    project_manager = models.CharField(max_length=255)

    def __str__(self):
        return self.name
