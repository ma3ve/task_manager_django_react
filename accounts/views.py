from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from .serializers import User_serializer, Login_serializer, Register_serializer, Login_serializer
from knox.models import AuthToken
# Create your views here.

# register


@api_view(['POST'])
def register_view(requests, *args, **kwargs):
    serializer = Register_serializer(data=requests.data)
    if(serializer.is_valid(raise_exception=True)):
        user, token = serializer.save()
        return Response({"username": user.username, "email": user.email, "id": user.id, "token": token}, status=200)


# login
@api_view(['POST'])
def login_view(requests, *args, **kwargs):
    serializer = Login_serializer(data=requests.data)
    if(serializer.is_valid(raise_exception=True)):
        user = serializer.validated_data
        token = AuthToken.objects.create(user)[1]
        return Response({"username": user.username, "email": user.email, "id": user.id, "token": token}, status=200)

# logout


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_view(requests, *args, **kwargs):
    # print(requests.user)
    # print("authenticated")
    # print(requests.META)
    # import re

    # regex_http_ = re.compile(r'^HTTP_.+$')
    # regex_content_type = re.compile(r'^CONTENT_TYPE$')
    # regex_content_length = re.compile(r'^CONTENT_LENGTH$')

    # request_headers = {}
    # for header in requests.META:
    #     if regex_http_.match(header) or regex_content_type.match(header) or regex_content_length.match(header):
    #         request_headers[header] = requests.META[header]
    # print(request_headers)
    if(requests.user):

        return Response({"username": requests.user.username, "email": requests.user.email})
    return Response({"detail": "Invalid token."}, status=401)
# forget
