# Generated by Django 3.2.5 on 2023-04-09 12:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0009_alter_policy_case_id'),
    ]

    operations = [
        migrations.AlterField(
            model_name='policy',
            name='case_id',
            field=models.IntegerField(default=82627866, unique=True),
        ),
    ]
