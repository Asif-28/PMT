# Generated by Django 5.0.1 on 2024-02-08 11:42

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("app", "0012_alter_projectvendor_complete_and_more"),
    ]

    operations = [
        migrations.AddField(
            model_name="projectsurveytrace",
            name="duration",
            field=models.DurationField(blank=True, null=True),
        ),
    ]