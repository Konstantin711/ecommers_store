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
    path('create_order/', views.createNewOrder, name='creates new order'),
    path('get_current_price/', views.get_current_price, name='current price for items in cart'),

    path('admin/', views.getAdminSite, name='Get basic admin page'),
    path('add/new-item/', views.addNewItem, name='add new item'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)