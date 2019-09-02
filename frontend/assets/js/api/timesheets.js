import { get, patch, post, ajaxDelete } from './index';


export const getTimesheets = () => get('/api/timesheets/');


export const patchTimesheet = timesheet => patch(
    '/api/timesheets/',
    { body: JSON.stringify(timesheet) }
);


export const deleteTimesheet = timesheet => ajaxDelete(
    '/api/timesheets/',
    { body: JSON.stringify(timesheet) }
);


export const submitTimesheet = timesheet => post(
    '/api/timesheets/',
    { body: JSON.stringify(timesheet) }
);
