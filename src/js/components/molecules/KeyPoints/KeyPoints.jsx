import React from 'react';

import './keypoints.css';

const KeyPoint = ({ header, text, link }) =>
    <div className="key-point">
        <header>
            <h1 className="key-point__header">{header}</h1>
        </header>
        <p className="key-point__description">
            {text}
        </p>
        <a className="key-point__read-more-link" href={link}>Read more <span className="icon-push-down icon-circle-right"></span></a>
    </div>

const KeyPoints = ({ keyPoints }) =>
    <div className="key-points">
        {keyPoints.map((val, key) => <KeyPoint header={val.header} text={val.text} link={val.link} key={key} />)}
    </div>

export default KeyPoints;