export default ({ dispatch }) => next => action => {
    if (action.meta && action.meta.showLoader) dispatch({
        type: 'LOADER-SHOW'
    });

    if (action.meta && action.meta.hideLoader) dispatch({
        type: 'LOADER-HIDE'
    });

    next(action);
};
