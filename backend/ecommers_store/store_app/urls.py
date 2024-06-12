from django.urls import path
from . import views

from django.conf import settings
from django.conf.urls.static import static


urlpatterns = [
    path('', views.getAllURIs, name='get all uri'),
    path('catalog/<str:slug>/all/', views.getCatalogData, name='get_catalog_data_without_type'),
    path('catalog/<str:slug>/<str:type>/all/', views.getCatalogData, name='get_catalog_data_with_type'),
    path('catalog/<str:slug>/', views.getItemBySlug, name='get item by slug'),
    path('get/detailed/detailed/', views.getDetailedCatalogData, name='get detailed catalog data'),
    path('add/new-item/', views.addNewItem, name='add new item'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)