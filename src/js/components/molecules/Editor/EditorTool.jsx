import React from 'react';
import { connect } from 'react-redux';
import { ToolElementClicked } from '../../../store/Actions';
import './editortool.css';

const EditorToolSvg = ({ beginMoveElement, svgs }) =>
    <div className="editor-toolbox">
        {svgs ?
            svgs.map((svg, i) =>
                <div className="editor-toolbox__element"
                draggable
                onDragStart={(e) => {
                    const shape = svg.shapeFn();
                    shape.attr("icon/href", svg.icon);
                    shape.attr("text/text", svg.text);
                    beginMoveElement(shape, svg.width, svg.height)
                }}
                key={i} >
                    <img src={svg.icon} className="editor-toolbox__icon" />
                    <div>{svg.text}</div>
                </div>) :
            null}
    </div>;

export default connect((state) => ({}), (dispatch) => ({
    beginMoveElement: (element, width, height) => dispatch(ToolElementClicked(element, width, height))
}))(EditorToolSvg);
