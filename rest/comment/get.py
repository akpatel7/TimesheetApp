from rest_framework import status
from rest_framework.response import Response

from database.models import Comment
from element.log import Log

log = Log('rest')

import serializer


def get(request, pk):
    try:
        comment = Comment.objects.get(
            id=pk,
            project=request.user.account.active_project
        )

    except Comment.DoesNotExist:
        log.exception()
        return Response({
            'message': 'Could not find that comment.'
        },
            status=status.HTTP_404_NOT_FOUND
        )

    return Response({
        'comment': serializer.single(comment)
    },
        status=status.HTTP_200_OK,
    )
