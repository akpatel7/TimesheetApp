import React from 'react';
import { connect } from 'react-redux';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import './styles';


const Status = props => {
    const message = (
        props.status.open ?
            <p id='status' className={ props.status.className } key={ 'status' }>
                { props.status.message }
            </p>
            : null
    );

    return (
        <div>
            <ReactCSSTransitionGroup
                transitionName='status'
                transitionEnterTimeout={1000}
                transitionLeaveTimeout={200}>
                { message }
            </ReactCSSTransitionGroup>
        </div>
    );
};

const state = state => {
    return {
        status: state.status
    };
};

export default connect(state)(Status);
