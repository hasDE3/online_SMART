# Generated by Django 3.0.6 on 2020-08-03 09:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('smart_main', '0031_auto_20200802_0600'),
    ]

    operations = [
        migrations.AddField(
            model_name='nodegroup',
            name='ng_ps',
            field=models.CharField(blank=True, max_length=50),
        ),
    ]
