# Generated by Django 3.0.6 on 2020-08-02 06:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('smart_main', '0030_auto_20200801_0453'),
    ]

    operations = [
        migrations.AlterField(
            model_name='nodegroup',
            name='x',
            field=models.CharField(blank=True, max_length=50),
        ),
        migrations.AlterField(
            model_name='nodegroup',
            name='y',
            field=models.CharField(blank=True, max_length=50),
        ),
    ]
