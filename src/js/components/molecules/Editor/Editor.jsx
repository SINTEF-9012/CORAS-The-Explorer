import React from 'react';
import joint from 'jointjs';

import "../../../../../node_modules/jointjs/dist/joint.css";
import './editor.css';

import editorHandlers from './editorHandlers.js';
import toolHandlers from './toolHandlers.js';

function register(fn, self) {
    self[fn.name] = self[fn.name].bind(self);
}

function registerE(fn, self) {
    self[fn.name] = fn.bind(self);
}

function registerEs(fns, self) {
    fns.forEach((fn, i) => registerE(fn, self));
}

class Editor extends React.Component {
    constructor(props) {
        super(props);

        this.graph = new joint.dia.Graph();
        this.toolGraph = new joint.dia.Graph();

        registerEs(editorHandlers, this);
        registerEs(toolHandlers, this);

        this.paperId = this.props.paperId || 'paper-holder';
        this.paperWrapperId = `${this.paperId}-wrapper`;
        
        this.state = {
            currentLink: null
        }
    }

    componentDidMount() {
        this.initializeEditorHandlers();
        this.initializeToolHandlers();
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updatePaperSize);
    }

    render() {
        return(
            <div>
                <div id={this.paperWrapperId} className="editor-paper" style={{ width: `${this.props.width}px`, height: `${this.props.height}px` }}>
                    <div id={this.paperId}></div>
                </div>
                <div className="editor-toolbox">
                    <div id="tool-paper"></div>
                </div>
            </div>);
    }
}

export default Editor;
