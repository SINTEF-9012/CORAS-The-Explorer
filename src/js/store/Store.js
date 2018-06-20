import { createStore } from 'redux';

const initialState = {
    testState: "StateTest"
}

function reducer(state = initialState, action) {
    return Object.assign({}, state);
}

const Store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default Store;
