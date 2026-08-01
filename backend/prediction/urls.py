from django.urls import path
from .views import PredictionAPIView, DownloadReportAPIView

urlpatterns = [
    path('predict/', PredictionAPIView.as_view()),
    path('report/<int:pk>/', DownloadReportAPIView.as_view()),
]