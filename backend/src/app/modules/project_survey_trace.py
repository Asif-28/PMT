from django.db import models
from .project import ProjectCreation
from .project_vendor import ProjectVendor


class ProjectSurveyTrace(models.Model):
    key = models.CharField(max_length=225, unique=True, db_index=True)
    test = models.BooleanField(default=False)
    start_time = models.DateTimeField(auto_now_add=True)
    end_time = models.DateTimeField(auto_now=True, blank=True, null=True)
    project = models.ForeignKey(ProjectCreation, on_delete=models.CASCADE)
    status = models.CharField(max_length=225, db_default="insurvey")
    vendor_code = models.CharField(max_length=225)
    vendor_id = models.CharField(max_length=225)
    country = models.CharField(max_length=225)
    county_code = models.CharField(max_length=225)
    ip_address = models.CharField(max_length=225, blank=True, null=True)
    fraud_score = models.IntegerField(blank=True, null=True)
    ip_proxy = models.BooleanField(default=False)
    ip_region = models.CharField(max_length=225, blank=True, null=True)
    qc_remarks = models.CharField(max_length=225, blank=True, null=True)

    def __str__(self):
        return f"{self.key} - {self.vendor_code}"
