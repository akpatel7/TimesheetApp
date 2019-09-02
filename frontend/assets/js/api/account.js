import { get, post } from './index';

export const myAccount = () => get('/api/account/');

export const register = form => post(
    '/api/account/register/',
    { body: JSON.stringify(form) }
);

export const login = (username, password) => post(
    '/api/account/login/',
    { body: JSON.stringify({ username, password }) }
);

export const passwordReset = email => post(
    '/api/account/password_reset/',
    { body: email }
);

export const logout = () => post('/api/account/logout/');

export const changePassword = data => post(
    '/api/account/password/',
    { body: JSON.stringify(data) }
);

export const changeProfileInfo = data => post(
    '/api/account/profile/',
    { body: JSON.stringify(data) }
);
