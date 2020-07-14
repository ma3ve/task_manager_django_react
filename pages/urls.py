from django.contrib import admin
from django.urls import path


from .views import home_page_view, register_page_view, login_page_view

urlpatterns = [
    path('', home_page_view),
    path('register', register_page_view),
    path('login', login_page_view)

]
