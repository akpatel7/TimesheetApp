import Promise from 'promise';
import { TYPES } from 'actions/account';

const WS_ROOT = `ws://${ window.location.host }/ws`;


const SOCKET_STATES = {
    CONNECTING: 0,
    OPEN: 1,
    CLOSING: 2,
    CLOSED: 3
};

function _getWebsocket(dispatch, onClose = () => {}) {
    return new Promise((resolve, reject) => {
        let websocket = new WebSocket(WS_ROOT);

        websocket.onopen = () => {
            console.log('WS connected.');
            resolve(websocket);
        };

        websocket.onerror = error => {
            console.warn('WS error:', error);
            reject(error);
        };

        websocket.onmessage = e => {
            const wsDispatch = JSON.parse(e.data);

            if (!wsDispatch.type) {
                console.warn('WS dispatch did not contain a type property.', wsDispatch);
                return;
            }

            dispatch(wsDispatch);
        };

        websocket.onclose = () => {
            console.warn('Lost WS connection.');
            onClose(Date.now());
        };
    });
}

const wsMiddleware = ({ dispatch, getState }) => {
    let websocket;
    let websocketPromise;

    const msTillReconnect = 5000;
    let timeoutHandler;

    //If the account is logged in, then we attempt to reconnect the websocket when it's closed.
    //we make this attempt 5 seconds (msTillReconnecti ms) after it's closed
    //If the reconnect fails, it'll call onClose, which is reconnectWebsocket and make another attempt 5 seconds later.
    const reconnectWebsocket = () => {
        if (getState().account.loggedIn)
            timeoutHandler = setTimeout(getWebsocket, msTillReconnect);
    };

    //returns a promise that resolves to a websocket. We assign the ws to a variable we use.
    const getWebsocket = () => _getWebsocket(dispatch, reconnectWebsocket).then(ws => websocket = ws);

    return next => {
        /* ---- Middleware ----- */
        // Middlewares processes everything but only some things are meant for websockets.
        // Whether an action is intended for websockets or not is
        // indicated within the action inside of "meta.websocket".
        return action => {
            if (action.type === TYPES.LOCAL.LOAD_LOGGED_IN) {    //when we login, we connect the websocket.
                websocketPromise = getWebsocket();
            }
            if (action.meta && action.meta.websocket && getState().account.loggedIn) {
                //If the websocket is still closed, immediately reconnect
                if (websocket && websocket.readyState === SOCKET_STATES.CLOSED) {
                    clearTimeout(timeoutHandler);
                    websocketPromise = getWebsocket();
                }

                //we wait for the websocket to be open, then we send a message over it.
                websocketPromise.then(websocket => {
                    // Remove action metadata before sending.
                    websocket.send(JSON.stringify({ ...action, meta: undefined }));
                });
            }

            // Disconnect on logout.
            if (action.type === TYPES.SAGAS.LOGOUT) websocket.close();

            next(action);
        };
    };
};


export default wsMiddleware;
