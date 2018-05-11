import React from 'react';

import './preview.css';


const Preview = ({ imageUrl, tagLine }) =>
    <div className="preview">
        <div className="preview-wrapper">    
            <div className="preview-left">
                <img className="preview-left__image" src={imageUrl} />
            </div>
            <div className="preview-right">
                {tagLine}
            </div>
        </div>
    </div>;

export default Preview;