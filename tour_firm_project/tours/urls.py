# tours/urls.py

from django.urls import path
from .views import TourListAPIView, TourDetailAPIView

urlpatterns = [
    path('', TourListAPIView.as_view(), name='tour_list'),
    path('<int:id>/', TourDetailAPIView.as_view(), name='tour_detail'),
]