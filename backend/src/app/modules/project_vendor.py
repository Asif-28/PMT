from django.db import models
from django.urls import reverse
from .project import ProjectCreation
from .vendor import Vendor
from ..validators import scope_limit

"""
Project Code(Str)
Vendor Code(Str)
Vendor(Str)
Scope(Int)
Complete(Str)
Terminate(Str)
Over-quota(Str)
Pause Vendor(Bool)
"""


class Vendor(models.Model):
    project_code = models.CharField(max_length=255)
    vendor_code = models.CharField(max_length=255)
    scope = models.IntegerField()
    complete = models.CharField(max_length=255)
    terminate = models.CharField(max_length=255)
    over_quota = models.CharField(max_length=255)
    pause_vendor = models.BooleanField()

    project = models.ForeignKey(ProjectCreation, on_delete=models.CASCADE)
    vendor = models.ForeignKey(Vendor, on_delete=models.CASCADE)

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        scope_limit(self.scope)

        super().save(*args, **kwargs)

    def get_absolute_url(self):
        return reverse("projectclient_detail", kwargs={"pk": self.pk})
