# Generated by Django 5.0.1 on 2024-02-07 10:00

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("app", "0011_alter_projectsurveytrace_project_vendor"),
    ]

    operations = [
        migrations.AlterField(
            model_name="projectvendor",
            name="complete",
            field=models.URLField(max_length=255),
        ),
        migrations.AlterField(
            model_name="projectvendor",
            name="over_quota",
            field=models.URLField(max_length=255),
        ),
        migrations.AlterField(
            model_name="projectvendor",
            name="terminate",
            field=models.URLField(max_length=255),
        ),
    ]