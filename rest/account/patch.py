import base64

from rest_framework import status
from rest_framework.response import Response
from django.core.files.base import ContentFile
from django.contrib.auth.models import User
from rest_framework.decorators import api_view

from timesheets.log import Log

import serializer

log = Log('rest')


@api_view(['PATCH'])
def patch(self, request, pk):
    try:
        user = User.objects.get(id=pk)

        photo = request.data['photo']

        file_name = '%s_photo.jpg' % user.id

        if photo:
            try:
                # Photo is expected in a javascript, base64 encoded format.
                # Javascript encodes in the following format:
                # data:[<MIME-type>][;charset=<encoding>][;base64],<data>
                file_info, blob = photo.split(',')

                # Delete previous photo if user has one.
                if user.account.photo:
                    user.account.photo.delete()

                user.account.photo.save(
                    file_name,
                    ContentFile(base64.b64decode(blob))
                )
                user.account.save()
            except ValueError:
                log.error('Could not edit user.')
                log.error('Photo received is in an incorrect format.')
                log.exception()

        first_name = request.data.get('first_name', None)
        if first_name is not None:
            user.first_name = first_name

        last_name = request.data.get('last_name', None)
        if last_name is not None:
            user.last_name = last_name

        email = request.data.get('email', None)
        if email is not None:
            user.email = email

        user.save()

    except KeyError:
        log.error('Edit user failed: KeyError.')
        log.error('Arguments received:', request.data)
        log.exception()
        return Response({
            'message': 'Not all fields received.'
        },
            status=status.HTTP_406_NOT_ACCEPTABLE
        )

    return Response(serializer.single(user.account), status=status.HTTP_202_ACCEPTED)
