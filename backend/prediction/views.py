from AI.inference.predictor import predict_image
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .models import TextilePrediction
from .serializers import TextilePredictionSerializer

from .textile_data import TEXTILES

# Create your views here.
class PredictionAPIView(APIView):
    def post(self, request):
        serializer = TextilePredictionSerializer(data=request.data)

        if serializer.is_valid():
            prediction = serializer.save()
            print("Image saved successfully:", prediction.image.name)

            reasult = predict_image(prediction.image.path)
            info = TEXTILES.get(reasult["prediction"], {})

            prediction.predicted_class = reasult["prediction"]
            prediction.confidence = reasult["confidence"]
            prediction.save()

            return Response(
                {
                    "id": prediction.id,
                    "prediction": info.get("name", reasult["prediction"]),
                    "state": info.get("state"),
                    "technique": info.get("technique"),
                    "fabric": info.get("fabric"),
                    "description": info.get("description"),
                    "image_url": prediction.image.url,
                    "confidence": prediction.confidence,
                },
                status=status.HTTP_201_CREATED
            )

        print("serializer errors:", serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)