const initialState = {
    page: ''
};


export default { name: 'intro', reducer: (S=initialState, A) => {
    switch (A.type) {
        case 'INTRO-SET_PAGE':
            return {
                ...S,
                page: A.page
            };

        default:
            return S;
    }
} };
