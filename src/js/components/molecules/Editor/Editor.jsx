import React from 'react';
import joint from 'jointjs';

import ElementEditor from './ElementEditor'

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

        this.closeElementEditor = this.closeElementEditor.bind(this);

        this.paperId = this.props.paperId || 'paper-holder';
        this.paperWrapperId = `${this.paperId}-wrapper`;

        this.state = {
            currentLink: null,
            elementEditor: {
                visible: false,
                data: {
                    isLink: false,
                    position: {
                        left: 0,
                        top: 0
                    },
                    elementView: null,
                    e: null,
                    x: null,
                    y: null,
                    graph: null,
                    paper: null,

                }
            }
        }
    }

    componentDidMount() {
        this.initializeEditorHandlers();
        this.initializeToolHandlers();
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updatePaperSize);
    }

    closeElementEditor() {
        this.setState((prevstate) => {
            prevstate.elementEditor.visible = false;
            return prevstate;
        });
    }

    render() {
        return (
            <div>
                {this.state.elementEditor.visible ? <ElementEditor {...this.state.elementEditor.data} closeFn={this.closeElementEditor}/> : null}
                <div id={this.paperWrapperId} className="editor-paper" style={{ width: `${this.props.width}px`, height: `${this.props.height}px` }}>
                    <div id={this.paperId}></div>
                </div>
                {this.props.interactive || this.props.interactive === undefined ?
                    <div className="editor-toolbox">
                        <div id="tool-paper"></div>
                    </div> : null}
            </div>);
    }
}

export default Editor;
