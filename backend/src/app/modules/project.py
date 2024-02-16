from django.db import models
from .client import Client

"""
ProjectCreation model has a OneToOne relationship with Client model.
"""


class ProjectCreation(models.Model):
    project_name = models.CharField(max_length=255, unique=False)
    # Project creation can be many to one project code
    project_code = models.CharField(max_length=255, unique=True, db_index=True)

    project_manager = models.CharField(max_length=255)
    client_name = models.CharField(max_length=255)
    client_project_manager = models.CharField(max_length=255)

    incidence_rate = models.CharField(max_length=50)  # Adjust max_length as needed
    loi = models.CharField(max_length=10)  # LOI field with max_length
    target = models.CharField(
        max_length=100
    )  # Adjust max_length based on expected values
    target_description = models.CharField(max_length=500)
    status = models.CharField(max_length=100)
    online = models.CharField(max_length=100)
    methodology = models.CharField(max_length=100, blank=True)
    billing_comments = models.CharField(max_length=500)
    security_check = models.BooleanField()
    scope = models.IntegerField()

    client = models.ForeignKey(Client, on_delete=models.CASCADE)

    def clean(self) -> None:
        # Custom clean method to handle data cleaning
        if not self.incidence_rate.endswith("%"):
            self.incidence_rate = f"{self.incidence_rate}%"
        if not self.loi.endswith(" Min"):
            self.loi = f"{self.loi} Min"
        if self.target not in ("HCP", "B2B", "B2C"):
            raise ValueError("'target' must be one of HCP, B2B, B2C")
        if self.status not in ("live", "end", "paused"):
            raise ValueError("'status' must be one of live, end, paused")

    def save(self, *args, **kwargs):
        # Custom save method to handle data cleaning
        self.clean()
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.project_name} - {self.project_code}"
