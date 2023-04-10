from django.http import JsonResponse
from ...models import Policy
from celery import shared_task


@shared_task
def get_history(request):
    policies = Policy.objects.all()
    results = []
    for policy in policies:
        results.append({
            'Case_ID' : policy.case_id,
            'Access_Key_ID': policy.AWS_ACCESS_KEY_ID,
            'Profile_Name': policy.profile_name,
            'Scan_Date': policy.created_at,
        })
    return JsonResponse({'results': results})
