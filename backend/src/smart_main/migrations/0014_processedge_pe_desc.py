# Generated by Django 3.0.6 on 2020-06-23 13:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('smart_main', '0013_auto_20200622_1852'),
    ]

    operations = [
        migrations.AddField(
            model_name='processedge',
            name='pe_desc',
            field=models.TextField(blank=True),
        ),
    ]