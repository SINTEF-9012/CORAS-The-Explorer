import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from './js/App.js';
import Store from './js/store/Store.js';

ReactDOM.render(<Provider store={Store} ><App /></Provider>, document.getElementById('app'));
