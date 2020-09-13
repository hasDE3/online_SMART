# Generated by Django 3.1 on 2020-08-13 05:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('smart_main', '0034_auto_20200813_0550'),
    ]

    operations = [
        migrations.AlterField(
            model_name='caresetting',
            name='cs_name',
            field=models.CharField(max_length=200),
        ),
        migrations.AlterField(
            model_name='cause',
            name='ca_name',
            field=models.CharField(max_length=200),
        ),
        migrations.AlterField(
            model_name='causecontrol',
            name='caco_name',
            field=models.CharField(max_length=200),
        ),
        migrations.AlterField(
            model_name='effect',
            name='ef_name',
            field=models.CharField(max_length=200),
        ),
        migrations.AlterField(
            model_name='effectcontrol',
            name='efco_name',
            field=models.CharField(max_length=200),
        ),
        migrations.AlterField(
            model_name='hazardinstance',
            name='hi_name',
            field=models.CharField(max_length=200),
        ),
        migrations.AlterField(
            model_name='hazardtype',
            name='ht_name',
            field=models.CharField(max_length=200),
        ),
        migrations.AlterField(
            model_name='issuelog',
            name='il_name',
            field=models.CharField(max_length=200),
        ),
        migrations.AlterField(
            model_name='nodegroup',
            name='label',
            field=models.CharField(blank=True, max_length=100),
        ),
        migrations.AlterField(
            model_name='processedge',
            name='label',
            field=models.CharField(blank=True, max_length=100),
        ),
        migrations.AlterField(
            model_name='processnode',
            name='label',
            field=models.CharField(blank=True, max_length=100),
        ),
        migrations.AlterField(
            model_name='processsystem',
            name='ps_name',
            field=models.CharField(max_length=200),
        ),
        migrations.AlterField(
            model_name='report',
            name='re_name',
            field=models.CharField(max_length=200),
        ),
        migrations.AlterField(
            model_name='systemfunction',
            name='sf_name',
            field=models.CharField(max_length=200),
        ),
        migrations.AlterField(
            model_name='systemmodel',
            name='sy_name',
            field=models.CharField(max_length=200),
        ),
    ]