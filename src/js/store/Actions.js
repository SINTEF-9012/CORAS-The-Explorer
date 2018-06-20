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
