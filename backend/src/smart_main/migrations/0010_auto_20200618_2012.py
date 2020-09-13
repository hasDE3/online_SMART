# Generated by Django 3.0.6 on 2020-06-18 20:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('smart_main', '0009_processedge_processnode_processsystem'),
    ]

    operations = [
        migrations.AddField(
            model_name='processnode',
            name='color',
            field=models.CharField(default='tt', max_length=50),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='processnode',
            name='shape',
            field=models.CharField(default='ttt', max_length=50),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='processnode',
            name='size',
            field=models.CharField(default='we', max_length=50),
            preserve_default=False,
        ),
    ]
