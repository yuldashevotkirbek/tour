# news/urls.py

from django.urls import path
from .views import NewsPostListAPIView, NewsPostDetailAPIView

urlpatterns = [
    path('', NewsPostListAPIView.as_view(), name='news_list'),
    path('<slug:slug>/', NewsPostDetailAPIView.as_view(), name='news_detail'), # Agar slug ishlatilgan bo'lsa
    # path('<int:id>/', NewsPostDetailAPIView.as_view(), name='news_detail'), # Agar ID ishlatilgan bo'lsa
]