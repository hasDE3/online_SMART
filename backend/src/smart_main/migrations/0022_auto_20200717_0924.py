# Generated by Django 3.0.6 on 2020-07-17 09:24

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('smart_main', '0021_riskmatrix_user'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='issuelog',
            options={'ordering': ['il_name']},
        ),
        migrations.RemoveField(
            model_name='issuelog',
            name='il_index',
        ),
    ]