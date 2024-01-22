from django.http import HttpResponse, JsonResponse
from ..auth.Auth import authenticated, get_access_token

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
    