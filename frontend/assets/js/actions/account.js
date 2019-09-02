export const TYPES = {
    SAGAS: {
        GET_MY_ACCOUNT: 'ACCOUNT.SAGAS.GET_MY_ACCOUNT',
        LOGIN: 'ACCOUNT.SAGAS.LOGIN',
        LOGOUT: 'ACCOUNT.SAGAS.LOGOUT',
        PASSWORD_RESET: 'ACCOUNT.SAGAS.PASSWORD_RESET',
        REGISTER: 'ACCOUNT.SAGAS.REGISTER'
    },
    LOCAL: {
        LOAD_LOGGED_IN: 'ACCOUNT.LOCAL.LOAD_LOGGED_IN'
    }
};

export const loadLoggedIn = account => ({
    type: TYPES.LOCAL.LOAD_LOGGED_IN,
    account
});


/* ---- SAGA's action creators ---- */
export const getMyAccount = () => ({
    type: TYPES.SAGAS.GET_MY_ACCOUNT
});

export const logout = () => ({
    type: TYPES.SAGAS.LOGOUT
});

export const login = (username, password) => ({
    type: TYPES.SAGAS.LOGIN,
    username,
    password
});

export const register = account => ({
    type: TYPES.SAGAS.REGISTER,
    account
});

export const passwordResetRequest = email => ({
    type: TYPES.SAGAS.PASSWORD_RESET,
    email
});
