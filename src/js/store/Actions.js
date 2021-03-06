import ActionTypes from './ActionTypes';

export const ElementRightClicked = (element, graph) => ({
    type: ActionTypes.EDITOR.ELEMENT_RIGHT_CLICKED,
    payload: { element, graph }
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

export const ElementChangeType = (type) => ({
    type: ActionTypes.EDITOR.ELEMENT_CHANGE_TYPE,
    payload: { type }
});

export const ToolElementClicked = (element, width, height) => ({
    type: ActionTypes.EDITOR.TOOL_ELEMENT_CLICKED,
    payload: { element, width, height }
});

export const ToolElementRelease = (graph, pageX, pageY) => ({
    type: ActionTypes.EDITOR.TOOL_ELEMENT_RELEASED,
    payload: { graph, pageX, pageY }
});

export const ToolTabSelected = (tabNo) => ({
    type: ActionTypes.EDITOR.TOOL_TAB_SELECTED,
    payload: { tabNo }
});

export const MenuClearClicked = (e) => ({
    type: ActionTypes.EDITOR.MENU_CLEAR_CLICKED,
    payload: { event: e }
});

export const MenuClearConfirmed = () => ({
    type: ActionTypes.EDITOR.MENU_CLEAR_CONFIRMED
});

export const CellClicked = (x, y, width, height) => ({
    type: ActionTypes.EDITOR.CELL_CLICKED,
    payload: { x, y, width, height }
});

export const CellHandleClicked = (handle) => ({
    type: ActionTypes.EDITOR.CELL_HANDLE_CLICKED,
    payload: { handle }
});

export const CellHandleRelased = () => ({
    type: ActionTypes.EDITOR.CELL_HANDLE_RELEASED
});

export const CellHandleMoved = (width, height) => ({
    type: ActionTypes.EDITOR.CELL_HANDLE_MOVED,
    payload: { width, height }
});
