from django.http import HttpResponse, JsonResponse
from ..auth.Auth import authenticated, get_access_token
from ..ssh.remote_vm import execute_vm_command, execute_python_command
from django.views.decorators.csrf import csrf_exempt
import json
import subprocess

def hello(request):
    if authenticated(request.headers.get('Authorization')):
        return HttpResponse("Hello")
    else:
        return JsonResponse({"error": "Authentication failed"}, status = 401)
    
def get_token(request):
    token = get_access_token(request.headers.get('Authorization'))
    if token:
        return JsonResponse({"access_token": token})
    else:
        return JsonResponse({"error": "Error obtaining token"}, status = 401)
    
@csrf_exempt 
def command_vm(request):
    if not authenticated(request.headers.get('Authorization')):
        return JsonResponse({"error": "Authentication failed"}, status = 401)
    
    try:
        data = json.loads(request.body.decode('utf-8'))
        command = data.get('command', '')
        output = execute_vm_command(command)
        return JsonResponse({"output": output})
    except json.JSONDecodeError:
        return JsonResponse({"error": "Invalid JSON in the request body"}, status=400)
     
@csrf_exempt   
def python_command(request):
    if not authenticated(request.headers.get('Authorization')):
        return JsonResponse({"error": "Authentication failed"}, status = 401)
    
    if request.method == 'POST':
        try:
            data = json.loads(request.body.decode('utf-8'))
            command = data.get('command', '')
            print(command)
            
            output = execute_python_command(command)
            return JsonResponse({"output": output})
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    else:
        return JsonResponse({'error': 'Only POST requests are allowed'}, status=400)