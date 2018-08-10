from django.urls import path, re_path

from .views import (
    cart_home, 
    cart_update,
    checkout_home,
    checkout_done_view
)

app_name = 'carts'

urlpatterns = [
    path(r'', cart_home, name='home'),
    path(r'checkout/success/', checkout_done_view, name='success'),
    path(r'checkout/', checkout_home, name='checkout'),
    path(r'update/', cart_update, name='update'),
]