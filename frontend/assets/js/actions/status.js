export const SHOW_STATUS = 'SHOW_STATUS';
export const HIDE_STATUS = 'HIDE_STATUS';


export const showStatus = (message, className) => ({
    type: SHOW_STATUS,
    message,
    className
});


export const hideStatus = () => ({
    type: HIDE_STATUS
});
