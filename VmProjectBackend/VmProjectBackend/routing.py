from django.urls import path
from .consumers import MyConsumer

websocket_urlpatterns = [
    path('', MyConsumer.as_asgi()),
]