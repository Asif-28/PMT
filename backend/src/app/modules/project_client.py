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
    country_pause = models.BooleanField()
    check_quota = models.BooleanField()
    # ForeignKey relationship with ProjectCreation
    project = models.ForeignKey(ProjectCreation, on_delete=models.CASCADE)
    index_key = models.CharField(max_length=255, blank=True, null=True, db_index=True)

    class Meta:
        unique_together = (("project_code", "country_code"),)

    def clean(self) -> None:
        # link_key_param = "{trans_id}"
        # if link_key_param not in self.test_link or link_key_param not in self.live_link:
        #     raise ValueError(f"link requires placeholder {link_key_param}")

        return super().clean()

    def save(self, *args, **kwargs):
        self.index_key = f"{self.project_code}+{self.country_code}"
        self.project = ProjectCreation.objects.get(project_code=self.project_code)
        super().save(*args, **kwargs)

    def get_absolute_url(self):
        return reverse("projectclient_detail", kwargs={"pk": self.pk})

    def __str__(self):
        return f"{self.project_code} - {self.country_code}"
