from django.db import models
from django.contrib.auth.models import User
# Create your models here.


class Task(models.Model):
    task = models.TextField(blank=False)
    timestamp = models.DateTimeField(auto_now_add=True)
    completeby = models.DateTimeField(blank=True, null=True)
    completed = models.BooleanField(default=False)
    user = models.ForeignKey(User, related_name='tasks',
                             on_delete=models.CASCADE)
