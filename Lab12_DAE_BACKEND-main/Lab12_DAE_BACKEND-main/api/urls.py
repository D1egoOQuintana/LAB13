from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CategoryViewSet, SerieViewSet, LoginView

router = DefaultRouter()
router.register(r'categories', CategoryViewSet)
router.register(r'series', SerieViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('login/', LoginView.as_view(), name='login'),
]