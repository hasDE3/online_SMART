"""smart_backend URL Configuration
"""

from django.contrib import admin
from django.urls import path
from django.conf.urls import url, include
from rest_framework_jwt.views import obtain_jwt_token

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),
    url(r'^api/auth/login/$', obtain_jwt_token, name='api-login'),
    url(r'^api/', include('smart_main.urls')),
]
