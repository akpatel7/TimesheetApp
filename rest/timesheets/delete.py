from rest_framework import status
from rest_framework.response import Response

from database.models import Timesheet
from timesheets.log import Log

import serializer

log = Log('rest')


def delete(request):
    id = request.data.get('id', None)

    if not id:
        return Response({
            'message': 'Delete what? no id received.'
        },
            status=status.HTTP_406_NOT_ACCEPTABLE
        )

    try:
        timesheet = Timesheet.objects.get(
            account=request.user.account,
            id=id
        )
    except Timesheet.DoesNotExist:
        return Response({
            'message': 'Can not find that timesheet.'
        },
            status=status.HTTP_406_NOT_ACCEPTABLE
        )

    timesheet.delete()

    timesheets = Timesheet.objects.filter(account=request.user.account)

    return Response({
        'message': 'Timesheet deleted.',
        'timesheets': serializer.list(timesheets)
    },
        status=status.HTTP_200_OK
    )
