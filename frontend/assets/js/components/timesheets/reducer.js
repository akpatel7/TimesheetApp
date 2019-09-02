const initialState = {
    entities: {},
    selected: {},

    // Timesheets list open?
    listOpen: false,

    date: '',
    new: false
};


export default { name: 'timesheets', reducer: (S=initialState, A) => {
    switch (A.type) {
        case 'TIMESHEETS-LOAD_LIST':
            const timesheets = {};
            A.timesheets.forEach(timesheet => timesheets[timesheet.id] = timesheet);

            return {
                ...S,
                entities: { ...timesheets }
            };

        case 'TIMESHEETS-LOAD_SINGLE':
            S.entities[A.timesheet.id] = A.timesheet;

            return {
                ...S,
                entities: { ...S.entities }
            };

        case 'TIMESHEETS-SELECT_TIMESHEET':
            return {
                ...S,
                selected: { ...A.timesheet }
            };

        case 'TIMESHEETS-TOGGLE_NEW':
            return {
                ...S,
                new: !S.new,
                listOpen: false
            };

        case 'TIMESHEETS-TOGGLE_LIST':
            return {
                ...S,
                listOpen: !S.listOpen,
                new: false
            };


        /* ---- New timesheets ---- */
        case 'TIMESHEETS-SET_DATE':
            return {
                ...S,
                date: A.date
            };

        case 'TIMESHEETS-SUBMIT':
            return {
                ...S,
                date: '',
                new: false
            };

        default:
            return S;
    }
} };
