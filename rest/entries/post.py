from rest_framework import status
from rest_framework.response import Response

from database.models import Timesheet, Entry

from timesheets.log import Log

from rest.timesheets import serializer

log = Log('rest')


def post(request):
    timesheet_id = request.data.get('timesheetId', None)
    duration = request.data.get('duration', None)
    task = request.data.get('task', None)

    if not timesheet_id or not duration or not task:
        return Response({
            'message': 'You are missing some stuff there...'
        },
            status=status.HTTP_406_NOT_ACCEPTABLE
        )

    try:
        timesheet = Timesheet.objects.get(
            id=timesheet_id,
            account=request.user.account
        )

    except Timesheet.DoesNotExist:
        return Response({
            'message': 'Can not find that timesheet.'
        },
            status=status.HTTP_404_NOT_FOUND
        )

    entry = Entry.objects.create(
        timesheet=timesheet,
        duration=duration,
        task=task
    )

    return Response({
        'timesheet': serializer.single(entry.timesheet)
    },
        status=status.HTTP_200_OK
    )
