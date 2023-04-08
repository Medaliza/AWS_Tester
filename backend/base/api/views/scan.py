from rest_framework.response import Response
from rest_framework.decorators import api_view
import boto3
import botocore
import json
import sys
import subprocess
from ..iam_scan.list_policies import * 

@api_view(['POST'])
def AWS_account_details(request):
    # Get user input
    access_key_id = request.data.get('access_key_id')
    secret_access_key = request.data.get('secret_access_key')
    profile_name = request.data.get('profile_name')
    subprocess.run(["aws", "configure", "set", "aws_access_key_id", access_key_id])
    subprocess.run(["aws", "configure", "set", "aws_secret_access_key", secret_access_key])
    region = 'us-east-1'
    regions = ['us-east-1']
    session = boto3.Session()
    credentials = session.get_credentials()
    AWS_ACCESS_KEY_ID = credentials.access_key
    #Call list_policies function
    output = iam_list_policies_attached.delay(AWS_ACCESS_KEY_ID, region)
    return Response('okey')
    