from django.contrib import admin
from django.urls import path, include
from knox import views as knox_views
from .views import register_view, login_view, get_user_view
# from tasks.urls import

urlpatterns = [
    path("", include('knox.urls')),
    path("register", register_view),
    path("login", login_view),
    path('logout', knox_views.LogoutView.as_view(), name='knox_logout'),
    path('user', get_user_view)
]
