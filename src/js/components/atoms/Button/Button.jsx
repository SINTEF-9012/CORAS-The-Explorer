import React from 'react';

import './button.css';

function getTypeClass(type) {
    switch(type) {
        case "cta": return " button--call-to-action";
        default: return " ";
    }
}

const Button = ({ link, text, type }) =>
    <a className={"button" + getTypeClass(type)} href={link}>{text}</a>;

export default Button;