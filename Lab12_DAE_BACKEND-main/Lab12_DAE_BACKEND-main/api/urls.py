from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CategoryViewSet, SerieViewSet

router = DefaultRouter()
router.register(r'categories', CategoryViewSet)
router.register(r'series', SerieViewSet)

urlpatterns = [
    path('', include(router.urls)),
]