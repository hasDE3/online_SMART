# Generated by Django 3.0.6 on 2020-07-31 11:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('smart_main', '0025_processnode_groupid'),
    ]

    operations = [
        migrations.CreateModel(
            name='NodeGroup',
            fields=[
                ('id', models.CharField(max_length=50, primary_key=True, serialize=False)),
                ('label', models.CharField(blank=True, max_length=50)),
                ('x', models.CharField(max_length=50)),
                ('y', models.CharField(max_length=50)),
                ('ng_ps', models.CharField(blank=True, max_length=50)),
            ],
        ),
    ]
