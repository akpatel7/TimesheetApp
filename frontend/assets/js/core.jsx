import React from 'react';
import { Provider } from 'react-redux';

import Container from 'comps/container';

import { loadLoggedIn } from 'actions/account';

import configureStore from './store/configure_store';
import account from 'account-session';

export const store = configureStore();


if (account) {
    store.dispatch(loadLoggedIn(account));
}

export default () => (
    <Provider store={ store }>
        <Container />
    </Provider>
);
