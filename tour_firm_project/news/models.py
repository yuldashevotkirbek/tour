# news/models.py

from django.db import models
from django.utils import timezone

class NewsPost(models.Model):
    title = models.CharField(max_length=255, verbose_name="Sarlavha")
    slug = models.SlugField(max_length=255, unique=True, verbose_name="Slug") # URL uchun
    content = models.TextField(verbose_name="Matn")
    image = models.ImageField(upload_to='news/', blank=True, null=True, verbose_name="Rasm")
    published_date = models.DateTimeField(default=timezone.now, verbose_name="Nashr etilgan sana")
    is_published = models.BooleanField(default=True, verbose_name="Nashr etilgan")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Yangilik"
        verbose_name_plural = "Yangiliklar"
        ordering = ['-published_date']

    def __str__(self):
        return self.title