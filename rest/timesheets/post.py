from rest_framework import status
from rest_framework.response import Response

from database.models import Timesheet

from timesheets.log import Log

import serializer

log = Log('rest')


def post(request):
    print 'Post timesheet:', request.data

    date = request.data.get('date', None)
    if not date:
        return Response({
            'message': 'Where is the date?'
        },
            status=status.HTTP_406_NOT_ACCEPTABLE
        )

    timesheet = Timesheet.objects.get_or_create(
        account=request.user.account,
        date=date,
    )[0]

    return Response({
        'timesheet': serializer.single(timesheet)
    },
        status=status.HTTP_200_OK
    )
