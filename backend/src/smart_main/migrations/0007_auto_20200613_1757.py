# Generated by Django 3.0.6 on 2020-06-13 17:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('smart_main', '0006_hazardinstance_hazardtype'),
    ]

    operations = [
        migrations.AddField(
            model_name='hazardinstance',
            name='hi_sf_name',
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
        migrations.AlterField(
            model_name='hazardinstance',
            name='hi_clju',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='hazardinstance',
            name='hi_parent',
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
        migrations.AlterField(
            model_name='hazardinstance',
            name='hi_ps',
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
        migrations.AlterField(
            model_name='hazardinstance',
            name='hi_sf',
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
    ]
