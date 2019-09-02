import account from './account';
import comps from './comps';
import modal from './modal';
import status from './status';

import { routerReducer as routing } from 'react-router-redux';


const rootReducer = {
    account,
    comps: comps(),
    modal,
    routing,
    status
};


export default rootReducer;
