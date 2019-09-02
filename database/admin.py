from django.apps import apps
from django.contrib import admin
from djangoql.admin import DjangoQLSearchMixin
from django.contrib import auth

from database import models


app = apps.get_app_config('database')


# @admin.register(models.Account)
# class AccountAdmin(DjangoQLSearchMixin, admin.ModelAdmin):
    # pass

for model_name, model in app.models.items():
    admin.site.register(model)
