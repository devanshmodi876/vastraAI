from ml.inference.predictor import predict_image
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .models import TextilePrediction
from .serializers import TextilePredictionSerializer
from .textile_data import TEXTILES

from django.http import FileResponse
from .pdf_generator import generate_prediction_pdf



# Create your views here.


class DownloadReportAPIView(APIView):

    def get(self, request, pk):
        prediction = TextilePrediction.objects.get(id=pk)

        info = TEXTILES.get(prediction.predicted_class.lower(), {})

        pdf = generate_prediction_pdf({
            "prediction": prediction.predicted_class,
            "confidence": prediction.confidence,
            "state": info.get("state"),
            "technique": info.get("technique"),
            "fabric": info.get("fabric"),
            "description": info.get("description"),
            "fact": info.get("fact"),
        })

        return FileResponse(
            pdf,
            as_attachment=True,
            filename="vastra_report.pdf",
        )

class PredictionAPIView(APIView):
    def get(self, request):
        predictions = TextilePrediction.objects.all().order_by('-created_at')
        serializer = TextilePredictionSerializer(predictions, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = TextilePredictionSerializer(data=request.data)

        if serializer.is_valid():
            prediction = serializer.save()

            try:
                print("=== NEW CODE IS RUNNING ===", flush=True)
                print("ABOUT TO CALL PREDICT_IMAGE", flush=True)

                result = predict_image(prediction.image.path)

                print("=== PREDICT_IMAGE RETURNED ===", flush=True)
                print(result, flush=True)

                result = predict_image(
                    prediction.image.path
                )

                print("=== PREDICTION 2: Prediction completed ===")
                print("Prediction result:", result)

                info = TEXTILES.get(
                    result["prediction"].lower(),
                    {}
                )

                prediction.predicted_class = result["prediction"]
                prediction.confidence = result["confidence"]
                prediction.save()

                return Response(
                    {
                        "id": prediction.id,
                        "prediction": info.get(
                            "name",
                            result["prediction"]
                        ),
                        "state": info.get("state"),
                        "technique": info.get("technique"),
                        "fabric": info.get("fabric"),
                        "description": info.get("description"),
                        "image_url": prediction.image.url,
                        "confidence": prediction.confidence,
                        "fact": info.get("fact"),
                    },
                    status=status.HTTP_201_CREATED
                )

            except Exception as e:
                import traceback

                traceback.print_exc()

                return Response(
                    {
                        "error": str(e)
                    },
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR
                )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )