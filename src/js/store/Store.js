import { createStore, combineReducers } from 'redux';
import ActionTypes from './ActionTypes';
import joint from 'jointjs';

const rootReducer = combineReducers({ editor: Editor });

function Editor(state, action) {
    if(state === undefined) return {
            viewGraph: new joint.dia.Graph(),
            link: null,
            previousElementRightClicked: null
    };

    switch(action.type) {
        case ActionTypes.EDITOR.CREATE:
        return Object.assign({}, state);

        case ActionTypes.EDITOR.DROP_NEW_MODEL:
        return Object.assign({}, state);

        case ActionTypes.EDITOR.ADD_NEW_MODEL:
        return Object.assign({}, state);

        case ActionTypes.EDITOR.ELEMENT_RIGHT_CLICKED:
        if (!state.previousElementRightClicked) return Object.assign({}, state, { previousElementRightClicked: action.payload.element });
        else {
            const link = new joint.shapes.standard.Link();
            link.source(state.previousElementRightClicked);
            link.target(action.payload.element);
            link.addTo(state.viewGraph);
            return Object.assign({}, state, { previousElementRightClicked: null });
        }
    }
}

const Store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default Store;
