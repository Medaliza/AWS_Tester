import boto3
import subprocess
from botocore.exceptions import ClientError
from celery import shared_task

def check_privileges(access_key_id,secret_access_key,profile_name):
    #check privilege iam:GetAccountAuthorizationDetails
    has_privileges=True
    iam = boto3.client('iam',
                        aws_access_key_id=access_key_id,
                        aws_secret_access_key=secret_access_key)
    try:
        # Get User ARN
        command = 'aws --profile default sts get-caller-identity --query "Arn" --output text'
        result = subprocess.run(command, stdout=subprocess.PIPE, shell=True, check=True)
        user_arn = result.stdout.decode('utf-8').strip()
        # Get Username
        username = user_arn.split('/')[-1]
        response = iam.list_attached_user_policies(UserName=username)

        # Check if any attached policy grants the iam:GetAccountAuthorizationDetails permission
        for policy in response['AttachedPolicies']:
            policy_arn = policy['PolicyArn']
            policy_version = iam.get_policy(PolicyArn=policy_arn)['Policy']['DefaultVersionId']
            policy_document = iam.get_policy_version(PolicyArn=policy_arn, VersionId=policy_version)['PolicyVersion']['Document']
            #print(iam.get_policy_version(PolicyArn=policy_arn, VersionId=policy_version)['PolicyVersion']['Document']['Statement'][0]['Action'])
            for i in range(len(policy_document['Statement'][0]['Action'])):
                #print(policy_document['Statement'][0]['Action'][i])
                if 'Action' in policy_document['Statement'][0] and ('iam:GetAccountAuthorizationDetails' or 'iam:Get*') in policy_document['Statement'][0]['Action'][i]:
                    has_privileges=True
                    break
        print(f'{user_arn} has the iam:GetAccountAuthorizationDetails permission granted via policy {policy_arn}.')
    except ClientError as e:
        if e.response['Error']['Code'] == 'AccessDenied':
            has_privileges=False
    return has_privileges