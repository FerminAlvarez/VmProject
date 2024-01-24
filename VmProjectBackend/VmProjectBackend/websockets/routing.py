from django.urls import path
from .consumer_vm import ConsumerVM

websocket_urlpatterns = [
    path('vm/', ConsumerVM.as_asgi()),
]