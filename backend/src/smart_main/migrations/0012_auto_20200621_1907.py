# Generated by Django 3.0.6 on 2020-06-21 19:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('smart_main', '0011_auto_20200621_1819'),
    ]

    operations = [
        migrations.AlterField(
            model_name='processedge',
            name='id',
            field=models.CharField(max_length=50, primary_key=True, serialize=False),
        ),
    ]
