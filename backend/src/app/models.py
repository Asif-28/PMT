from django.db import models
from django.urls import reverse

# Create your models here.
"""
Client model has a OneToMany relationship with ProjectCreation model.
"""
class Client(models.Model):
    client_name = models.CharField(max_length=255)  # Assuming a maximum length for the name
    client_email = models.EmailField()              # EmailField is appropriate for storing email addresses
    client_project_manager = models.CharField(max_length=255)

    def __str__(self):
        return self.client_name

"""
ProjectCreation model has a OneToOne relationship with Client model.
"""
class ProjectCreation(models.Model):
    project_name = models.CharField(max_length=255, unique=False)
    project_code = models.CharField(max_length=255, unique=True)  # Ensuring uniqueness and indexing
    project_manager = models.CharField(max_length=255)
    client_project_manager = models.CharField(max_length=255)
    incidence_rate = models.CharField(max_length=50)  # Adjust max_length as needed
    loi = models.CharField(max_length=50)             # LOI field with max_length
    scope = models.IntegerField()
    target = models.CharField(max_length=100)         # Adjust max_length based on expected values
    target_description = models.CharField(max_length=500)
    selected_project_status = models.CharField(max_length=100)
    online = models.CharField(max_length=100)
    selected_div = models.CharField(max_length=100)
    billing_comments = models.CharField(max_length=500)
    security_check = models.BooleanField()

    def save(self, *args, **kwargs):
        # Custom save method to handle data cleaning
        if not self.incidence_rate.endswith('%'):
            self.incidence_rate = f"{self.incidence_rate}%"
        if not self.loi.endswith(' Min'):
            self.loi = f"{self.loi} Min"
        if self.target not in ["HCP", "B2B", "B2C"]:
            raise ValueError("'target' must be one of HCP, B2B, B2C")
        super().save(*args, **kwargs)


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

    def get_absolute_url(self):
        return reverse('projectclient_detail', kwargs={'pk': self.pk})
