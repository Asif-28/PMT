# Generated by Django 5.0.1 on 2024-02-01 12:32

from django.db import migrations


class Migration(migrations.Migration):
    dependencies = [
        ("app", "0009_alter_projectsurveytrace_end_time"),
    ]

    operations = [
        migrations.RenameField(
            model_name="projectclient",
            old_name="check_country",
            new_name="country_pause",
        ),
    ]