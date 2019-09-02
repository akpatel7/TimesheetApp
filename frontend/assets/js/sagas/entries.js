import { takeLatest } from 'redux-saga';
import { put, call } from 'redux-saga/effects';

// Actions
import * as timesheetsActions from 'comps/timesheets/actions';
import * as statusActions from 'actions/status';

// API
import * as entriesApi from 'api/entries';



/* ---- Watchers ---- */
export function* watch() {
    yield takeLatest('ENTRIES-SUBMIT', submit);
    yield takeLatest('ENTRIES-PATCH', patch);
    yield takeLatest('ENTRIES-DELETE', remove);
}


function* submit(action) {
    const { res, err } = yield call(entriesApi.submitEntry, action.entry);

    if (res) {
        yield put(timesheetsActions.loadTimesheet(res.timesheet));

    } else {
        yield put(statusActions.showStatus(err, 'error'));
    }
}


function* patch(action) {
    const { res, err } = yield call(entriesApi.patchEntry, action.entry);

    if (res) {
        yield put(timesheetsActions.loadTimesheet(res.timesheet));

    } else {
        yield put(statusActions.showStatus(err, 'error'));
    }
}



function* remove(action) {
    const { res, err } = yield call(entriesApi.deleteEntry, action.timesheet);

    if (res) {
        yield put(statusActions.showStatus(res.message, 'success'));

        yield put(timesheetsActions.loadTimesheets(res.timesheets));

    } else {
        yield put(statusActions.showStatus(err, 'error'));
    }
}
