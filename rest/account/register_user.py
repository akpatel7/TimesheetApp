from django.contrib.auth import login, authenticate

from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.decorators import permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from database.forms import RegisterForm
from database.models import Account

import serializer


@api_view(['POST'])
@permission_classes([AllowAny, ])
def register_user(request):
    form = RegisterForm(request.data)

    if not form.is_valid():
        return Response({
            'message': form.error_message()
        },
            status=status.HTTP_406_NOT_ACCEPTABLE
        )

    # Create the account.
    user = form.save()

    # Create an account for the user.
    Account.objects.create(user=user)

    # Login user after registration.
    user = authenticate(
        username=form.cleaned_data['username'],
        password=form.cleaned_data['password1'],
    )

    # Login user.
    login(request, user)

    return Response({
        'account': serializer.single(user.account, detailed=True)
    },
        status=status.HTTP_201_CREATED
    )
