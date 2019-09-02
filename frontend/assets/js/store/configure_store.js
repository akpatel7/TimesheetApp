import { applyMiddleware, createStore, compose } from 'redux';
import { combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { routerMiddleware } from 'react-router-redux';

import rootSagas from 'sagas';
import loaderMiddleware from 'utilities/loader';
import reducers from 'reducers';
import resettableReducer from './resettable_reducer';


export default function configureStore(history) {
    const sagaMiddleware = createSagaMiddleware();
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

    const store = createStore(
        resettableReducer(calcReducer),
        undefined,   // Initial state
        composeEnhancers(applyMiddleware(
            sagaMiddleware,
            loaderMiddleware,
            routerMiddleware(history)
        ))
    );
    hotModuleReplaceReducers(store);

    // Run saga watchers.
    sagaMiddleware.run(rootSagas);

    // Provide window reference to the store for debugging.
    window.store = store;

    return store;
}

// Hot Module Replace Reducers
const hotModuleReplaceReducers = store => {
    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('reducers', () => {
            const nextRootReducer = require('reducers').default;
            store.replaceReducer(nextRootReducer);
        });
    }
};

//TODO: after I moved task manager back into main source, I can get rid of this.
const calcReducer = combineReducers({
    ...reducers
});
