from django.db import models
from django.utils.timezone import now


class Timesheet(models.Model):
    account = models.ForeignKey('Account', related_name='timesheets')

    date = models.DateTimeField(default=now)

    def __unicode__(self):
        return '{} - {}'.format(
            self.account.user.username,
            self.date
        )
