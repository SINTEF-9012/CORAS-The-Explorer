import React from 'react';
import joint from 'jointjs';
import { connect } from 'react-redux';
import {
    ElementRightClicked,
    ElementDoubleClicked,
    ElementEditorCancel,
    ElementEditorSave,
    ElementEditorDelete,
    ElementLabelEdit,
    ElementChangeX,
    ElementChangeY,
    ToolElementRelease
} from '../../../store/Actions';

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

import assetSymbol from './svg/assetSymbol.js';
import riskSymbol from './svg/riskSymbol.js';
import stakeholderSymbol from './svg/stakeholderSymbol.js';
import accidentalSymbol from './svg/threatHumanAccidentalSymbol.js';
import deliberateSymbol from './svg/threatHumanDeliberateSymbol.js';
import nonHumanSymbol from './svg/threatNonHumanSymbol.js';
import treatmentSymbol from './svg/treatmentSymbol.js';
import incidentSymbol from './svg/unwantedIncidentSymbol.js';
import vulnerabilitySymbol from './svg/vulnerabilitySymbol.js';

const toolDefinitions = [
    {
        url: Asset,
        shapeFn: () => new joint.shapes.coras.unboxedElement(),
        width: 40,
        height: 80,
        icon: "data:image/svg+xml;charset=utf-8,"+encodeURIComponent(assetSymbol),
        text: "Asset"
    },
    {
        url: Risk,
        shapeFn: () => new joint.shapes.coras.ellipseElement(),
        width: 190,
        height: 80,
        icon: "data:image/svg+xml;charset=utf-8,"+encodeURIComponent(riskSymbol),
        text: "Risk"
    },
    {
        url: Stakeholder,
        shapeFn: () => new joint.shapes.coras.unboxedElement(),
        width: 40,
        height: 80,
        icon: "data:image/svg+xml;charset=utf-8,"+encodeURIComponent(stakeholderSymbol),
        text: "Stakeholder"
    },
    {
        url: ThreatHumanAccidental,
        shapeFn: () => new joint.shapes.coras.unboxedElement(),
        width: 40,
        height: 80,
        icon: "data:image/svg+xml;charset=utf-8,"+encodeURIComponent(accidentalSymbol),
        text: "Human Threat\nAccidental"
    },
    {
        url: ThreatHumanDeliberate,
        shapeFn: () => new joint.shapes.coras.unboxedElement(),
        width: 40,
        height: 80,
        icon: "data:image/svg+xml;charset=utf-8,"+encodeURIComponent(deliberateSymbol),
        text: "Human Threat\nDeliberate"
    },
    {
        url: ThreatNonHuman,
        shapeFn: () => new joint.shapes.coras.unboxedElement(),
        width: 40,
        height: 80,
        icon: "data:image/svg+xml;charset=utf-8,"+encodeURIComponent(nonHumanSymbol),
        text: "Non-Human\nThreat"
    },
    {
        url: Treatment,
        shapeFn: () => new joint.shapes.coras.ellipseElement(),
        width: 190,
        height: 80,
        icon: "data:image/svg+xml;charset=utf-8,"+encodeURIComponent(treatmentSymbol),
        text: "Treatment"
    },
    {
        url: UnwantedIncident,
        shapeFn: () => new joint.shapes.coras.unwantedincident(),
        width: 190,
        height: 80,
        icon: "data:image/svg+xml;charset=utf-8,"+encodeURIComponent(incidentSymbol),
        text: "Incident"
    },
    {
        url: Vulnerability,
        shapeFn: () => new joint.shapes.coras.unboxedElement(),
        width: 40,
        height: 80,
        icon: "data:image/svg+xml;charset=utf-8,"+encodeURIComponent(vulnerabilitySymbol),
        text: "Vulnerability"
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

        this.saveToLocalStorage = this.saveToLocalStorage.bind(this);
        this.getFromLocalStorage = this.getFromLocalStorage.bind(this);

        this.handleScroll = this.handleScroll.bind(this);
        this.handleScrollBlank = this.handleScrollBlank.bind(this);
        this.beginMovePaper = this.beginMovePaper.bind(this);
        this.movePaper = this.movePaper.bind(this);
        this.endMovePaper = this.endMovePaper.bind(this);
        this.updatePaperSize = this.updatePaperSize.bind(this);
        this.removeLink = this.removeLink.bind(this);

        this.paperOnMouseUp = this.paperOnMouseUp.bind(this);

        this.saveGraphToFile = this.saveGraphToFile.bind(this);
        this.loadGraphFromFile = this.loadGraphFromFile.bind(this);
        this.clearGraph = this.clearGraph.bind(this);
        this.downloadSvg = this.downloadSvg.bind(this);

        this.paperId = this.props.paperId || 'paper-holder';
        this.paperWrapperId = `${this.paperId}-wrapper`;

        this.loadRef = React.createRef();
        this.paperRef = React.createRef();
    }

    saveToLocalStorage() {
        window.localStorage.setItem(this.paperId+"graph", JSON.stringify(this.graph.toJSON()))
    }

    getFromLocalStorage() {
        return window.localStorage.getItem(this.paperId+"graph");
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

        // Load graph from localStorage or props
        if(this.getFromLocalStorage()) this.graph.fromJSON(JSON.parse(this.getFromLocalStorage()));
        else if (this.props.initialDiagram) this.graph.fromJSON(this.props.initialDiagram);

        // Save in localStorage on change
        this.periodicalSave = setInterval(this.saveToLocalStorage, 1000);

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
        clearInterval(this.periodicalSave);
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

    saveGraphToFile(e) {
        e.preventDefault();
        const a = document.createElement('a');
        const graphContent = new Blob([JSON.stringify(this.graph.toJSON(), null, 2)], { type: 'text/plain' });
        a.href = URL.createObjectURL(graphContent);
        a.download = "CORASDiagram.json";
        a.click();
        a.remove();
    }

    loadGraphFromFile(e) {
        const filePath = e.target;
        const reader = new FileReader();
        if(filePath.files && filePath.files[0]) {
            reader.addEventListener('load', (e) => this.graph.fromJSON(JSON.parse(e.target.result)), { once: true });
            reader.readAsText(filePath.files[0]);
            filePath.value = "";
        }
    }

    clearGraph(e) {
        this.graph.clear();
        window.localStorage.removeItem(this.paperId+"graph");
        if(this.props.initialDiagram) this.graph.fromJSON(this.props.initialDiagram);
    }

    downloadSvg() {
        let svgElement = this.paperRef.current.getElementsByTagName('svg')[0];
        //get svg source.
        let serializer = new XMLSerializer();
        let source = serializer.serializeToString(svgElement);

        //add name spaces.
        if(!source.match(/^<svg[^>]+xmlns="http\:\/\/www\.w3\.org\/2000\/svg"/)){
            source = source.replace(/^<svg/, '<svg xmlns="http://www.w3.org/2000/svg"');
        }
        if(!source.match(/^<svg[^>]+"http\:\/\/www\.w3\.org\/1999\/xlink"/)){
            source = source.replace(/^<svg/, '<svg xmlns:xlink="http://www.w3.org/1999/xlink"');
        }

        // Fix svg size
        let search = /(<svg xmlns="\S*" xmlns:xlink="\S*" version="\S*" id="\S*" width=)\S*( height=)\S*(>)/gm;
        let replace = `$1"${this.paperRef.current.offsetWidth}px"$2"${this.paperRef.current.offsetHeight}px"$3`
        source = source.replace(search, replace);

        //add xml declaration
        source = '<?xml version="1.0" standalone="no"?>\r\n' + source;

        //convert svg source to URI data scheme.
        let url = "data:image/svg+xml;charset=utf-8,"+encodeURIComponent(source);

        let a = document.createElement('a');
        a.href = url;
        a.download = 'CORASDiagram.svg';
        a.click();
        a.remove();
    }

    render() {
        return (
            <div className="editor-wrapper">
                <EditorMenu
                    loadStartFn={() => this.loadRef.current.click()}
                    loadFn={this.loadGraphFromFile}
                    loadRef={this.loadRef}
                    saveFn={this.saveGraphToFile}
                    clearFn={this.clearGraph}
                    downloadFn={this.downloadSvg} />
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
                    style={{ width: `${this.props.width}px`, height: `${this.props.height}px` }}
                    ref={this.paperRef} >
                    <div id={this.paperId}></div>
                </div>
                {this.props.interactive || this.props.interactive === undefined ?
                     <EditorTool svgs={toolDefinitions} /> : null}
            </div>);
    }
}

const EditorMenu = ({ loadStartFn, loadRef, loadFn, saveFn, clearFn, downloadFn }) =>
    <div className="editor-menu">
        <button className="editor-menu__button" onClick={loadStartFn}>Load</button>
        <input type="file" name="loadFile" label="Load" className="editor-menu__hidden" onChange={loadFn} ref={loadRef} />
        <button className="editor-menu__button" onClick={saveFn}>Save</button>
        <button className="editor-menu__button" onClick={clearFn}>Clear</button>
        <button className="editor-menu__button" onClick={downloadFn}>Download (SVG)</button>
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
