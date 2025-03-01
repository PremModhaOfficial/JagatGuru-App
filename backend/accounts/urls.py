from django.urls import path
from .views import RegisterView, CustomTokenObtainPairView, LogoutView, UserProfileView
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('signup/', RegisterView.as_view(), name='register'),  # Signup
    path('login/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),  # Login
    path('refresh/', TokenRefreshView.as_view(), name='token_refresh'),  # Token Refresh
    path('logout/', LogoutView.as_view(), name='logout'),  # Logout
    path('profile/', UserProfileView.as_view(), name='profile'),  # Get User Profile
]
