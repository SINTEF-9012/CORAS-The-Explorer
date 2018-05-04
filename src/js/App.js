import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Header from './components/molecules/Header/Header.jsx';
import Footer from './components/molecules/Footer/Footer.jsx';

import Frontpage from './components/pages/Frontpage.jsx';

const App = (props) =>
    <Router>
        <div>
            <Header />
            <Route exact path={'/'} component={() => <Frontpage />} />
            <Route path={'/introduction'} component={() => <div>Hei 2</div>} />
            <Footer />
        </div>
    </Router>;

export default App; 