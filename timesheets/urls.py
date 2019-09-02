from django import views
from rest_framework.authtoken.views import obtain_auth_token
from django.conf.urls import url
from django.conf import settings
from django.contrib import admin

import frontend.views

from rest import account
from rest import timesheets
from rest import entries


# Frontend SPA endpoints
frontend_urlpatterns = [
    url(r'^$', frontend.views.render_homepage, name='home')
]

backend_urlpatterns = [
    # Django admin. Remove in prod.
    url(r'^admin/', admin.site.urls),

    url(r'^auth-token/', obtain_auth_token),


    # ---- Timesheets ---- #
    url(r'^api/timesheets/$', timesheets.Api.as_view()),


    # ---- Entries ---- #
    url(r'^api/entries/$', entries.Api.as_view()),


    # ---- Accounts ---- #
    url(r'^api/account/login/$', account.login_user),

    url(r'^api/account/register/$', account.register_user),

    url(r'^api/account/logout/$', account.logout_user),

    url(r'^api/account/password/$', account.password_change),

    url(r'^logout/$', frontend.views.logout_user),


    # ---- Media & Static ---- #
    url(r'^media\/(?P<path>.*)$', views.static.serve, {
        'document_root': settings.MEDIA_ROOT
    }),

    url(r'^static\/(?P<path>.*)$', views.static.serve, {
        'document_root': settings.STATIC_ROOT
    }),
]

urlpatterns = []

urlpatterns += frontend_urlpatterns + backend_urlpatterns + [
    url(r'.*', frontend.views.render_404, name='home')
]
