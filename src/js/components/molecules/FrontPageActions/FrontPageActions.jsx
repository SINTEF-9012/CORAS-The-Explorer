import React from 'react';

import './frontpageactions.css';

import Button from '../../atoms/Button/Button.jsx';

const FrontPageActions = ({ leftLink, rightLink }) =>
    <nav className="fp-actions">
        <div className="fp-left">
            <Button link={leftLink.path} text={leftLink.text} type="cta" minWidth="11rem" />
        </div>
        <div className="fp-right">
            <Button link={rightLink.path} text={rightLink.text} type="cta" minWidth="11rem" />
        </div>
    </nav>;

export default FrontPageActions;