import React from 'react';
import { connect } from 'react-redux';

import Register from './register';
import Login from './login';

import './styles';


const S = state => state.comps.intro;
import * as A from './actions';


export default connect(S, A)($ => {
    return <div id='intro' className='page'>
        <div className='options'>
            <button
                className={ $.page === 'register' ? 'action active' : 'action' }
                onClick={ () => $.setPage('register') }
            >
                Register
            </button>

            <button
                className={ $.page === 'login' ? 'action active' : 'action' }
                onClick={ () => $.setPage('login') }
            >
                Login
            </button>
        </div>

        { $.page === 'register' && <Register /> }
        { $.page === 'login' && <Login /> }
    </div>;
});
