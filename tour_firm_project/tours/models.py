from django.db import models

class Tour(models.Model):
    title = models.CharField(max_length=200, verbose_name="Tur nomi")
    slug = models.SlugField(unique=True, blank=True, verbose_name="Slug")  # Qo'shildi
    description = models.TextField(verbose_name="Tavsif")
    price = models.DecimalField(max_digits=10, decimal_places=2, verbose_name="Narxi")
    duration_days = models.IntegerField(verbose_name="Davomiyligi (kun)")
    image = models.ImageField(upload_to='tours/', blank=True, null=True, verbose_name="Rasm")
    is_active = models.BooleanField(default=True, verbose_name="Faol")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Tur"
        verbose_name_plural = "Turlar"
        ordering = ['-created_at']

    def __str__(self):
        return self.title