def list(timesheets, **kwargs):
    return [
        single(timesheet, **kwargs)
        for timesheet in timesheets
    ]


def single(timesheet, **kwargs):
    data = {
        'id': timesheet.id,
        'date': timesheet.date,
        'entries': [
            {
                'id': entry.id,
                'task': entry.task,
                'duration': entry.duration
            }
            for entry in timesheet.entries.all()
        ]
    }

    return data
