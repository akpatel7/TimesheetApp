import Resumablejs from 'resumablejs';
import getCookie from 'utilities/cookie';


const createUploader = ({
    inputId,
    url,
    queryArgs,
    onUpdate = () => {},
    onComplete = () => {}
}) => {
    /*
        Initializes a resumable uploader and enables
        it to update state on any changes.
    */

    const uploader = new Resumablejs({
        target: url,
        query: {
            csrfmiddlewaretoken: getCookie('csrftoken'),
            ...queryArgs // Additional arguments to pass along with each request.
        }
    });

    // Uploader changes will not be reflect in a component, unless...
    const onUpdateCallback = () => onUpdate(uploader);

    // Public method for calling from components.
    uploader.onUpdate = () => onUpdateCallback();

    // Init uploader flags.
    uploader.isComplete = false;

    uploader.assignBrowse(document.getElementById(inputId));

    uploader.on('fileAdded', () => onUpdateCallback());
    uploader.on('fileSuccess', () => onUpdateCallback());
    uploader.on('progress', () => onUpdateCallback());
    uploader.on('fileError', (file, res) => {
        console.warn('Server responded with an error:', file, res);
    });

    // Set uploader flag to mark as complete.
    uploader.on('complete', () => {
        uploader.isComplete = true;
        onComplete();
        onUpdateCallback();
    });

    // Reset uploader.
    uploader.clearAll = () => {
        uploader.cancel();
        uploader.isComplete = false;
        onUpdateCallback();
    };

    return uploader;
};


export default createUploader;
