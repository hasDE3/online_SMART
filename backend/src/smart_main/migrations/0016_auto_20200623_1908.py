# Generated by Django 3.0.6 on 2020-06-23 19:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('smart_main', '0015_auto_20200623_1853'),
    ]

    operations = [
        migrations.AlterField(
            model_name='processedge',
            name='target',
            field=models.CharField(max_length=50),
        ),
    ]