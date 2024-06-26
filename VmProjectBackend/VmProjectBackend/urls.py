"""
URL configuration for VmProjectBackend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from .views import views

urlpatterns = [
    path("admin/", admin.site.urls),
    path("hello/", views.hello, name="hello"),
    path("auth/", views.get_token, name="get_token"),
    path("execute-command-vm", views.command_vm, name="command_vm"),
    path("execute-command-python", views.python_command, name="python_command"),
    path("file-python", views.file_python, name="file_python"),
]
