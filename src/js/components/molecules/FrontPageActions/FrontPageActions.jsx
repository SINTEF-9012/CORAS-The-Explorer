import React from 'react';

import './frontpageactions.css';

import Button from '../../atoms/Button/Button.jsx';

const FrontPageActions = (props) =>
    <nav className="fp-actions">
        <div className="fp-left">
            <Button link="/introduction" text="Read more" type="cta" />
        </div>
        <div className="fp-right">
            <Button link="/try-it" text="Try it out!" type="cta" />
        </div>
    </nav>;

export default FrontPageActions;