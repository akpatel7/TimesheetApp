import Promise from 'es6-promise';

export const getImage = url =>
    new Promise((resolve, reject) => {
        const request = new XMLHttpRequest();

        request.onload = () => resolve({ res: request.response });
        request.onerror = () => reject({ err: 'Something went wrong' });

        request.open('GET', url);
        request.overrideMimeType('text/plain; charset=x-user-defined');
        request.send();
    }).then(
        res => res,
        err => err
    );
