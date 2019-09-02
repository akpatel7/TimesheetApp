# -*- coding: utf-8 -*-
# Generated by Django 1.11 on 2017-11-01 21:15
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('database', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='entry',
            name='hours',
        ),
        migrations.RemoveField(
            model_name='entry',
            name='minutes',
        ),
        migrations.AddField(
            model_name='entry',
            name='duration',
            field=models.FloatField(default=0),
        ),
    ]
