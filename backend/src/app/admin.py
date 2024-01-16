from django.contrib import admin
from .models import (
    Client,
    ProjectCreation,
    ProjectClient,
    Vendor,
    ProjectVendor
)

# Register your models here.

admin.site.register(Client)
admin.site.register(ProjectCreation)
admin.site.register(ProjectClient)
admin.site.register(Vendor)
admin.site.register(ProjectVendor)