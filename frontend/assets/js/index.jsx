import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import Core from './core';

const root = document.getElementById('root');

ReactDOM.render(
    <AppContainer>
        <Core />
    </AppContainer>,
    root
);

if (module.hot) {
    module.hot.accept('./core', () => {
        ReactDOM.render(
            <AppContainer>
                <Core />
            </AppContainer>,
            root
        );
    });
}
