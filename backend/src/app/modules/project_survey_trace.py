from django.db import models
from .project_client import ProjectClient
from .project_vendor import ProjectVendor


class ProjectSurveyTrace(models.Model):
    key = models.CharField(max_length=225, unique=True, db_index=True)
    test = models.BooleanField(db_default=False)
    start_time = models.DateTimeField(auto_now_add=True)
    end_time = models.DateTimeField(auto_now=True, blank=True, null=True)
    status = models.CharField(max_length=225, db_default="insurvey")
    project_code = models.CharField(max_length=225)
    vendor_code = models.CharField(max_length=225)
    vendor_id = models.CharField(max_length=225)
    country = models.CharField(max_length=225)
    country_code = models.CharField(max_length=225)
    ip_address = models.CharField(max_length=225, blank=True, null=True)
    fraud_score = models.IntegerField(blank=True, null=True)
    ip_proxy = models.BooleanField(db_default=False)
    ip_region = models.CharField(max_length=225, blank=True, null=True)
    qc_remarks = models.CharField(max_length=225, blank=True, null=True)

    project_client = models.ForeignKey(ProjectClient, on_delete=models.CASCADE)
    project_vendor = models.ForeignKey(ProjectVendor, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.key} | {self.project_code} | {self.project_client} | {self.vendor_code}"
