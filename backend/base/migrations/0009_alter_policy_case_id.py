# Generated by Django 3.2.5 on 2023-04-09 11:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0008_alter_policy_case_id'),
    ]

    operations = [
        migrations.AlterField(
            model_name='policy',
            name='case_id',
            field=models.IntegerField(default=99084860, unique=True),
        ),
    ]
