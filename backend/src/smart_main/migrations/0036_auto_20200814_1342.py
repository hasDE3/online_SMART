# Generated by Django 3.1 on 2020-08-14 13:42

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('smart_main', '0035_auto_20200813_0554'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='systemfunction',
            options={'ordering': ['id']},
        ),
        migrations.RemoveField(
            model_name='systemfunction',
            name='sf_index',
        ),
    ]
