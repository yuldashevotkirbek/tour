# tours/admin.py

from django.contrib import admin
from .models import Tour

@admin.register(Tour)
class TourAdmin(admin.ModelAdmin):
    list_display = ('title', 'price', 'duration_days', 'is_active', 'created_at')
    list_filter = ('is_active', 'duration_days')
    search_fields = ('title', 'description')
    prepopulated_fields = {'slug': ('title',)}  # Agar slug maydoni bo'lsa