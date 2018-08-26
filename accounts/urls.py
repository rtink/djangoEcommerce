from django.urls import path, re_path

from .views import (
    AccountHomeView,
)

app_name = 'accounts'

urlpatterns = [
    path(r'', AccountHomeView.as_view(), name='home'),
]