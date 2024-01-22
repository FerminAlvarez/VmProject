from django.http import HttpResponse, JsonResponse
from ..auth.Auth import authenticated

def hello(request):
    if authenticated(request.headers.get('Authorization')):
        return HttpResponse("Hello")
    else:
        return JsonResponse({"error": "Authentication failed"}, status = 401)
    