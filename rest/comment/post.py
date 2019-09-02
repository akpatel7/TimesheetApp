from rest_framework import status
from rest_framework.response import Response

from database.models import Asset, Comment
from element.group_message import send_project_wide
from element.log import Log
import serializer


log = Log('rest')


def post(request):
    error_message = validate_comment(request.data)

    if error_message:
        log.error('Validation error:', error_message)
        return Response({
            'message': error_message
        },
            status=status.HTTP_406_NOT_ACCEPTABLE,
        )

    # Comment was validated succesfully.
    # Create comment object.
    comment = Comment.objects.create(
        account=request.user.account,
        project=request.user.account.active_project,
        message=request.data['message']
    )

    # A comment with a parent id signafies that it is
    # a reply. This is an optional argument.
    parent_id = request.data.get('parentId', None)
    if parent_id:
        comment.parent_id = parent_id
        comment.save()

    # Assigns content object as a subject.
    comment = assign_subject(request, comment)

    send_project_wide(
        request.user.account.active_project,
        {
            'type': 'COMMENT-LOAD',
            'comment': serializer.single(comment)
        }
    )

    return Response({
        'comment': serializer.single(comment)
    },
        status=status.HTTP_201_CREATED,
    )


def validate_comment(comment):
    '''
    Returns an error message if validation failed,
    else returns null
    '''

    error_message = None
    try:
        comment['message']
    except KeyError:
        log.exception()
        error_message = 'Received blank message field.'

    try:
        comment['contentType']
    except KeyError:
        log.exception()
        error_message = 'No content type received.'

    try:
        comment['contentId']
    except KeyError:
        log.exception()
        error_message = 'No content id received.'

    if not error_message:
        return
    else:
        return error_message


def assign_subject(request, comment):
    '''
    Adds a subject type to a comment.
    '''

    try:
        if request.data['contentType'] == 'asset':
            asset = Asset.objects.get(
                id=request.data['contentId'],
                project=request.user.account.active_project
            )
            comment.asset = asset

        comment.save()

        return comment

    # Wrong id or content type was sent.
    except (Asset.DoesNotExist):
        log.error('Content type/id combination does not exist.')
        log.exception()
        return comment
