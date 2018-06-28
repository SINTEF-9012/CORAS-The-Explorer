import React from 'react';
import { connect } from 'react-redux';
import { ToolElementClicked } from '../../../store/Actions';
import './editortool.css';

const EditorToolBar = ({ beginMoveElement, svgs }) =>
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

const EditorTool = ({ beginMoveElement, toolDefinitions, selectedTab }) =>
    <div className="editor-tools">
        <div className="editor-tabrow">
            {toolDefinitions.map((toolDefinition, i) => 
                <a>
                    <div className={`editor-tabrow__tab${i === selectedTab ? " editor-tabrow__tab--selected" : ""}`} key={i}>{toolDefinition.name}</div>
                </a>)}
        </div>
        <EditorToolBar beginMoveElement={beginMoveElement} svgs={toolDefinitions[selectedTab].shapes} />
    </div>;

export default connect((state) => ({
    selectedTab: state.editor.editorToolSection
}), (dispatch) => ({
    beginMoveElement: (element, width, height) => dispatch(ToolElementClicked(element, width, height))
}))(EditorTool);
