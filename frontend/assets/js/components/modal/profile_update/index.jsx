import React from 'react';
import { connect } from 'react-redux';

import { updateAccount } from 'actions/accounts';
import { openModal } from 'actions/modal';

import { stringConsistsOf } from 'utilities/validator/string';

import EditPhoto from './edit_photo';


class ProfileUpdate extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            firstName: this.props.firstName,
            lastName: this.props.lastName,
            email: this.props.email,

            // File upload
            fileSelected: false,        // Is there a profile photo selected?
            fileName: '',               // What is the file name of the photo selected.
            photo: null,                // Will contain a base64 encocded blob of the photo.

            // Form status
            formChanged: false,         // Has the form changed? (shows/hides save button).
            formSaved: false            // Has the form been saved? (shows success indicator).
        };
    }

    // Replace user profile photo preview back to user's current setting.
    componentWillUnmount = () => this.props.updateAccount({
        photo: this.props.account.photo
    });

    methods = {
        firstNameInput: event => this.setState({
            firstName:
                stringConsistsOf(event.target.value, ['letters', 'spaces'])
                ? event.target.value
                : this.state.firstName,
            formChanged: true
        }),

        lastNameInput: event => this.setState({
            lastName:
                stringConsistsOf(event.target.value, ['letters', 'spaces'])
                ? event.target.value
                : this.state.lastName,
            formChanged: true
        }),

        emailInput: event => this.setState({
            email: event.target.value,
            formChanged: true
        }),

        // Handler for selecting profile picture.
        selectFile: fileInfo => {
            this.setState({
                ...fileInfo,
                fileSelected: true,
                formChanged: true
            });

            // Show a preview of the photo.
            // TODO: is this still necessary? We should probably use local state for this...
            //this.props.updateAccount({ photo: fileInfo.photo });
        },

        saveProfile: () => {
            // Send PATCH request.
            this.props.updateAccount({
                id: this.props.id,
                firstName: this.state.firstName.trim(),
                lastName: this.state.lastName.trim(),
                email: this.state.email.trim(),
                photo: this.state.photo
            });

            this.setState({
                // Indicate that the form has been saved.
                formSaved: true,

                // Set form changed flag to false in case the user
                // wants to make subsequent changes and the save
                // button should be shown again.
                formChanged: false
            });
        }
    }

    render = () => (
        <div className='form__profile'>
            <h2>Profile update</h2>
            <div id='profile_details'>
                <FirstName
                    state={ this.state }
                    methods={ this.methods }
                />

                <LastName
                    state={ this.state }
                    methods={ this.methods }
                />

                <Email
                    state={ this.state }
                    methods={ this.methods }
                />

                <EditPhoto
                    state={ this.state }
                    methods={ this.methods }
                />

                <Save
                    state={ this.state }
                    methods={ this.methods }
                />

                <div className='modal__footer-nav'>
                    <button
                        className='btn-link'
                        onClick={ () => this.props.openModal('changePassword') }>
                        <i className='fa fa-key'></i>
                        Change password
                    </button>
                </div>
            </div>
        </div>
    );
};


const FirstName = ({ state, methods }) => (
    <div className='inlineInput__profile'>
        <label htmlFor='first_name'>First name:</label>
        <input
            name='first_name'
            id='first_name'
            type='text'
            onChange={ methods.firstNameInput }
            value={ state.firstName }
            maxLength='30'
            required
            placeholder='Add first name'/>
    </div>
);

const LastName = ({ state, methods }) => (
    <div className='inlineInput__profile'>
        <label htmlFor='last_name'>Last name:</label>
        <input
            name='last_name'
            id='last_name'
            type='text'
            onChange={ methods.lastNameInput }
            value={ state.lastName }
            maxLength='30'
            required
            placeholder='Add last name'/>
    </div>
);

const Email = ({ state, methods }) => (
    <div className='inlineInput__profile'>
        <label htmlFor='email'>Email:</label>
        <input
            name='email'
            id='email'
            type='email'
            onChange={ methods.emailInput }
            value={ state.email }
            maxLength='254'
            pattern="\w+@\w+\.\w{2,4}"
            placeholder='Add email'/>
    </div>
);


// Display save button if the form has changed.
// If the form has been saved, display a success
// indicator.
const Save = ({ state, methods }) => {
    if (state.formChanged &&
        document.getElementById('first_name').checkValidity() &&
        document.getElementById('last_name').checkValidity() &&
        document.getElementById('email').checkValidity()) {
        return (
            <button
                className='saveButton__profile btn-link'
                onClick={ methods.saveProfile }
            >
                <i className='fa fa-floppy-o'></i>
                Save
            </button>
        );
    }

    if (state.formSaved) {
        return (
            <button
                className='savedIndicator__profile btn-link'
            >
                <i className='fa fa-check'></i>
                Saved
            </button>
        );
    }
    return null;
};


const state = state => state.user;
const actions = { updateAccount, openModal };
export default connect(state, actions)(ProfileUpdate);
