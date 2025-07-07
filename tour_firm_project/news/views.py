# news/views.py

from rest_framework import generics
from .models import NewsPost
from .serializers import NewsPostSerializer

class NewsPostListAPIView(generics.ListAPIView):
    queryset = NewsPost.objects.filter(is_published=True).order_by('-published_date')
    serializer_class = NewsPostSerializer

class NewsPostDetailAPIView(generics.RetrieveAPIView):
    queryset = NewsPost.objects.filter(is_published=True)
    serializer_class = NewsPostSerializer
    lookup_field = 'slug' # Slug orqali yangilikni olish uchun
    # lookup_field = 'id' # Agar ID orqali olishni xohlasangiz