# Generated by Django 5.0.2 on 2024-02-12 17:36

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("app", "0018_appuser_last_token_refresh_appuser_role_and_more"),
    ]

    operations = [
        migrations.AlterField(
            model_name="appuser",
            name="role",
            field=models.CharField(db_default="user", max_length=255),
        ),
    ]