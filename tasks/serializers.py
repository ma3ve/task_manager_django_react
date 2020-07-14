from rest_framework import serializers
from .models import Task

ACCEPTED_METHODS = ['change_date',
                    'make_task_incomplete', 'make_task_complete']


class Task_serialzer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ['id', 'task',  'completeby', 'timestamp', 'completed']


class Task_update_serializer(serializers.Serializer):
    id = serializers.IntegerField()
    method = serializers.CharField()
    completeby = serializers.DateTimeField(required=False)  # to be completed

    def validate_method(self, value):
        value = value.lower().strip()
        if not value in ACCEPTED_METHODS:
            serializers.ValidationError("plz provide correct method")
        return value
