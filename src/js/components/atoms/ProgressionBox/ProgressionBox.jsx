import React from 'react';

import './progressionbox.css';

const ProgressionBox = ({ stepid, steps, rootPath }) =>
    <ul className="progression-box">
        {steps.map((step, index) =>
            <a key={index} href={`/${rootPath}/${index}`} title={step.title}>
                <ProgressionStep 
                    {...step} 
                    index={index}
                    open={index === stepid}
                    bgColor="#7898ac"
                    altColor1={index === stepid ? "#FFF" : null}
                    altColor2={index === stepid-1 ? "#FFF" : null}/>
                </a>)}
    </ul>;

const ProgressionStep = ({ index, shortTitle, open, bgColor, altColor1, altColor2 }) =>
    <li className="progression-box-item">
        <div className={`progression-box-item__index${open ? ' progression-box-item__index--active' : ''}`}>{index}</div>
        {open ? <div className="progression-box-item__title">{shortTitle}</div> : null}
        <Arrow colorLeft={altColor1 || bgColor} colorRight={altColor2 || bgColor} remSize={3} />
    </li>;

const Arrow = ({ colorLeft, colorRight, remSize }) =>
    {
        // Arrow is made of three divs inside a larger div.
        // The one in the middle is rotated 45 degrees, and forms the arrow-head
        
        // Calculate sizes for the internal divs
        const remSizeNum = parseFloat(remSize);
        const boxWidth = remSizeNum/2;
        const arrowWidth = Math.sqrt((boxWidth * boxWidth) + (boxWidth * boxWidth));    // Pythagoras (a^2 + b^2 = c^2)

        // Make the inline styles, to get colors correct, and add sizes
        const arrowStyle = { width: `${remSizeNum}rem`, height: `${remSizeNum}rem` };
        const lBoxStyle = { width: `${boxWidth}rem`, height: `${remSizeNum}rem`, backgroundColor: colorLeft };
        const arrowBoxStyle = { width: `${arrowWidth}rem`, height: `${arrowWidth}rem`, backgroundColor: colorLeft };
        const rBoxStyle = { width: `${boxWidth}rem`, height: `${remSizeNum}rem`, backgroundColor: colorRight };

        return (
            <div className="arrow" style={arrowStyle}>
                <div className="arrow__left-box" style={lBoxStyle}></div>
                <div className="arrow__box" style={arrowBoxStyle}></div>
                <div className="arrow__right-box" style={rBoxStyle}></div>
            </div>
        );
    }

export default ProgressionBox;
