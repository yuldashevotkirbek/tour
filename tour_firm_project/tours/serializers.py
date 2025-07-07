# tours/serializers.py

from rest_framework import serializers
from .models import Tour

class TourSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tour
        fields = ['id', 'title', 'description', 'price', 'duration_days', 'image', 'is_active']