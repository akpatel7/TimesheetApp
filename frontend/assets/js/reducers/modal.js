const initialState = {
    type: '',           // The type of modal.
    open: false,        // Modal open/closed.
    args: {}            // Contains any additional args required for the modal.
};


export default (state=initialState, actions) => {
    const { type, modalType, open, args } = actions;

    switch (type) {
        case 'MODAL-OPEN':
            return {
                type: modalType,
                open,
                args: Object.assign(state.args, args)
            };

        case 'MODAL-CLOSE':
            return {
                type: '',
                open: false,
                args: {}
            };

        case 'MODAL-SET_ARGS':
            return {
                ...state,
                args
            };

        default:
            return state;
    }
};
