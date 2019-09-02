from rest_framework import status
from rest_framework.response import Response

from database.models import Entry, Timesheet
from timesheets.log import Log

from rest.timesheets import serializer

log = Log('rest')


def patch(request):
    id = request.data.get('id', None)

    if not id:
        return Response({
            'message': 'Delete what? no id received.'
        },
            status=status.HTTP_406_NOT_ACCEPTABLE
        )

    try:
        Entry.objects.get(
            timesheet__account=request.user.acccount,
            id=id
        ).update(
            task=request.data.get('task', None),
            duration=request.data.get('duration', None)
        )

    except Entry.DoesNotExist:
        return Response({
            'message': 'Can not find that entry.'
        },
            status=status.HTTP_406_NOT_ACCEPTABLE
        )

    timesheets = Timesheet.objects.filter(account=request.user.account)

    return Response({
        'message': 'Entry deleted.',
        'timesheets': serializer.list(timesheets)
    },
        status=status.HTTP_200_OK
    )
