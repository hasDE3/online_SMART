# Generated by Django 3.0.6 on 2020-08-06 15:16

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('smart_main', '0032_nodegroup_ng_ps'),
    ]

    operations = [
        migrations.CreateModel(
            name='Cause',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('ca_name', models.CharField(max_length=20)),
                ('ca_desc', models.TextField(blank=True)),
                ('ca_hi', models.CharField(max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='CauseControl',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('caco_name', models.CharField(max_length=20)),
                ('caco_desc', models.TextField(blank=True)),
                ('caco_state', models.CharField(max_length=50)),
                ('caco_type', models.CharField(blank=True, max_length=50)),
                ('caco_ca', models.CharField(max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='Effect',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('ef_name', models.CharField(max_length=20)),
                ('ef_desc', models.TextField(blank=True)),
                ('ef_hi', models.CharField(max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='EffectControl',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('efco_name', models.CharField(max_length=20)),
                ('efco_desc', models.TextField(blank=True)),
                ('efco_state', models.CharField(max_length=50)),
                ('efco_type', models.CharField(blank=True, max_length=50)),
                ('efco_ef', models.CharField(max_length=50)),
            ],
        ),
    ]
