import { combineReducers } from 'redux';

// Helper function for returning an array of matching modules.
const requireAll = requireContext => requireContext.keys().map(requireContext);

// Gets the reducer modules within in the components folders.
export default () => {
    const compReducers = {};

    requireAll(require.context('comps', true, /^\.\/.*.reducer.js$/)).forEach(reducerFile => {
        if (!reducerFile.default.name || !reducerFile.default.reducer)
            console.warn('Component reducer default exports must follow the format: { name: reducerName, reducer: reducerFunc }');
        else compReducers[reducerFile.default.name] = reducerFile.default.reducer;
    });

    return combineReducers({ ...compReducers });
};
