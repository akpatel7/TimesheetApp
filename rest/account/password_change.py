from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view


@api_view(['POST'])
def password_change(request):
    form = request.data
    # Check for password match and length
    if (form['password'] == form['password_again'] and
       len(form['password']) > 4):

        # Set new password.
        request.user.set_password(form['password'])

        request.user.save()

        return Response(
            'Password updated.',
            status=status.HTTP_202_ACCEPTED
        )

    # Passwords did not match or too short.
    else:
        return Response({
            'message': 'Password did not match or was too short'
        },
            status=status.HTTP_406_NOT_ACCEPTABLE
        )
