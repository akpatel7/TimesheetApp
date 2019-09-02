import React from 'react';
import { connect } from 'react-redux';

import { showStatus } from 'actions/status';
import { login, passwordResetRequest } from 'actions/account';

import { stringIsValidEmail } from 'utilities/validator/string';


class Login extends React.Component {
    state = {
        username: '',
        password: '',
        email: '',

        // UI
        forgotPassword: false
    };

    usernameInput = e => this.setState({ username: constrain(e.target.value) });

    passwordInput = e => this.setState({ password: e.target.value });

    emailInput = e => this.setState({ email: e.target.value });

    toggleForgotPassword = () => this.setState({
        forgotPassword: !this.state.forgotPassword
    });

    formValid = () => {
        const { username, password, forgotPassword, email } = this.state;

        return (
            forgotPassword && stringIsValidEmail(email)
            ||
            username.length > 2 && password.length > 4
        );
    };

    detectEnter = e => {
        if (e.keyCode === 13 || e.charCode === 13) this.submit();
    };

    submit = () => {
        const { username, password, forgotPassword, email } = this.state;

        if (this.formValid()) {
            if (forgotPassword) {
                this.props.passwordResetRequest(email);

                // Reset form.
                return this.setState({ email: '', forgotPassword: false });
            }
            this.props.login(username, password);
        }
    };

    render = () => {
        const { emailInput, formValid, toggleForgotPassword, submit } = this;
        const { email, forgotPassword, password, username } = this.state;

        let submitClass = 'action submit';
        if (email.length || username.length) submitClass += ' active';
        else submitClass += ' inactive';
        if (formValid()) submitClass += ' validated';

        if (forgotPassword) return (
            <ForgotPassword { ...{
                email, emailInput, submit, submitClass, toggleForgotPassword
            }} />
        );

        return (
            <div className='form'>
                <div className='input-container'>
                    <div className='inline-input'>
                        <label htmlFor='username'>username:</label>
                        <input name='username' id='username' type='text' autoFocus
                               onChange={ this.usernameInput }
                               value={ username }
                               onKeyPress={ this.detectEnter }/>
                    </div>

                    <div className='inline-input'>
                        <label htmlFor='password'>password:</label>
                        <input name='password' id='password' type='password'
                               onChange={ this.passwordInput }
                               value={ password }
                               onKeyPress={ this.detectEnter }/>
                    </div>

                    <button className={ submitClass } onClick={ submit }>
                        Login
                        <i className='fa fa-chevron-right'></i>
                    </button>
                </div>
            </div>
        );
    };
}


const ForgotPassword = ({
    email, emailInput, submit, submitClass, toggleForgotPassword
}) => (

    <div className='form__intro'>
        <h3 className='prompt'>Password reset</h3>

        <div className='forgot-password'>
            <div className='inlineInput'>
                <label>email:</label>
                <input
                    type='email'
                    value={ email }
                    onChange={ emailInput }
                />
            </div>
        </div>

        <button className={ submitClass } onClick={ submit }>
            send
            <i className='fa fa-chevron-right'/>
        </button>

        <div className='forgot-password__toggle'>
            <button onClick={ toggleForgotPassword }>
                <i className='fa fa-times'/>
                cancel
            </button>
        </div>
    </div>
);


/* ---- Helpers ---- */


// Limit the type of chars a user can input.
const constrain = string => string.replace(/(\W+)/g, '');


export default connect(undefined, { showStatus, login, passwordResetRequest })(Login);
