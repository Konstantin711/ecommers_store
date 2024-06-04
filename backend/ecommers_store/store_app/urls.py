from django.urls import path
from . import views

from django.conf import settings
from django.conf.urls.static import static


urlpatterns = [
    path('', views.getAllURIs, name='get all uri'),
    path('<str:slug>/all/', views.getAllByParent, name='get all by parent'),
    path('<str:p_slug>/<str:t_slug>/all/', views.getAllByType, name='get all by type'),
    path('<str:slug>/', views.getItemBySlug, name='get item by slug'),
    path('add/new-item/', views.addNewItem, name='add new item'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)