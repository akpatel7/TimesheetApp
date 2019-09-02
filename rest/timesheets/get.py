from rest_framework import status
from rest_framework.response import Response

from database.models import Timesheet

from timesheets.log import Log

import serializer

log = Log('rest')


def get(request):
    timesheets = Timesheet.objects.filter(account=request.user.account)
    print 'Timesheets:', timesheets

    return Response({
        'timesheets': serializer.list(timesheets)
    },
        status=status.HTTP_200_OK
    )
