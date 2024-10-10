from django.urls import include, path
from rest_framework import routers
from .views import UserViewSet,ContactsViewSet,TasksViewSet



router = routers.SimpleRouter()
router.register(r'users', UserViewSet, basename='users')
router.register(r'contacts', ContactsViewSet, basename='contacts')
router.register(r'tasks', TasksViewSet, basename='tasks')

urlpatterns = [
    path('', include(router.urls)),
]
