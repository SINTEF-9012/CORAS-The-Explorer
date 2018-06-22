import React from 'react';
import { connect } from 'react-redux';
import { ToolElementClicked } from '../../../store/Actions';
import './editortool.css';

const EditorToolSvg = ({ beginMoveElement, svgs }) =>
    <div className="editor-toolbox">
        {svgs ?
            svgs.map((svg, i) =>
                <div className="editor-toolbox__element" key={i} >
                    <img
                        draggable
                        src={svg.url}
                        onDragStart={(e) => beginMoveElement(svg.shapeFn())} />
                </div>) :
            null}
    </div>;

export default connect((state) => ({}), (dispatch) => ({
    beginMoveElement: (element) => dispatch(ToolElementClicked(element))
}))(EditorToolSvg);
