from django.shortcuts import render

# Create your views here.


def home_page_view(requests, *args, **kwargs):
    return render(requests, "home.html")


def register_page_view(requests, *args, **kwargs):
    return render(requests, "register.html")


def login_page_view(requests, *args, **kwargs):
    return render(requests, "login.html")
