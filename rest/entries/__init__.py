# Modules definition
from delete import delete
from patch import patch
from post import post

from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView


class Api(APIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        return post(request)

    def patch(self, request):
        return patch(request)

    def delete(self, request):
        return delete(request)
