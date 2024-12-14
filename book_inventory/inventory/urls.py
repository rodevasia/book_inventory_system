from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import BookViewSet

# Create a DefaultRouter instance and register the viewset
router = DefaultRouter()
router.register(r'books', BookViewSet)

# Define URL patterns using path()
urlpatterns = [
    path('api/', include(router.urls)),  # This will include the URL patterns from the router
]
