from django.db import models

class Policy(models.Model):
    profile_name= models.CharField(max_length=200, default='')
    AWS_ACCESS_KEY_ID = models.CharField(max_length=200, default='')
    cloud_path = models.CharField(max_length=200, default='')
    scout_path = models.CharField(max_length=200, default='')
    created_at = models.DateTimeField(auto_now_add=True)
    case_id = models.IntegerField(unique=True)


    def __str__(self):
        return self.file_path

