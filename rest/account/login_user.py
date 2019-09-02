from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth import login
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.decorators import permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from database.models import Account

import serializer


@api_view(['POST'])
@permission_classes([AllowAny, ])
def login_user(request):
    form = AuthenticationForm(data=request.data)

    if form.is_valid():
        user = form.get_user()

        if not Account.objects.filter(user=user).exists():
            return Response({
                'message': 'The user does not have an associated Account object. Contact your system administrator.'
            },
                status=status.HTTP_406_NOT_ACCEPTABLE
            )

        # Perform the actual login.
        login(request, user)

        return Response({
            'account': serializer.single(user.account, detailed=True)
        },
            status=status.HTTP_202_ACCEPTED
        )
    else:
        return Response({
            'message': 'Username or password is incorrect.'
        },
            status=status.HTTP_406_NOT_ACCEPTABLE
        )
