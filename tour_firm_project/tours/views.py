# tours/views.py

from rest_framework import generics
from .models import Tour
from .serializers import TourSerializer

class TourListAPIView(generics.ListAPIView):
    queryset = Tour.objects.filter(is_active=True).order_by('-created_at')
    serializer_class = TourSerializer

class TourDetailAPIView(generics.RetrieveAPIView):
    queryset = Tour.objects.filter(is_active=True)
    serializer_class = TourSerializer
    lookup_field = 'id' # Agar ID bilan qidirmoqchi bo'lsangiz