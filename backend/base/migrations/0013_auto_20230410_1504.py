# Generated by Django 3.2.5 on 2023-04-10 15:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0012_auto_20230410_1217'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='policy',
            name='file_path',
        ),
        migrations.AddField(
            model_name='policy',
            name='cloud_path',
            field=models.CharField(default='', max_length=200),
        ),
        migrations.AddField(
            model_name='policy',
            name='scout_path',
            field=models.CharField(default='', max_length=200),
        ),
    ]
