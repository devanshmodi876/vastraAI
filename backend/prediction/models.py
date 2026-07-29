from django.db import models

# Create your models here.
class TextilePrediction(models.Model):
    image = models.ImageField(upload_to='uploads/')
    predicted_class =  models.CharField(max_length=100, blank= True)
    confidence = models.FloatField(default=0.0)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.id} - {self.predicted_class}"