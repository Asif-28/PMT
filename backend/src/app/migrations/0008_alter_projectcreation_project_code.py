# Generated by Django 5.0.1 on 2024-02-01 11:42

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("app", "0007_alter_projectsurveytrace_project_vendor"),
    ]

    operations = [
        migrations.AlterField(
            model_name="projectcreation",
            name="project_code",
            field=models.CharField(db_index=True, max_length=255, unique=True),
        ),
    ]