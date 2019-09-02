import { takeLatest } from 'redux-saga';
import { put, call } from 'redux-saga/effects';

// Actions
import * as accountActions from 'actions/account';
import { TYPES } from 'actions/account';
import * as statusActions from 'actions/status';

// API
import * as accountApi from 'api/account';

// Utilities
import { deleteCookie } from 'utilities/cookie';


/* ---- Watchers ---- */
export function* watch() {
    yield takeLatest(TYPES.SAGAS.GET_MY_ACCOUNT, myAccount);
    yield takeLatest(TYPES.SAGAS.LOGIN, login);
    yield takeLatest(TYPES.SAGAS.LOGOUT, logout);
    yield takeLatest(TYPES.SAGAS.PASSWORD_RESET, passwordReset);
    yield takeLatest(TYPES.SAGAS.REGISTER, register);
}

function* myAccount() {
    const { res, err } = yield call(accountApi.myAccount);

    if (res) {
        const { account, token } = res;

        // Load account into state.
        yield put(accountActions.loadLoggedIn(account));

        // Store token key.
        document.cookie = `token=${ token };`;
    } else {
        yield put(statusActions.showStatus(err, 'error'));
        console.warn('Could not fetch account.', err);
    }
}


function* login(action) {
    const { username, password } = action;
    const { res, err } = yield call(accountApi.login, username, password);

    if (res) {
        const { account, token } = res;

        // Load account into state.
        yield put(accountActions.loadLoggedIn(account));

        // Store token key.
        document.cookie = `token=${ token };`;
    } else {
        yield put(statusActions.showStatus(err, 'error'));
        console.warn('Could not login:', err);
    }
}


// Login & register
function* register(action) {
    const { res, err } = yield call(accountApi.register, action.account);

    if (res) {
        const { account, token } = res;

        // Load account into state.
        yield put(accountActions.loadLoggedIn(account));

        // Store token key.
        document.cookie = `token=${ token };`;
    } else {
        yield put(statusActions.showStatus(err, 'error'));
        console.warn('Could not register:', err);
    }
}


function* logout() {
    yield call(accountApi.logout);

    // Clear reducers.
    yield put({ type: 'CLEAR_STORE' });

    // Show goodbye message.
    yield put(statusActions.showStatus('Successfully Logged Out', 'success'));

    // Delete token cookie.
    deleteCookie('token');
}


function* passwordReset({ email }) {
    const { res, err } = yield call(accountApi.passwordReset, email);

    if (res) {
        yield put(statusActions.showStatus(res.message, 'success'));
    } else {
        yield call(console.warn, 'error', err);
    }
}
