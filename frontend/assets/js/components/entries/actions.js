/* ---- Local ---- */
export const setDuration = duration => ({
    type: 'ENTRIES-SET_DURATION',
    duration
});

export const setTask = task => ({
    type: 'ENTRIES-SET_TASK',
    task
});

export const newEntryToggle = () => ({
    type: 'ENTRIES-NEW_ENTRY_TOGGLE'
});



/* ---- Sagas ---- */
export const submitEntry = entry => ({
    type: 'ENTRIES-SUBMIT',
    entry
});
