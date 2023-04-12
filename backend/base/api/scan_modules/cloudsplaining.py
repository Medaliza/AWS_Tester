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
    with open(os.path.join(path, 'iam-results-default.json'), 'r') as f:
        data = json.load(f)
        groups = data['groups']
        users = data['users']
        roles = data['roles']
        aws_managed_policies = data['aws_managed_policies']
        customer_managed_policies = data['customer_managed_policies']
        inline_policies = data['inline_policies']
        
        del data['exclusions']
        del data['links']

        # Create a new dictionary with the extracted data
        new_data = {
            'groups': groups,
            'users': users,
            'roles': roles,
            'aws_managed_policies': aws_managed_policies,
            'customer_managed_policies': customer_managed_policies,
            'inline_policies':inline_policies
        }
        # save the data as a new JSON file
        with open(os.path.join(path, 'iam_result.json'), 'w') as file:
            json.dump(new_data, file)
        
        result_path = os.path.join(path, 'iam_result.json')

        return result_path

    
