from django.urls import path, re_path

from .views import (
    ProductListView, 
    ProductDetailSlugView,
)

app_name = 'products'

urlpatterns = [
    path(r'', ProductListView.as_view(), name='list'),
    path(r'<slug>/', ProductDetailSlugView.as_view(), name='detail'),
]