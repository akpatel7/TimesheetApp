import React from 'react';
import { connect } from 'react-redux';

import Intro from './intro/';
import Status from './status/';
import Timesheets from './timesheets/';

const S = state => state;
const A = {};

import './styles';

export default connect(S, A)($ => {

    return <div id='timesheets'>
        <Status />

        { $.account.loggedIn
            ? <Timesheets />
            : <Intro />
        }


        { $.account.loggedIn && <a className='logout' href='/logout/'>
            { $.account.username } | LOGOUT <i className='fa fa-sign-out'/>
        </a> }
    </div>;
});
