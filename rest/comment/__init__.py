# Modules definition
from get import get
from list import List
from patch import patch
from post import post
from delete import delete
from children import Children

from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView


class Api(APIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def get(self, request, pk):
        return get(request)

    def post(self, request):
        return post(request)

    def patch(self, request, pk):
        return patch(request, pk)

    def delete(self, request, pk):
        return delete(request, pk)
