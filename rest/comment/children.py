from rest_framework import status
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from database.models import Comment
from element.log import Log
import serializer


log = Log('rest')


class Children(APIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def get(self, request, pk):
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
            'comments': serializer.list(comment.children)
        },
            status=status.HTTP_200_OK
        )
