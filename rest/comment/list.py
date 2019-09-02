
from django.db.models import Q

from rest_framework import status
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from database.models import Asset, Comment
from element.log import Log
from rest.utilities import pagination

log = Log('rest')

import serializer


class List(APIView):
    authentication_classes = (TokenAuthentication, )
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        # initialize Q object.
        query = Q()

        # Check for passed paramaters:
        try:
            asset_pk = self.request.query_params.get('asset', None)
            asset = Asset.objects.get(id=asset_pk)
            query.add(Q(asset=asset), Q.AND)
        except Asset.DoesNotExist:
            pass

        # If there was paramters retrieved, apply the paramters via filter.
        if query:
            comments = Comment.objects.filter(
                asset__in=Asset.objects.filter(
                    project=self.request.user.account.active_project
                )
            ).filter(query).order_by('-date')

            # Return paginated resultes.
            return pagination(comments, self.request)

        # Otherwise, default to providing latest comments.
        else:
            return Comment.objects.all().order_by('-date')[:6]

    def get(self, request):
        queryset = self.get_queryset()

        return Response({
            'comments': serializer.list(queryset)
        },
            status=status.HTTP_200_OK,
        )
