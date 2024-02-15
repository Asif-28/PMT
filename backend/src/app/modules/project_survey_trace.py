from django.db import models
from .project_client import ProjectClient
from .project_vendor import ProjectVendor


class ProjectSurveyTrace(models.Model):
    key = models.CharField(max_length=225, unique=True, db_index=True)
    test = models.BooleanField(db_default=False)
    start_time = models.DateTimeField(auto_now_add=True)
    end_time = models.DateTimeField(blank=True, null=True)
    # end_time - start_time = duration
    duration = models.DurationField(blank=True, null=True)

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
    project_vendor = models.ForeignKey(
        ProjectVendor, on_delete=models.SET_NULL, null=True
    )

    def clean(self):
        if self.status not in (
            "insurvey",
            "complete",
            "terminate",
            "overquota",
            "rejected",
        ):
            return ValueError("Invalid status value")
        if self.end_time == None and self.status == "insurvey":
            return ValueError("Invalid status value")

    def total_duration(self):
        if self.start_time != None and self.end_time != None:
            return self.end_time - self.start_time
        else:
            # Handle cases where times are missing or invalid
            return None

    def save(self, *args, **kwargs):
        self.clean()
        self.duration = self.total_duration()
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.key} | {self.project_code} | {self.project_client} | {self.vendor_code}"
