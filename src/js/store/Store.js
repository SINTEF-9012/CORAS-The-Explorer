import { createStore, combineReducers } from 'redux';
import ActionTypes from './ActionTypes';
import joint from 'jointjs';

const rootReducer = combineReducers({ editor: Editor });

function Editor(state, action) {
    if (state === undefined) return {
        link: null,
        previousElementRightClicked: null,
        elementEditor: {
            visible: false,
            data: {
                isLink: false,
                editorPosition: {
                    left: 0,
                    top: 0
                },
                element: null,
                originalLabel: "",
                label: "",
                originalPosition: {
                    x: 0,
                    y: 0
                },
                position: {
                    x: 0,
                    y: 0
                }
            }
        },
        movement: {
            element: null
        }
    };

    const newState = Object.assign({}, state);

    switch (action.type) {
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
                link.addTo(action.payload.graph);
                return Object.assign({}, state, { previousElementRightClicked: null });
            }

        case ActionTypes.EDITOR.ELEMENT_DOUBLE_CLICKED:
            return Object.assign({}, state, {
                elementEditor: {
                    visible: true,
                    originalLabel: action.payload.element.attr('text/text'),
                    originalPosition: action.payload.element.isLink() ? { x: null, y: null } : action.payload.element.position(),
                    data: {
                        isLink: action.payload.element.isLink(),
                        editorPosition: {
                            left: action.payload.event.pageX,
                            top: action.payload.event.pageY
                        },
                        element: action.payload.element,
                        label: action.payload.element.attr('text/text'),
                        position: action.payload.element.isLink() ? { x: null, y: null } : action.payload.element.position(),
                    }
                }
            });

        case ActionTypes.EDITOR.ELEMENT_CANCEL:
            state.elementEditor.data.element.attr('text/text', state.elementEditor.originalLabel);
            if (!state.elementEditor.data.isLink) state.elementEditor.data.element.position(state.elementEditor.originalPosition.x, state.elementEditor.originalPosition.y);
            return Object.assign({}, state, { elementEditor: { visible: false } });

        case ActionTypes.EDITOR.ELEMENT_SAVE:
            return Object.assign({}, state, { elementEditor: { visible: false } });

        case ActionTypes.EDITOR.ELEMENT_DELETE:
            state.elementEditor.data.element.remove();
            return Object.assign({}, state, { elementEditor: { visible: false } });

        case ActionTypes.EDITOR.ELEMENT_LABEL_EDIT:
            newState.elementEditor.data.element.attr('text/text', action.payload.label);
            newState.elementEditor.data.label = action.payload.label;
            return newState;

        case ActionTypes.EDITOR.ELEMENT_CHANGE_X:
            newState.elementEditor.data.position.x = parseInt(action.payload.x);
            newState.elementEditor.data.element.position(parseInt(action.payload.x), state.elementEditor.data.position.y);
            return newState;

        case ActionTypes.EDITOR.ELEMENT_CHANGE_Y:
            newState.elementEditor.data.position.y = parseInt(action.payload.y);
            newState.elementEditor.data.element.position(state.elementEditor.data.position.x, parseInt(action.payload.y));
            return newState;

        case ActionTypes.EDITOR.TOOL_ELEMENT_CLICKED:
            newState.movement.element = action.payload.element;
            return newState;

        case ActionTypes.EDITOR.TOOL_ELEMENT_RELEASED:
            if (!newState.movement.element) return newState;
            newState.movement.element.position(action.payload.pageX, action.payload.pageY);
            action.payload.graph.addCell(newState.movement.element.clone());
            newState.movement.element = null;
            return newState;
    }
}

const Store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default Store;
