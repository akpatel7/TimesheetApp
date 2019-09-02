from rest_framework import status
from rest_framework.response import Response

from database.models import Comment
from element.group_message import send_project_wide
from element.log import Log
from rest.utilities import hold_permission

import serializer


log = Log('rest')


def delete(request, pk):
    try:
        comment = Comment.objects.get(
            id=pk,
            project=request.user.account.active_project
        )

    except Comment.DoesNotExist:
        log.exception()
        return Response({
            'message': 'That comment does not exist'
        },
            status=status.HTTP_406_NOT_ACCEPTABLE
        )

    if not hold_permission(request.user, 'delete_all_comment'):
        if (not hold_permission(request.user, 'delete_comment') or comment.user.id != request.user.id):
            return Response({
                'message': 'You can only delete your comments.'
            },
                status=status.HTTP_403_FORBIDDEN
            )

    # If a comment has children, keep comment but label
    # it as deleted in order to retain children.
    if comment.children:
        comment.message = 'Deleted'
        comment.is_deleted = True
        comment.save()

        serialized_comment = serializer.single(comment)

        send_project_wide(
            request.user.account.active_project,
            {
                'type': 'COMMENT-DELETE',
                'comment': serialized_comment,
            }
        )

        return Response(
            data=serialized_comment,
            status=status.HTTP_202_ACCEPTED
        )

    # Fully delete comments that do not have children.
    else:
        serialized_comment = serializer.single(comment)

        send_project_wide(
            request.user.account.active_project,
            {
                'type': 'COMMENT-DELETE',
                'comment': serialized_comment,
            }
        )

        comment.delete()

        return Response({
            'message': 'comment deleted.'
        },
            status=status.HTTP_202_ACCEPTED
        )
