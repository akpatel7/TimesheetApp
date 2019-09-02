from rest_framework import status
from rest_framework.response import Response

from database.models import Entry, Timesheet
from timesheets.log import Log

from rest.timesheets import serializer

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
        entry = Entry.objects.get(
            timesheet__account=request.user.acccount,
            id=id
        )
    except Entry.DoesNotExist:
        return Response({
            'message': 'Can not find that entry.'
        },
            status=status.HTTP_406_NOT_ACCEPTABLE
        )

    entry.delete()

    timesheets = Timesheet.objects.filter(account=request.user.account)

    return Response({
        'message': 'Entry deleted.',
        'timesheets': serializer.list(timesheets)
    },
        status=status.HTTP_200_OK
    )
