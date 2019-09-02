import React from 'react';


const EditPhoto = ({ state, methods }) => {
    // Encodes selected file to base64 thereby
    // making it passable just like any other string.
    const processFile = e => {
        const reader = new FileReader();
        const file = e.target.files[0];

        reader.onload = upload => methods.selectFile({
            fileName: file.name,
            fileType: file.type,
            photo: upload.target.result
        });

        // If the user selected a photo,
        // process to base64.
        if (file) reader.readAsDataURL(file);
    };

    // Provide feeback if a file is selected.
    let label = 'select photo';
    let icon = <i className='fa fa-upload'/>;
    let className = 'label__profileFileInput';

    if (state.fileSelected) {
        label = state.fileName;
        icon = <i className='fa fa-check'/>;
        className += '--success';
    }

    return (
        <div className='fileUpload__profile'>
            <label
                className={ className }
                htmlFor='upload_profile_photo'
            >
                { icon }
                <span>{ label }</span>
            </label>

           <input
                className='fileInput__profile'
                id='upload_profile_photo'
                onChange={ processFile }
                type='file'
                accept='image/*'
            />
        </div>
    );
};


export default EditPhoto;
