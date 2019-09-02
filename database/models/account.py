from django.contrib.auth.models import User
from django.contrib.postgres.fields import JSONField
from django.db import models


# Determines the location of where to place
# the users photo.
def profile_photo_path(instance, filename):
    return 'images/{}/{}/profile_photo'.format(
        instance.active_project.name,
        instance.user.username,
    )


class Account(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)

    photo = models.ImageField(
        upload_to=profile_photo_path,
        blank=True,
        null=True,
        default=None
    )

    @property
    def username(self):
        return self.user.username

    @property
    def first_name(self):
        return self.user.first_name

    @property
    def last_name(self):
        return self.user.last_name

    @property
    def email(self):
        return self.user.email

    @property
    def is_active(self):
        return self.user.is_active

    @property
    def last_login(self):
        return self.user.last_login

    @property
    def date_joined(self):
        return self.user.date_joined

    @property
    def groups(self):
        return self.user.groups

    def __unicode__(self):
        return '{} --> {}'.format(
            self.user.username,
            self.active_project
        )
