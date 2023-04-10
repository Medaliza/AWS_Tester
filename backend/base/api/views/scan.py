from rest_framework.response import Response
from rest_framework.decorators import api_view
import boto3
import subprocess
from ..scan_modules.list_policies import * 
from ..scan_modules.scout import scout_func
from ..scan_modules.cloudsplaining import *
from ..scan_modules.check_priv import *
from base.models import Policy
import random
from django.db.utils import IntegrityError
from celery import group
from celery.result import AsyncResult

@api_view(['POST'])
def AWS_account_details(request):
    #generate case_id
    while True:
            try: 
                case_id = random.randint(10000000, 99999999)
                break
            except IntegrityError:
                case_id = random.randint(10000000, 99999999)
                continue
    # Get user input
    access_key_id = request.data.get('access_key_id')
    secret_access_key = request.data.get('secret_access_key')
    profile_name = request.data.get('profile_name')
    subprocess.run(["aws", "configure", "set", "aws_access_key_id", access_key_id])
    subprocess.run(["aws", "configure", "set", "aws_secret_access_key", secret_access_key])
    path = os.path.join(settings.BASE_DIR, str(case_id))
    os.makedirs(path, exist_ok=True)
    region = 'us-east-1'
    session = boto3.Session()
    credentials = session.get_credentials()
    AWS_ACCESS_KEY_ID = credentials.access_key
    #Call list_policies function
    # result = iam_list_policies_attached.delay(AWS_ACCESS_KEY_ID, region)
    scout_id= scout_func.delay(case_id).id
    has_privileges = check_privileges(access_key_id,secret_access_key,profile_name)

    if has_privileges:
        cloud_id = cloudsplaining_func.delay(case_id).id
        scout_result = AsyncResult(scout_id).get()
        cloud_res = AsyncResult(cloud_id).get()
    else:
        print("This User doesn't have iam:GetAccountAuthorizationDetails privileges ...")
    # Save the file path to the database
    policy = Policy(cloud_path=cloud_res,scout_path=scout_result, AWS_ACCESS_KEY_ID=AWS_ACCESS_KEY_ID, profile_name=profile_name, case_id=case_id)
    policy.save()
    return Response('okey')
    