from django.db import models
from django.urls import reverse
from .project import ProjectCreation
from ..validators import scope_limit

"""
ProjectClient model has a ForeignKey relationship with ProjectCreation model.
"""


class ProjectClient(models.Model):
    project_code = models.CharField(max_length=255)
    input_field = models.CharField(max_length=255)
    country = models.CharField(max_length=100)
    country_code = models.CharField(max_length=10)
    scope = models.IntegerField()
    test_link = models.URLField()
    live_link = models.URLField()
    check_country = models.BooleanField()
    check_quota = models.BooleanField()
    # ForeignKey relationship with ProjectCreation
    project = models.ForeignKey(ProjectCreation, on_delete=models.CASCADE)

    class Meta:
        unique_together = (("project_code", "country_code"),)

    # scope should be less than 100
    def save(self, *args, **kwargs):
        scope_limit(self.scope)

        super().save(*args, **kwargs)

    def get_absolute_url(self):
        return reverse("projectclient_detail", kwargs={"pk": self.pk})

    def __str__(self):
        return f"{self.project_code} - {self.country_code}"
