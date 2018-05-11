import React from 'react';

import './preview.css';
import ed from '../../../../img/exampleDiagram.png';

const Preview = (props) =>
    <div className="preview">
        <div className="preview-wrapper">    
            <div className="preview-left">
                <img className="preview-left__image" src={ed} />
            </div>
            <div className="preview-right">
                The COOLEST risk assessment approach EVER
            </div>
        </div>
    </div>;

export default Preview;