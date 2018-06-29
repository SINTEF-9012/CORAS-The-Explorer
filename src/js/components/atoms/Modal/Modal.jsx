import React from 'react';
import './modal.css'

const Modal = ({ isOpen, children, noBackground, position }) =>
    isOpen? 
    <div className={`modal${noBackground ? " modal--no-background" : ""}`}>
        <div className="modal__content" style={position ? {
            position: "absolute",
            top: position.top,
            left: position.left,
            margin: "auto"
        } : {}}>{children}</div>
    </div> : null;

export default Modal;
