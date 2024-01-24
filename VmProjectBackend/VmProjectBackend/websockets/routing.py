from django.urls import path
from .consumer_vm import ConsumerVM
from .consumer_python import ConsumerPY

websocket_urlpatterns = [
    path('vm/', ConsumerVM.as_asgi()),
    path('python/', ConsumerPY.as_asgi()),
]