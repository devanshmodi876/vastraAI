from rest_framework import serializers
from .models import TextilePrediction

class TextilePredictionSerializer(serializers.ModelSerializer):
    class Meta:
        model = TextilePrediction
        fields = '__all__'