from django.urls import path
from .views.auth import MyTokenObtainPairView, register
from .views.scan import AWS_account_details
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)


urlpatterns = [
    path('scan/',AWS_account_details),
    path('register/',register),
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
