# Generated by Django 3.0.6 on 2020-07-21 02:00

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('smart_main', '0022_auto_20200717_0924'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='caresetting',
            options={'ordering': ['cs_name']},
        ),
        migrations.RemoveField(
            model_name='caresetting',
            name='cs_index',
        ),
    ]