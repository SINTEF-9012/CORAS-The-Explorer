import ActionTypes from './ActionTypes';

export const ElementRightClicked = (element) => ({
    type: ActionTypes.EDITOR.ELEMENT_RIGHT_CLICKED,
    payload: { element }
});

export const ElementDoubleClicked = (element, event) => ({
    type: ActionTypes.EDITOR.ELEMENT_DOUBLE_CLICKED,
    payload: {
        element,
        event
    }
});

export const ElementEditorCancel = () => ({
    type: ActionTypes.EDITOR.ELEMENT_CANCEL
});

export const ElementEditorSave = () => ({
    type: ActionTypes.EDITOR.ELEMENT_SAVE
});

export const ElementEditorDelete = () => ({
    type: ActionTypes.EDITOR.ELEMENT_DELETE
});

export const ElementLabelEdit = (label) => ({
    type: ActionTypes.EDITOR.ELEMENT_LABEL_EDIT,
    payload: { label }
});

export const ElementChangeX = (x) => ({
    type: ActionTypes.EDITOR.ELEMENT_CHANGE_X,
    payload: { x }
});

export const ElementChangeY = (y) => ({
    type: ActionTypes.EDITOR.ELEMENT_CHANGE_Y,
    payload: { y }
});
