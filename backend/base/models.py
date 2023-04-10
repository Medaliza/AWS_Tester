from django.db import models
import random
from django.db.utils import IntegrityError

class Policy(models.Model):
    profile_name= models.CharField(max_length=200, default='')
    AWS_ACCESS_KEY_ID = models.CharField(max_length=200, default='')
    file_path = models.CharField(max_length=200)
    created_at = models.DateTimeField(auto_now_add=True)
    case_id = models.IntegerField(unique=True)
    username = models.CharField(max_length=200)

    def save(self, *args, **kwargs):
        # generate a new case_id if the current one is not unique
        while True:
            try:
                if not self.case_id:
                    self.case_id = random.randint(10000000, 99999999)
                super(Policy, self).save(*args, **kwargs)
                break
            except IntegrityError:
                self.case_id = random.randint(10000000, 99999999)
                continue

    def __str__(self):
        return self.file_path

