# Generated by Django 3.2.5 on 2023-04-09 11:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0007_auto_20230409_1139'),
    ]

    operations = [
        migrations.AlterField(
            model_name='policy',
            name='case_id',
            field=models.IntegerField(default=30532986, unique=True),
        ),
    ]