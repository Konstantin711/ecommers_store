from django.urls import path
from . import views


urlpatterns = [
    path('', views.getAllURIs, name='get all uri'),
    path('<str:slug>/all/', views.getAllByParent, name='get all by parent'),
    path('<str:p_slug>/<str:t_slug>/all/', views.getAllByType, name='get all by type'),
    path('<str:slug>/', views.getItemBySlug, name='get item by slug'),
    path('add/new-item/', views.addNewItem, name='add new item')
]