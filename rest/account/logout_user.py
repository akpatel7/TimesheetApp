from rest_framework import status
from rest_framework.response import Response
from django.contrib.auth import logout
from rest_framework.decorators import api_view


@api_view(['POST'])
def logout_user(request):
    logout(request)

    return Response(
        'User logged out.',
        status=status.HTTP_202_ACCEPTED
    )
