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


class ProjectVendor(models.Model):
    project_code = models.CharField(max_length=255)
    vendor_code = models.CharField(max_length=255)
    scope = models.IntegerField()
    complete = models.CharField(max_length=255)
    terminate = models.CharField(max_length=255)
    over_quota = models.CharField(max_length=255)
    pause_vendor = models.BooleanField()
    vendor_name = models.CharField(max_length=255)

    index_key = models.CharField(max_length=255, blank=True, null=True, db_index=True)
    project = models.ForeignKey(ProjectCreation, on_delete=models.CASCADE)
    vendor = models.ForeignKey(Vendor, on_delete=models.CASCADE)

    class Meta:
        unique_together = (("project_code", "vendor_code"),)

    def __str__(self):
        return f"{self.vendor_code} - {self.vendor_name}"

    def save(self, *args, **kwargs):
        scope_limit(self.scope)

        self.project = ProjectCreation.objects.get(project_code=self.project_code)
        self.vendor = Vendor.objects.get(name=self.vendor_name)
        self.index_key = f"{self.project_code}+{self.vendor_code}"

        super().save(*args, **kwargs)

    def get_absolute_url(self):
        return reverse("projectclient_detail", kwargs={"pk": self.pk})
