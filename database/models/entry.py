from django.db import models


class Entry(models.Model):
    timesheet = models.ForeignKey('Timesheet', related_name='entries')

    duration = models.FloatField(default=0)

    task = models.TextField()

    def __unicode__(self):
        return '{}.{}'.format(
            self.hours,
            self.minutes
        )
