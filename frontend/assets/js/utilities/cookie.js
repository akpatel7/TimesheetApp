const $ = require('jquery');


export const getCookie = name => {
    let cookieValue = null;

    if (document.cookie && document.cookie !== '') {
        let cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            let cookie = $.trim(cookies[i]);

            // Finds given cookie name from selection.
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(
                cookie.substring(name.length + 1)
                );
                break;
            }
        }
    }

    return cookieValue;
};


export const deleteCookie = name => document.cookie = `${ name } =; expires=Thu, 01, Jan 1970 00:00:01 GMT;`;


export const getToken = () => getCookie('token') || null;


export const deleteToken = () => deleteCookie('token');


// Give access to the console for debuging purposes.
window.getCookie = getCookie;
window.deleteCookie = deleteCookie;
