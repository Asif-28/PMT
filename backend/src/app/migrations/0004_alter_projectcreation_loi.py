# Generated by Django 5.0.1 on 2024-01-13 10:53

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("app", "0003_alter_projectcreation_loi"),
    ]

    operations = [
        migrations.AlterField(
            model_name="projectcreation",
            name="loi",
            field=models.CharField(max_length=5),
        ),
    ]
