import boto3
import botocore
import json
import sys
from celery import shared_task

import os
from django.conf import settings
from base.models import Policy
@shared_task
def iam_list_policies_attached(AWS_ACCESS_KEY_ID, region):
    '''
    Lists all the managed policies that are available in your AWS account, including your own customer-defined managed policies and all AWS managed policies.
    adds the OnlyAttached=True flag
    '''
    output = {}
    print("### Printing IAM Policies ###")
    try:
        client = boto3.client('iam', region_name=region)
        response = client.list_policies(OnlyAttached=True)
        if response.get('Policies') is None:
            print("{} likely does not have IAM permissions\n".format(AWS_ACCESS_KEY_ID))
        elif len(response['Policies']) <= 0:
            print("[-] ListPolicies allowed for {} but no results [-]\n".format(region))
        else:
            for policy in response['Policies']:
                policy_name = policy['PolicyName']
                output[policy_name] = policy
            # Save output to a JSON file
            path = os.path.join(settings.BASE_DIR, 'policies.json')
            print(path)
            with open(path, 'w') as f:
                json.dump(output, f, default=str, indent=4)
            # Save the file path to the database
            policy = Policy(file_path=path)
            policy.save()
    except botocore.exceptions.ClientError as e:
        if e.response['Error']['Code'] == 'InvalidClientTokenId':
            sys.exit("{} : The AWS KEY IS INVALID. Exiting".format(AWS_ACCESS_KEY_ID))
        elif e.response['Error']['Code'] == 'AccessDenied':
            print('{} : Is NOT a root/IAM key'.format(AWS_ACCESS_KEY_ID))
        elif e.response['Error']['Code'] == 'SubscriptionRequiredException':
            print('{} : Has permissions but isnt signed up for service - usually means you have a root account'.format(AWS_ACCESS_KEY_ID))
        elif e.response['Error']['Code'] == 'OptInRequired':
            print('{} : Has permissions but isnt signed up for service - usually means you have a root account'.format(AWS_ACCESS_KEY_ID))
        else:
            print("Unexpected error: {}".format(e))
    except KeyboardInterrupt:
        print("CTRL-C received, exiting...")
    return path
