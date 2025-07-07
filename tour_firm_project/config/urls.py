# config/urls.py

from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/core/', include('core.urls')),    # Aloqa formasi API
    path('api/tours/', include('tours.urls')),  # Turlar API
    path('api/news/', include('news.urls')),    # Yangiliklar API
]

# Rivojlanish paytida media fayllarni ko'rsatish uchun
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)