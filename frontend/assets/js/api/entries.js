import { patch, post, ajaxDelete } from './index';


export const submitEntry = entry => post(
    '/api/entries/',
    { body: JSON.stringify(entry) }
);


export const patchEntry = entry => patch(
    '/api/entries/',
    { body: JSON.stringify(entry) }
);


export const deleteEntry = entry => ajaxDelete(
    '/api/entries/',
    { body: JSON.stringify(entry) }
);
