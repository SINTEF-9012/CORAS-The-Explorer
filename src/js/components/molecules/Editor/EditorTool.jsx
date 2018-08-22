import React from 'react';
import { connect } from 'react-redux';
import { ToolElementClicked, ToolTabSelected } from '../../../store/Actions';
import './editortool.css';

const EditorToolBar = ({ beginMoveElement, svgs }) =>
    <div className="editor-toolbox">
        {svgs ?
            svgs.map((svg, i) =>
                <div className="editor-toolbox__element"
                draggable
                onDragStart={(e) => {
                    const shape = svg.shapeFn();
                    if(svg.attrs)
                        Object.keys(svg.attrs).map((key, index) => shape.attr(key, svg.attrs[key]));
                    shape.attr("icon/href", svg.icon);
                    shape.attr("text/text", svg.text);
                    shape.set('corasType', svg.corasType);
                    shape.set('typeStyles', svg.typeStyles);
                    beginMoveElement(shape, svg.width, svg.height)
                }}
                key={i} >
                    <img src={svg.icon} className="editor-toolbox__icon" />
                    <div>{svg.text}</div>
                </div>) :
            null}
    </div>;

const EditorTool = ({ beginMoveElement, toolDefinitions, selectedTab, selectTab }) =>
    <div className="editor-tools">
        <div className="editor-tabrow">
            {toolDefinitions.map((toolDefinition, i) => 
                <a onClick={() => selectTab(i)} key={i} className="editor-tabrow__tablink">
                    <div className={`editor-tabrow__tab${i === selectedTab ? " editor-tabrow__tab--selected" : ""}`}>{toolDefinition.name}</div>
                </a>)}
        </div>
        <EditorToolBar beginMoveElement={beginMoveElement} svgs={toolDefinitions[selectedTab].shapes} />
    </div>;

export default connect((state) => ({
    selectedTab: state.editor.editorToolSection
}), (dispatch) => ({
    beginMoveElement: (element, width, height) => dispatch(ToolElementClicked(element, width, height)),
    selectTab: (tabNo) => dispatch(ToolTabSelected(tabNo))
}))(EditorTool);
