import subprocess
import json
from django.conf import settings
import os
from celery import shared_task

@shared_task
def cloudsplaining_func(case_id):
    path = os.path.join(settings.BASE_DIR, str(case_id), 'cloudresults')
    os.makedirs(path, exist_ok=True)
    print('running the cloudsplaining command ...')
    subprocess.run(["cloudsplaining", "download", "--profile", "default", "-o", path])
    file_path = os.path.join(path, 'default.json')
    subprocess.run(["cloudsplaining", "scan", "-i", file_path,"-s", "-o", path])
    return file_path

