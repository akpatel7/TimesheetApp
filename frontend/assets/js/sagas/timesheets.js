import { takeLatest } from 'redux-saga';
import { put, call } from 'redux-saga/effects';

// Actions
import * as timesheetsActions from 'comps/timesheets/actions';
import * as statusActions from 'actions/status';

// API
import * as timesheetsApi from 'api/timesheets';



/* ---- Watchers ---- */
export function* watch() {
    yield takeLatest('TIMESHEETS-GET', get);
    yield takeLatest('TIMESHEETS-SUBMIT', submit);
    yield takeLatest('TIMESHEETS-DELETE', remove);
}


function* get() {
    const { res, err } = yield call(timesheetsApi.getTimesheets);

    if (res) {
        yield put(timesheetsActions.loadTimesheets(res.timesheets));
    } else {
        yield put(statusActions.showStatus(err, 'error'));
    }
}

function* submit(action) {
    const { res, err } = yield call(timesheetsApi.submitTimesheet, action.timesheet);

    if (res) {
        yield put(timesheetsActions.loadTimesheet(res.timesheet));
    } else {
        yield put(statusActions.showStatus(err, 'error'));
    }
}


function* remove(action) {
    const { res, err } = yield call(timesheetsApi.deleteTimesheet, action.timesheet);

    if (res) {
        yield put(statusActions.showStatus(res.message, 'success'));

        yield put(timesheetsActions.loadTimesheets(res.timesheets));
    } else {
        yield put(statusActions.showStatus(err, 'error'));
    }
}
