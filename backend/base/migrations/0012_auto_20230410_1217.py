# Generated by Django 3.2.5 on 2023-04-10 12:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0011_alter_policy_case_id'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='policy',
            name='username',
        ),
        migrations.AlterField(
            model_name='policy',
            name='case_id',
            field=models.IntegerField(unique=True),
        ),
    ]
