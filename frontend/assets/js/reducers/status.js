const initialState = {
    open: false,
    className: '',
    message: ''
};


export default function status(state=initialState, { type, className, message }) {
    switch (type) {
        case 'SHOW_STATUS':
            return {
                open: true,
                className,
                message
            };

        case 'HIDE_STATUS':
            return {
                open: false,
                className: '',
                message: ''
            };

        default:
            return state;
    }
}
