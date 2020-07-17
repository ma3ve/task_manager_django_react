from django.shortcuts import render
from rest_framework.response import Response
from .serializers import Task_serialzer, Task_update_serializer
from rest_framework.decorators import api_view, permission_classes
from datetime import datetime
from .models import Task
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User
# Create your views here.


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def task_list_view(requests, *args, **kwargs):
    user_qs = User.objects.filter(username=requests.user.username)
    if not user_qs.exists():
        return Response({"error": "invalid token"}, status=403)
    # user_qs =
    # if(requests.user):
    qs = Task.objects.filter(user=requests.user)
    # print(qs)
    serializer = Task_serialzer(qs, many=True)
    # print(serializer.data)
    return Response(data=serializer.data, status=200)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def task_detail_view(requests, id, *args, **kwargs):
    user_qs = User.objects.filter(username=requests.user.username)
    if not user_qs.exists():
        return Response({"error": "invalid token"}, status=403)
    qs = Task.objects.filter(id=id)
    if not qs.exists():
        return Response({}, status=404)
    serializer = Task_serialzer(qs.first())
    return Response(data=serializer.data, status=200)
    # serializer = Task_serialzer(qs[])


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def task_create_view(requests, *args, **kwargs):
    user_qs = User.objects.filter(username=requests.user.username)
    if not user_qs.exists():
        return Response({"error": "invalid token"}, status=403)
    # print(requests.POST, requests.data)
    serializer = Task_serialzer(data=requests.data)
    if serializer.is_valid(raise_exception=True):
        serializer.save(user=user_qs.first())
    # serializer.save()
    # print(serializer.data)
    return Response(data=serializer.data, status=201)


@api_view(['POST', 'DELETE'])
@permission_classes([IsAuthenticated])
def task_delete_view(requests, id, *args, **kwargs):
    user_qs = User.objects.filter(username=requests.user.username)
    if not user_qs.exists():
        return Response({"error": "invalid token"}, status=403)
    qs = Task.objects.filter(id=id)
    if not qs.exists():
        return Response({"message": "task doesnt exists"}, status=404)
    obj = qs.first()
    obj.delete()
    return Response({}, status=200)


# to be completed
@api_view(['PATCH', 'POST'])
@permission_classes([IsAuthenticated])
def task_update_view(requests, *args, **kwargs):
    # print(requests.data)
    user_qs = User.objects.filter(username=requests.user.username)
    if not user_qs.exists():
        return Response({"error": "invalid token"}, status=403)
    # if (not type(requests.data["completeby"]) is datetime):
    #     requests.data["completeby"] = datetime.strptime(
    #         requests.data["completeby"], '%Y-%m-%d-%H-%M')

    update_serializer = Task_update_serializer(data=requests.data)

    # print(type(requests.data["id"]))
    # print(type(datetime.strptime("2000-08-17-12-33", '%Y-%m-%d-%H-%M'))
    #       is datetime)

    if update_serializer.is_valid(raise_exception=True):
        # print("validated data =", update_serializer.validated_data["method"])
        task = Task.objects.filter(
            id=update_serializer.validated_data["id"]).first()

        if update_serializer.validated_data["method"] == 'change_date':
            # print(update_serializer.validated_data["completeby"])
            # print(update_serializer.validated_data)
            task.completeby = update_serializer.validated_data["completeby"]
            task.save()
            return Response({"completeby" : task.completeby}, 200)

        if update_serializer.validated_data["method"] == 'make_task_incomplete':
            # print(update_serializer.validated_data["completeby"])
            task.completed = False
            task.save()
            return Response({"completed" : task.completed}, 200)


        if update_serializer.validated_data["method"] == 'make_task_complete':
            # print(update_serializer.validated_data["completeby"])

            task.completed = True
            task.save()
            return Response({"completed" : task.completed}, 200)

    return Response({}, 200)
