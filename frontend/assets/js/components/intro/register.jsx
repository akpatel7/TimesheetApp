import React from 'react';
import serialize from 'form-serialize';
import { connect } from 'react-redux';

import { register } from 'actions/account';
import { showStatus } from 'actions/status';


class Register extends React.Component {
    state = {
        username: '',
        password: '',
        passwordAgain: ''
    };

    emailInput = e => this.setState({ email: e.target.value });

    passwordInput = e => this.setState({ password: e.target.value });

    passwordAgainInput = e => this.setState({ passwordAgain: e.target.value });

    usernameInput = e => this.setState({ username: constrain(e.target.value) });

    validate = () => {
        const {
            username,
            password,
            passwordAgain
        } = this.state;

        const passwordValid = (password === passwordAgain && password.length > 5);

        if (username.length > 2 && passwordValid) {
            return true;
        }
    };

    detectEnter = e => {
        if (e.keyCode === 13) this.register(e);
        if (e.charCode === 13) this.register(e);
    };

    register = e => {
        // Prevent from screen reload.
        e.preventDefault();

        if (this.validate()) {
            const form = document.getElementById('register_form');
            this.props.register(serialize(form, { hash: true }));
        }
    };

    render = () => {
        // Submit animation classes.
        let submitClass = 'action submit';

        // Display submit button when user starts typing.
        this.state.username.length ?
            this.validate() ?
                submitClass += ' validated'
                : submitClass += ' active'
            : submitClass += ' inactive';

        return (
            <form id='register_form' className='form'>
                <div className='input-container'>
                    <div className='inline-input'>
                        <label htmlFor='username'>username:</label>
                        <input name='username' id='username' type='text' autoFocus
                               onChange={ this.usernameInput }
                               value={ this.state.username }
                               onKeyPress={ this.detectEnter }/>
                   </div>

                    <div className='inline-input'>
                        <label htmlFor='password1'>password:</label>
                        <input name='password1' id='password1' type='password'
                               onChange={ this.passwordInput }
                               value={ this.state.password }
                               onKeyPress={ this.detectEnter }/>
                    </div>

                    <div className='inline-input'>
                        <label htmlFor='password2'>pass again:</label>
                        <input name='password2' id='password2' type='password'
                               onChange={this.passwordAgainInput }
                               value={ this.state.passwordAgain }
                               onKeyPress={ this.detectEnter }/>
                    </div>

                    <button className={ submitClass } onClick={ this.register }>
                        Register
                        <i className='fa fa-chevron-right'></i>
                    </button>
                </div>
            </form>
        );
    };
}


/* ---- Helpers ---- */
// Limit the type of chars a user can input.
const constrain = string => string.replace(/(\W+)/g, '');


export default connect(undefined, { register, showStatus })(Register);
