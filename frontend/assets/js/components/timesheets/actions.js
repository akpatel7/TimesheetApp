/* ---- Local ---- */
export const loadTimesheet = timesheet => ({
    type: 'TIMESHEETS-LOAD_SINGLE',
    timesheet
});


export const loadTimesheets = timesheets => ({
    type: 'TIMESHEETS-LOAD_LIST',
    timesheets
});

export const selectTimesheet = timesheet => ({
    type: 'TIMESHEETS-SELECT_TIMESHEET',
    timesheet
});

export const setDate = date => ({
    type: 'TIMESHEETS-SET_DATE',
    date
});

export const toggleNewTimesheet = () => ({
    type: 'TIMESHEETS-TOGGLE_NEW'
});

export const toggleTimesheetsList = () => ({
    type: 'TIMESHEETS-TOGGLE_LIST'
});


/* ---- Sagas ---- */
export const getTimesheets = () => ({
    type: 'TIMESHEETS-GET'
});


export const submitTimesheet = timesheet => ({
    type: 'TIMESHEETS-SUBMIT',
    timesheet
});

export const deleteTimesheet = timesheet => ({
    type: 'TIMESHEETS-DELETE',
    timesheet
});
