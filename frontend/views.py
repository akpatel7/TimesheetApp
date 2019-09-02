from setup import DEBUG

from django.contrib.auth import logout
from django.http import HttpResponseRedirect
from django.shortcuts import render, render_to_response

from rest_framework.renderers import JSONRenderer

from rest.account.serializer import single


def render_homepage(request):
    if request.user.is_authenticated():
        account = JSONRenderer().render(
            single(request.user.account)
        )
    else:
        account = None

    context = {
        'account': account,
        'webpack': DEBUG
    }

    return render(request, 'frontend/root.html', context)


def render_404(request):
    if request.user.is_authenticated():
        account = JSONRenderer().render(
            single(request.user.account)
        )
    else:
        account = None

    context = {
        'account': account,
        'webpack': DEBUG
    }

    response = render_to_response('frontend/root.html', context)
    response.status_code = 404
    return response


def logout_user(request):
    logout(request)
    return HttpResponseRedirect('/')
