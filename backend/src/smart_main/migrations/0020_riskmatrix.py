# Generated by Django 3.0.6 on 2020-07-06 07:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('smart_main', '0019_auto_20200627_1614'),
    ]

    operations = [
        migrations.CreateModel(
            name='RiskMatrix',
            fields=[
                ('id', models.CharField(max_length=50, primary_key=True, serialize=False)),
                ('value', models.CharField(max_length=20)),
            ],
        ),
    ]
