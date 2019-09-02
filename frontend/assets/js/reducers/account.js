import { TYPES } from 'actions/account';


const initialState = {
    id: 0,
    account: {},         // Contains relational info, such as project contributions.
    firstName: '',
    lastName: '',
    loggedIn: false,     // Whether a account is currently logged in.
    permissions: {},     // Account-related permissions.
    photo: '',
    username: ''
};


export default function account(state=initialState, { type, account }) {
    switch (type) {
        // Load account from Django templates into Redux.
        case TYPES.LOCAL.LOAD_LOGGED_IN:
            return {
                ...state,
                account: account.account,
                email: account.email,
                firstName: account.first_name,
                id: account.id,
                lastName: account.last_name,
                loggedIn: true,
                photo: account.photo,
                username: account.username,
            };

        case TYPES.SAGAS.LOGOUT:
            return {
                loggedIn: false
            };

        default:
            return state;
    }
}
