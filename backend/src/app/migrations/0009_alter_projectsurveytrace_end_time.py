# Generated by Django 5.0.1 on 2024-02-01 11:47

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("app", "0008_alter_projectcreation_project_code"),
    ]

    operations = [
        migrations.AlterField(
            model_name="projectsurveytrace",
            name="end_time",
            field=models.DateTimeField(blank=True, null=True),
        ),
    ]
