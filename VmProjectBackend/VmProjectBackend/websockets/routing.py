from django.urls import path
from .consumers.vm_websocket_consumer import ConsumerVM
from .consumers.python_websocket_consumer import ConsumerPY

websocket_urlpatterns = [
    path("vm/", ConsumerVM.as_asgi()),
    path("python/", ConsumerPY.as_asgi()),
]
