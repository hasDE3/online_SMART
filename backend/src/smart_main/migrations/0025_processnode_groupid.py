# Generated by Django 3.0.6 on 2020-07-31 04:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('smart_main', '0024_report'),
    ]

    operations = [
        migrations.AddField(
            model_name='processnode',
            name='groupId',
            field=models.CharField(blank=True, max_length=50),
        ),
    ]
