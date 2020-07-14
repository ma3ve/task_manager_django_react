from django.contrib import admin
from django.urls import path

from .views import task_list_view, task_detail_view, task_create_view, task_delete_view, task_update_view

urlpatterns = [
    path('', task_list_view),
    path('<int:id>', task_detail_view),
    path('create', task_create_view),
    path('<int:id>/delete', task_delete_view),
    path('update', task_update_view)

]
