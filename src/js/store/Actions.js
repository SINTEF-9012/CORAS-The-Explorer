import ActionTypes from './ActionTypes';

export const ElementRightClicked = (element) => ({
    type: ActionTypes.EDITOR.ELEMENT_RIGHT_CLICKED,
    payload: { element }
})
