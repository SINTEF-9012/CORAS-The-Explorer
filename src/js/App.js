import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Header from './components/molecules/Header/Header';
import Footer from './components/molecules/Footer/Footer';

import Frontpage from './components/pages/Frontpage';
import About from './components/pages/About';
import Introduction from './components/pages/Introduction';
import Editor from './components/pages/Editor';

const App = (props) =>
    <Router>
        <div>
            <Header location={window.location.pathname} />
            <Route exact path={'/'} component={() => <Frontpage />} />
            <Route path={'/introduction'} component={() => <Introduction />} />
            <Route path={'/about'} component={() => <About />} />
            <Route path={'/try-it'} component={() => <Editor />} />
            <Footer />
        </div>
    </Router>;

export default App; 
