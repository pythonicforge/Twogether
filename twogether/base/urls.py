from django.urls import path
from . import views

urlpatterns = [
    path('', views.lobby, name='lobby'),
    path('room/', views.room, name='room'),
    path('get_token/', views.get_token, name='get_token'),
    path('create_user/', views.create_user, name='create_user'),
    path('get_user/', views.get_user, name='get_user'),
]
