const initialState = {
    newEntry: false,
    duration: 0,
    task: ''
};


export default { name: 'entries', reducer: (S=initialState, A) => {
    switch (A.type) {
        /* ---- New Entry ---- */
        case 'ENTRIES-SET_DURATION':
            return {
                ...S,
                duration: A.duration
            };

        case 'ENTRIES-SET_TASK':
            return {
                ...S,
                task: A.task
            };

        case 'ENTRIES-NEW_ENTRY_TOGGLE':
            return {
                ...S,
                newEntry: !S.newEntry
            };

        case 'ENTRIES-SUBMIT':
            return initialState;

        case 'TIMESHEETS-DELETE':
            return {
                newEntry: false
            };


        default:
            return S;
    }
} };
