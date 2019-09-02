import fetch from 'isomorphic-fetch';
import Promise from 'es6-promise';
import { getCookie, getToken, deleteToken } from 'utilities/cookie';
import { restUrl } from 'local_config';


export const postHeaders = () => ({
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'X-CSRFTOKEN': getCookie('csrftoken'),
    'Authorization': getToken()
        ? `Token ${ getToken() }`
        : null
});


export const credentials = 'same-origin';


// User-friendly messages for error responses with no content body.
const noContentStatuses = {
    204: 'No content',
    401: 'Your session has expired. Please re-login.',
    403: 'You do not have sufficient permissions'
};


// Base fetch function.
export const callApi = (url, options = { credentials }) => {
    const corsUrl = restUrl + url;

    return fetch(corsUrl, options)
        // Token expiration check.
        .then(res => {
            if (res.status === 401) {
                console.warn('Session expired. Deleting token.');
                deleteToken();  // Delete stale token cookie.
            }
            return res;
        })
        // Check for common error codes.
        .then(res =>
            noContentStatuses[res.status]
            ? { json: { err: noContentStatuses[res.status] }, res }
            : res.json()
            .then(json => ({ json, res }))
        )
        .then(({ json, res }) =>
            !res.ok
            ? Promise.reject(json)
            : json
        )
        .then(
            res => ({ res }),
            err => ({ err: Object.values(err)[0] || 'Something went wrong' })
        );
};


const generateRequest = (url, options, method) => callApi(
    url,
    {
        method,
        credentials,
        ... method !== 'GET'
        ? { headers: postHeaders(), ...options }
        : { headers: { Authorization: `Token ${ getToken() }` } }
    }
);


export const get = (url, options) => generateRequest(url, options, 'GET');


export const post = (url, options) => generateRequest(url, options, 'POST');


export const put = (url, options) => generateRequest(url, options, 'PUT');


export const patch = (url, options) => generateRequest(url, options, 'PATCH');


export const ajaxDelete = (url, options) => generateRequest(url, options, 'DELETE');
