from django.conf import settings
import subprocess
import os
from celery import shared_task
import json


@shared_task
def scout_func(case_id):
    path = os.path.join(settings.BASE_DIR, str(case_id), 'scoutresults')
    os.makedirs(path, exist_ok=True)
    print('running the scout command ...')
    subprocess.run(["python3","/home/kali/Desktop/PFE/tools/ScoutSuite/scout.py","aws", "-p", "default", "--result-format", "json", "--report-dir", path, "--no-browser"])
    
    # open the file and read its contents
    with open(os.path.join(path, 'scoutsuite-results/scoutsuite_results_aws-default.js'), 'r') as file:
        contents = file.readlines()[1:]
        contents = "".join(contents)

    # parse the JSON string into a Python object
        data = json.loads(contents)
        account_id = data['account_id']
        last_run = data['last_run']
        services = data['services']

        # Remove IAM service from the services list
        del services['iam']
        del last_run['ruleset_about']
        del last_run['ruleset_name']
        del last_run['run_parameters']
        del last_run['time']
        del last_run['version']

        # Create a new dictionary with the extracted data
        new_data = {
            'account_id': account_id,
            'last_run': last_run,
            'services': services
        }

    # save the data as a new JSON file
        with open(os.path.join(path, 'result.json'), 'w') as file:
            json.dump(new_data, file)
    
    result_path = os.path.join(path, 'result.json')

    return result_path