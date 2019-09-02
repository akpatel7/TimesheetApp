const resettableReducer = (reducer, initialState, actionType = 'CLEAR_STORE') =>
    (state = initialState, action) => {
        if (action.type === actionType) state = initialState;
        return reducer(state, action);
    };

export default resettableReducer;
