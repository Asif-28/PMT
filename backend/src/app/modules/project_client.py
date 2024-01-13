from django.db import models
from django.urls import reverse
from .project import ProjectCreation

"""
ProjectClient model has a ForeignKey relationship with ProjectCreation model.
"""


class ProjectClient(models.Model):
    project_code = models.CharField(max_length=255)
    input_field = models.CharField(max_length=255)
    country = models.CharField(max_length=100)
    country_code = models.CharField(max_length=10)
    scope = models.CharField(max_length=100)
    test_link = models.URLField()
    live_link = models.URLField()
    check_country = models.BooleanField()
    check_quota = models.BooleanField()
    # ForeignKey relationship with ProjectCreation
    project = models.ForeignKey(ProjectCreation, on_delete=models.CASCADE)

    class Meta:
        unique_together = (("project_code", "country_code"),)

    def get_absolute_url(self):
        return reverse("projectclient_detail", kwargs={"pk": self.pk})
