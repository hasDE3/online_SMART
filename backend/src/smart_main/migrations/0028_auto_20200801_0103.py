# Generated by Django 3.0.6 on 2020-08-01 01:03

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('smart_main', '0027_auto_20200731_1140'),
    ]

    operations = [
        migrations.RenameField(
            model_name='processnode',
            old_name='groupId',
            new_name='parent',
        ),
    ]
