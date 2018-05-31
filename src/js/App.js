import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Header from './components/molecules/Header/Header';
import Footer from './components/molecules/Footer/Footer';

import Frontpage from './components/pages/Frontpage';
import About from './components/pages/About';
import Learn from './components/pages/Learn';
import EditorPage from './components/pages/EditorPage';
import QuickStart from './components/pages/QuickStart';

const App = (props) =>
    <Router>
        <div>
            <Header location={window.location.pathname} />
            <div className="page-content-wrapper">
                <Route exact path={'/'} component={Frontpage} />
                <Route path={'/quick-start/:step?'} component={QuickStart} />
                <Route path={'/learn'} component={Learn} />
                <Route path={'/about'} component={About} />
                <Route path={'/try-it'} component={EditorPage} />
            </div>
            <Footer />
        </div>
    </Router>;

export default App; 
