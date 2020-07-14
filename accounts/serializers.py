from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from knox.models import AuthToken

# user serializer


class User_serializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']


# register serializer

class Register_serializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self,  validated_data):

        user = User(
            username=validated_data['username'], email=validated_data['email'])
        user.set_password(validated_data['password'])
        user.save()

        token = AuthToken.objects.create(user)

        # print(user)
        return user, token[1]


# login serializer

class Login_serializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Incorrect Credentials")
