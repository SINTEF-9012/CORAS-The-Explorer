import React from 'react';

import './button.css';

function getTypeClass(type) {
    switch(type) {
        case "cta": return " button--call-to-action";
        case "small": return " button--small";
        default: return " ";
    }
}

const Button = ({ link, text, type, minWidth }) =>
    <a className={"button" + getTypeClass(type)} href={link} style={ minWidth ? { minWidth } : null}>{text}</a>;

export default Button;