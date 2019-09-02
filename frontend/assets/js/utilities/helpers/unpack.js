import { expandModel } from 'utilities/flatten';

/*
 * Extracts an array of items from a multi-page state.
 *
 * Requires args: state with pages and entities properties.
 */
export const itemsFromPages = (state, mapFnc = a=>a) => {
    const items = [];

    state.pages.forEach(page =>
        page.ids.forEach(id =>
            items.push(mapFnc(state.entities[id]))
        )
    );

    return items;
};

export const expandItemsFromPages = (modelName, state, deepness = 2) =>
    itemsFromPages(state[modelName], item => expandModel(modelName, item, state, deepness));
