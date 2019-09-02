import React from 'react';
import { connect } from 'react-redux';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import * as accountApi from 'api/account';
import { openModal } from 'actions/modal';
import { showStatus } from 'actions/status';


class ChangePassword extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            password: '',
            passwordAgain: '',
            passwordMatch: false,
            passwordSaved: false
        };
    }

    _passwordValidate = (p1, p2) => {
        if (p1 === p2 && p1.length > 4) {
            return true;
        }
        return false;
    }

    _passwordInput = event => {
        const password = event.target.value;

        this.setState({
            password,
            passwordMatch: this._passwordValidate(password, this.state.passwordAgain),
            passwordSaved: null
        });
    }

    _passwordAgainInput = event => {
        const passwordAgain = event.target.value;

        this.setState({
            passwordAgain,
            passwordMatch: this._passwordValidate(this.state.password, passwordAgain),
            passwordSaved: null
        });
    }

    _savePassword = event => {
        event.preventDefault();

        accountApi.changePassword({
            password: this.state.password,
            password_again: this.state.password
        })
        .then(({ res, err }) => {
            if (res) {
                this.props.showStatus(res, 'success');
                this.setState({
                    passwordSaved: true,
                    passwordMatch: false
                });
            }
            this.props.showStatus(err, 'error');
        });
    }

    render = () => {
        const {
            password,
            passwordAgain,
            passwordMatch,
            passwordSaved
        } = this.state;

        return (
            <div>
                <h2>Change Password</h2>
                <form id='change_password'>
                    <div className='inlineInput'>
                        <label htmlFor='password'>Password:</label>
                        <input
                            name='password'
                            id='password'
                            onChange={ this._passwordInput }
                            type='password'/>
                    </div>

                    <div className='inlineInput'>
                        <label htmlFor='password_again'>Retype password:</label>
                        <input
                            name='password_again'
                            id='password_again'
                            onChange={ this._passwordAgainInput }
                            type='password'/>
                    </div>

                    <ReactCSSTransitionGroup
                        transitionName='fade'
                        transitionEnterTimeout={300}
                        transitionLeaveTimeout={1}>
                        {
                            passwordMatch ?
                                <button
                                    className='btn-link'
                                    onClick={ this._savePassword }
                                >
                                    <i className='fa fa-floppy-o'></i>
                                    Save
                                </button>

                            : password.length && passwordAgain.length && (
                                <p className='modal__hint_warning'>
                                    The passwords must match and have
                                    at least 5 characters.
                                </p>
                            )
                        }
                        { passwordSaved &&
                            <button className='saved'>
                                <i className="fa fa-check"></i>
                                Saved
                            </button>
                        }
                    </ReactCSSTransitionGroup>
                </form>

                <div className='modal__footer-nav'>
                    <button
                        className='btn-link'
                        onClick={ () => this.props.openModal('profileUpdate') }>
                        <i className='fa fa-arrow-left'></i>
                        Back to profile
                    </button>
                </div>
            </div>
        );
    }
}

export default connect(
    undefined,
    {
        openModal,
        showStatus
    }
)(ChangePassword);
