from ...models import Results
from django.http import JsonResponse
from rest_framework.decorators import api_view
import json

@api_view(['GET'])
def get_results(request):
    case_id = request.query_params.get('case_id')
    try:
        scan_result = Results.objects.get(case_id=case_id)
    except Results.DoesNotExist:
        return JsonResponse({'error': 'Result not found'}, status=404)

    scout_path = scan_result.scout_path
    cloud_path = scan_result.cloud_path

    data = {}
    with open(scout_path, 'r') as f:
        scout_result = json.load(f)

    with open(cloud_path, 'r') as f:
        cloud_result = json.load(f)

    scout_result['services']['iam'] = cloud_result

    return JsonResponse({'data': scout_result})