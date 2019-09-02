from django.contrib.auth import logout

from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.response import Response


def logout_user(request):
    # Delete token on logout.
    Token.objects.filter(user=request.user).delete()

    logout(request)

    return Response({
        'message': 'bye bye!'
    },
        status=status.HTTP_202_ACCEPTED,
    )
