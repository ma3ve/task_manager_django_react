from django.shortcuts import render

# Create your views here.


def index1(request):
    return render(request, 'index1.html', {})


def index2(request):
    return render(request, 'index2.html', {})
