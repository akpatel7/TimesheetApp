const React = require('react');

import getCookie from './cookie';


const DjangoCSRFToken = () => React.DOM.input(
    {
        type: 'hidden',
        name: 'csrfmiddlewaretoken',
        value: getCookie('csrftoken')
    }
);


export default DjangoCSRFToken;
