const initialState = {
    show: false
};


export default function loader(state=initialState, action) {
    switch (action.type) {
        case 'LOADER-SHOW':
            return {
                show: true
            };

        case 'LOADER-HIDE':
            return {
                show: false
            };

        default:
            return state;
    }
};
