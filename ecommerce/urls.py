"""ecommerce URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf import settings
from django.conf.urls.static import static

from django.urls import path, re_path, include
from django.contrib import admin
from django.contrib.auth.views import LogoutView
from django.views.generic import TemplateView

from accounts.views import LoginView, RegisterView, guest_register_view
from addressess.views import checkout_address_create_view, checkout_address_reuse_view
from carts.views import cart_detail_api_view

from .views import home_page, about_page, contact_page


urlpatterns = [
    path(r'', home_page, name='home'),
    path(r'about/', about_page, name='about'),
    path(r'contact/', contact_page, name='contact'),
    path(r'login/', LoginView.as_view(), name='login'),
    path(r'checkout/address/create/', checkout_address_create_view, name='checkout_address_create'),
    path(r'checkout/address/reuse/', checkout_address_reuse_view, name='checkout_address_reuse'),
    path(r'register/guest/', guest_register_view, name='guest_register'),
    path(r'logout/', LogoutView.as_view(), name='logout'),
    path(r'api/cart/', cart_detail_api_view, name='api-cart'),
    path(r'cart/', include("carts.urls", namespace='cart')),
    path(r'register/', RegisterView.as_view(), name='register'),
    path(r'bootstrap/', TemplateView.as_view(template_name='bootstrap/example.html')),
    path(r'products/', include("products.urls", namespace='products')),
    path(r'search/', include("search.urls", namespace='search')),
    path('admin/', admin.site.urls),
]

if settings.DEBUG:
    urlpatterns = urlpatterns + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns = urlpatterns + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)