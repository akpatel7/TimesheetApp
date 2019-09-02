import { takeEvery, delay } from 'redux-saga';
import { put } from 'redux-saga/effects';

import { hideStatus } from '../actions/status';


export const STATUS_DISPLAY_TIME = 2000;


export function* showStatus() {
    yield delay(STATUS_DISPLAY_TIME);
    yield put(hideStatus());
}

export function* watchShowStatus() {
    yield takeEvery('SHOW_STATUS', showStatus);
}
