import React from 'react';
import joint from 'jointjs';
import { connect } from 'react-redux';
import { ElementRightClicked, ElementDoubleClicked, ElementEditorCancel, ElementEditorSave, ElementEditorDelete, ElementLabelEdit, ElementChangeX, ElementChangeY, ToolElementRelease } from '../../../store/Actions';

import ElementEditor from './ElementEditor';
import EditorTool from './EditorTool';

import "../../../../../node_modules/jointjs/dist/joint.css";
import './editor.css';

import AddCorasShapes from './CORASShapes.js';

import Asset from './svg/asset.svg';
import Risk from './svg/risk.svg';
import Stakeholder from './svg/stakeholder.svg';
import ThreatHumanAccidental from './svg/threat-human-accidental.svg';
import ThreatHumanDeliberate from './svg/threat-human-deliberate.svg';
import ThreatNonHuman from './svg/threat-non-human.svg';
import Treatment from './svg/treatment.svg';
import UnwantedIncident from './svg/unwanted-incident.svg';
import Vulnerability from './svg/vulnerability.svg';

const toolDefinitions = [
    {
        url: Asset,
        shapeFn: () => new joint.shapes.coras.asset()
    },
    {
        url: Risk,
        shapeFn: () => new joint.shapes.coras.risk()
    },
    {
        url: Stakeholder,
        shapeFn: () => new joint.shapes.coras.stakeholder()
    },
    {
        url: ThreatHumanAccidental,
        shapeFn: () => new joint.shapes.coras.threathumanaccidental()
    },
    {
        url: ThreatHumanDeliberate,
        shapeFn: () => new joint.shapes.coras.threathumandeliberate()
    },
    {
        url: ThreatNonHuman,
        shapeFn: () => new joint.shapes.coras.threatnonhuman()
    },
    {
        url: Treatment,
        shapeFn: () => new joint.shapes.coras.treatment()
    },
    {
        url: UnwantedIncident,
        shapeFn: () => new joint.shapes.coras.unwantedincident()
    },
    {
        url: Vulnerability,
        shapeFn: () => new joint.shapes.coras.vulnerability()
    }
]

AddCorasShapes(joint);

class EditorView extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (<div></div>);
    }
}



class Editor extends React.Component {
    constructor(props) {
        super(props);

        this.graph = new joint.dia.Graph();

        this.handleScroll = this.handleScroll.bind(this);
        this.handleScrollBlank = this.handleScrollBlank.bind(this);
        this.beginMovePaper = this.beginMovePaper.bind(this);
        this.movePaper = this.movePaper.bind(this);
        this.endMovePaper = this.endMovePaper.bind(this);
        this.updatePaperSize = this.updatePaperSize.bind(this);
        this.removeLink = this.removeLink.bind(this);

        this.paperOnMouseUp = this.paperOnMouseUp.bind(this);

        this.paperId = this.props.paperId || 'paper-holder';
        this.paperWrapperId = `${this.paperId}-wrapper`;
    }

    componentDidMount() {
        this.paper = new joint.dia.Paper({
            el: document.getElementById(this.paperId),
            model: this.graph,
            width: document.getElementById(this.paperWrapperId).offsetWidth - 10,
            height: document.getElementById(this.paperWrapperId).offsetHeight - 10,
            gridSize: 1,
            background: {
                color: 'rgba(255, 255, 255, 1)',
            },
            interactive: this.props.interactive === undefined ? true : this.props.interactive
        });

        if (this.props.initialDiagram) {
            // We have an initial diagram
            this.graph.fromJSON(this.props.initialDiagram);
        }

        window.addEventListener('resize', this.updatePaperSize);

        if (this.props.interactive === undefined ? true : this.props.interactive) {
            this.paper.on('element:contextmenu', (elementView, e, x, y) => this.props.elementRightClicked(elementView.model, this.graph));
            this.paper.on('link:contextmenu', this.removeLink);
            this.paper.on('cell:pointerdblclick', (elementView, e, x, y) => this.props.elementDoubleClicked(elementView.model, e));

            this.paper.on('cell:mousewheel', this.handleScroll);
            this.paper.on('blank:mousewheel', this.handleScrollBlank);

            this.paper.on('blank:pointerdown', this.beginMovePaper);
            this.paper.on('blank:pointermove', this.movePaper);
            this.paper.on('blank:pointerup', this.endMovePaper);
        }
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updatePaperSize);
    }

    handleScroll(cellView, e, x, y, delta) {
        const scaleFactor = 1.1;
        const currentScale = this.paper.scale();

        if (delta > 0) {
            const newX = currentScale.sx * scaleFactor > 5 ? currentScale.sx : currentScale.sx * scaleFactor;
            const newY = currentScale.sy * scaleFactor > 5 ? currentScale.sy : currentScale.sy * scaleFactor;
            this.paper.scale(newX, newY);
        } else if (delta < 0) {
            const newX = currentScale.sx / scaleFactor < 0.52 ? currentScale.sx : currentScale.sx / scaleFactor;
            const newY = currentScale.sy / scaleFactor < 0.52 ? currentScale.sy : currentScale.sy / scaleFactor;
            this.paper.scale(newX, newY);
        }
    }

    handleScrollBlank(e, x, y, delta) {
        this.handleScroll(null, e, x, y, delta);
    }

    beginMovePaper(e, x, y) {
        this.setState({ paperMove: { moving: true, x, y } });
    }

    movePaper(e, x, y) {
        if (this.state.paperMove.moving) {
            const { tx, ty } = this.paper.translate();
            this.paper.translate(tx + (x - this.state.paperMove.x), ty + (y - this.state.paperMove.y));
        }
    }

    endMovePaper(e, x, y) {
        this.setState({ paperMove: { moving: false } })
    }

    updatePaperSize() {
        this.paper.setDimensions(
            document.getElementById(this.paperWrapperId).offsetWidth - 10,
            document.getElementById(this.paperWrapperId).offsetHeight - 10);
    }

    removeLink(elementView, e, x, y) {
        if (!this.state.linkToRemove) this.setState({ linkToRemove: elementView });
        else if (this.state.linkToRemove === elementView) {
            this.setState({ linkToRemove: null });
            elementView.model.remove();
        } else this.setState({ linkToRemove: null });
    }

    paperOnMouseUp(e) {
        e.preventDefault();
        const localPoint = this.paper.pageToLocalPoint(e.pageX, e.pageY);
        this.props.elementDropped(this.graph, localPoint.x, localPoint.y);
    }

    render() {
        return (
            <div className="editor-wrapper">
                <EditorMenu />
                {this.props.elementEditor.visible ? <ElementEditor
                    {...this.props.elementEditor.data}
                    cancel={this.props.elementEditorCancel}
                    save={this.props.elementEditorSave}
                    delete={this.props.elementEditorDelete}
                    labelOnChange={this.props.elementEditorLabelEdit}
                    xOnChange={this.props.elementEditorChangeX}
                    yOnChange={this.props.elementEditorChangeY} /> : null}
                <div
                    id={this.paperWrapperId}
                    className="editor-paper"
                    onDragEnter={(e) => e.preventDefault()}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={this.paperOnMouseUp} 
                    style={{ width: `${this.props.width}px`, height: `${this.props.height}px` }}>
                    <div id={this.paperId}></div>
                </div>
                {this.props.interactive || this.props.interactive === undefined ?
                     <EditorTool svgs={toolDefinitions} /> : null}
            </div>);
    }
}

const EditorMenu = (props) =>
    <div className="editor-menu">
        <button className="editor-menu__button">Load</button>
        <button className="editor-menu__button">Save</button>
        <button className="editor-menu__button">Clear</button>
    </div>;

export default connect((state) => ({
    elementEditor: state.editor.elementEditor
}), (dispatch) => ({
    elementRightClicked: (element, graph) => dispatch(ElementRightClicked(element, graph)),
    elementDoubleClicked: (element, event) => dispatch(ElementDoubleClicked(element, event)),
    elementEditorCancel: () => dispatch(ElementEditorCancel()),
    elementEditorSave: () => dispatch(ElementEditorSave()),
    elementEditorDelete: () => dispatch(ElementEditorDelete()),
    elementEditorLabelEdit: (label) => dispatch(ElementLabelEdit(label)),
    elementEditorChangeX: (x) => dispatch(ElementChangeX(x)),
    elementEditorChangeY: (y) => dispatch(ElementChangeY(y)),
    elementDropped: (graph, pageX, pageY) => dispatch(ToolElementRelease(graph, pageX, pageY))
}))(Editor);
