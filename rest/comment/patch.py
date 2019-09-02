from rest_framework import status
from rest_framework.response import Response

from database.models import Comment
from element.group_message import send_project_wide
from element.log import Log
from rest.utilities import hold_permission

import serializer

log = Log('rest')


def patch(request, pk):
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

    if not hold_permission(request.user, 'change_all_comment'):
        if not comment.account == request.user.account:
            return Response({
                'message': 'You can only change your own comments.'
            },
                status=status.HTTP_403_FORBIDDEN
            )

    message = request.data.get('message', None)
    if not message:
        log.error('Recieved a blank message field')
        return Response({
            'message': 'Received blank message field.'
        },
            status=status.HTTP_406_NOT_ACCEPTABLE,
        )

    # All ok, save message edit.
    comment.message = message
    comment.is_edited = True
    comment.save()

    serialized_comment = serializer.single(comment)

    redux_action = {
        'type': 'COMMENT-LOAD',
        'comment': serialized_comment
    }

    # TODO: Rewrite as element action.
    send_project_wide(
        request.user.account.active_project,
        redux_action
    )

    return Response({
        'comment': serialized_comment
    },
        status=status.HTTP_202_ACCEPTED
    )
