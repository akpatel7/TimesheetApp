import { base64Encode, getBase64ImagePrefix } from 'utilities/helpers';
import { getImage } from 'api/helpers';

export const getImageAsBase64 = (imageURI, callback) => {
    if (!imageURI) callback('');

    getImage(imageURI)
    .then(({ res, err }) => {
        if (res) {
            callback(getBase64ImagePrefix(imageURI) + base64Encode(res));
        } else {
            console.warn(err);
        }
    });
};
