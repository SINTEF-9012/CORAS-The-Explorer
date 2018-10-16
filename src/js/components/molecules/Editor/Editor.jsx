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
    ElementChangeType,
    ToolElementRelease,
    MenuClearClicked,
    MenuClearConfirmed
} from '../../../store/Actions';

import Modal from '../../atoms/Modal/Modal';

import ElementEditor from './ElementEditor';
import EditorTool from './EditorTool';

import "../../../../../node_modules/jointjs/dist/joint.css";
import './editor.css';

import AddCorasShapes from './CORASShapes.js';

import {        CorasSymbolsBase64,
    assetSymbol,
    assetSymbolOutlined,
    assetSymbolShaded,
    riskSymbol,
    riskSymbolOutlined,
    riskSymbolShaded,
    stakeholderSymbol,
    stakeholderSymbolOutlined,
    stakeholderSymbolShaded,
    threatHumanAccidentalSymbol,
    threatHumanAccidentalSymbolOutline,
    threatHumanAccidentalSymbolShadow,
    threatHumanDeliberateSymbol,
    threatHumanDeliberateSymbolOutlined,
    threatHumanDeliberateSymbolShaded,
    threatNonHumanSymbol,
    threatNonHumanSymbolOutlined,
    threatNonHumanSymbolShaded,
    treatmentSymbol,
    treatmentSymbolOutlined,
    treatmentSymbolShaded,
    unwantedIncidentSymbol,
    unwantedIncidentSymbolOutlined,
    unwantedIncidentSymbolShaded,
    vulnerabilitySymbol,
    vulnerabilitySymbolOutlined,
    vulnerabilitySymbolShaded,
} from "./svg//CorasSymbolsBase64.js"

const assetHeight = 60;
const riskHeight = 40;
const stakeholderHeight = 60;
const accidentalHeight = 40;
const deliberateHeight = 40;
const nonHumanHeight = 40;
const incidentHeight = 40;
const vulnerabilityHeight = 40;
const treatmentHeight = 40;

const toolDefinitions = [
    {
        name: "Basic CORAS",
        shapes: [
            {
                shapeFn: () => new joint.shapes.coras.unboxedElement(),
                width: 40,
                height: 80,
                iconHeight: assetHeight,
                icon: assetSymbol,
                text: "Asset",
                corasType: 0,
                typeStyles: {
                    0: { "icon/href": assetSymbol, "icon/height": assetHeight },
                    1: { "icon/href": assetSymbolOutlined, "icon/height": assetHeight },
                    2: { "icon/href": assetSymbolShaded, "icon/height": assetHeight }
                }
            },
            {
                shapeFn: () => new joint.shapes.coras.ellipseElement(),
                width: 190,
                height: 80,
                iconHeight: riskHeight,
                icon: riskSymbol,
                text: "Risk",
                corasType: 0,
                typeStyles: {
                    0: { "icon/href": riskSymbol, "icon/height": riskHeight },
                    1: { "icon/href": riskSymbolOutlined, "icon/height": riskHeight },
                    2: { "icon/href": riskSymbolShaded, "icon/height": riskHeight }
                }
            },
            {
                shapeFn: () => new joint.shapes.coras.unboxedElement(),
                width: 40,
                height: 80,
                iconHeight: stakeholderHeight,
                icon: stakeholderSymbol,
                text: "Stakeholder",
                corasType: 0,
                typeStyles: {
                    0: { "icon/href": stakeholderSymbol, "icon/height": stakeholderHeight},
                    1: { "icon/href": stakeholderSymbolOutlined, "icon/height": stakeholderHeight},
                    2: { "icon/href": stakeholderSymbolShaded, "icon/height": stakeholderHeight }
                }
            },
            {
                shapeFn: () => new joint.shapes.coras.unboxedElement(),
                width: 40,
                height: 80,
                iconHeight: accidentalHeight,
                icon: threatHumanAccidentalSymbol,
                text: "Human Threat\nAccidental",
                corasType: 0,
                typeStyles: {
                    0: { "icon/href": threatHumanAccidentalSymbol, "icon/height": accidentalHeight },
                    1: { "icon/href":threatHumanAccidentalSymbolOutline, "icon/height": accidentalHeight },
                    2: { "icon/href": threatHumanAccidentalSymbolShadow, "icon/height": accidentalHeight }
                }
            },
            {
                shapeFn: () => new joint.shapes.coras.unboxedElement(),
                width: 40,
                height: 100,
                iconHeight: deliberateHeight,
                icon: threatHumanDeliberateSymbol,
                text: "Human Threat\nDeliberate",
                corasType: 0,
                typeStyles: {
                    0: { "icon/href": threatHumanDeliberateSymbol, "icon/height": deliberateHeight },
                    1: { "icon/href": threatHumanDeliberateSymbolOutlined, "icon/height": deliberateHeight },
                    2: { "icon/href": threatHumanDeliberateSymbolShaded, "icon/height": deliberateHeight }
                }
            },
            {
                shapeFn: () => new joint.shapes.coras.unboxedElement(),
                width: 40,
                height: 80,
                iconHeight: nonHumanHeight,
                icon: threatNonHumanSymbol,
                text: "Non-Human\nThreat",
                corasType: 0,
                typeStyles: {
                    0: { "icon/href": threatNonHumanSymbol, "icon/height": nonHumanHeight },
                    1: { "icon/href": threatNonHumanSymbolOutlined, "icon/height": nonHumanHeight },
                    2: { "icon/href": threatNonHumanSymbolShaded, "icon/height": nonHumanHeight }
                }
            },
            {
                shapeFn: () => new joint.shapes.coras.ellipseElement(),
                width: 190,
                height: 80,
                iconHeight: treatmentHeight,
                icon: treatmentSymbol,
                text: "Treatment",
                corasType: 0,
                typeStyles: {
                    0: { "icon/href": treatmentSymbol, "body/strokeDasharray": "", "icon/height": treatmentHeight },
                    1: { "icon/href": treatmentSymbolOutlined, "body/strokeDasharray": "8, 4", "icon/height": treatmentHeight },
                    2: { "icon/href": treatmentSymbolShaded, "body/strokeDasharray": "8, 4", "icon/height": treatmentHeight }
                }
            },
            {
                shapeFn: () => new joint.shapes.coras.rectElement(),
                width: 190,
                height: 80,
                iconHeight: incidentHeight,
                icon: unwantedIncidentSymbol,
                text: "Incident",
                corasType: 0,
                typeStyles: {
                    0: { "icon/href": unwantedIncidentSymbol, "body/strokeDasharray": "", "icon/height": incidentHeight },
                    1: { "icon/href": unwantedIncidentSymbolOutlined, "body/strokeDasharray": "8, 4", "icon/height": incidentHeight },
                    2: { "icon/href": unwantedIncidentSymbolShaded, "body/strokeDasharray": "8, 4", "icon/height": incidentHeight }
                }
            },
            {
                shapeFn: () => new joint.shapes.coras.unboxedElement(),
                width: 40,
                height: 80,
                iconHeight: vulnerabilityHeight,
                icon: vulnerabilitySymbol,
                text: "Vulnerability",
                corasType: 0,
                typeStyles: {
                    0: { "icon/href": vulnerabilitySymbol, "icon/height": vulnerabilityHeight },
                    1: { "icon/href": vulnerabilitySymbolOutlined, "icon/height": vulnerabilityHeight },
                    2: { "icon/href": vulnerabilitySymbolShaded, "icon/height": vulnerabilityHeight }
                }
            }
        ]
    },
    {
        name: "Before",
        shapes: [
            {
                shapeFn: () => new joint.shapes.coras.unboxedElement(),
                width: 40,
                height: 80,
                iconHeight: assetHeight,
                icon: assetSymbol,
                text: "Asset",
                corasType: 1,
                typeStyles: {
                    0: { "icon/href": assetSymbol, "icon/height": assetHeight },
                    1: { "icon/href": assetSymbolOutlined, "icon/height": assetHeight },
                    2: { "icon/href": assetSymbolShaded, "icon/height": assetHeight }
                }
            },
            {
                shapeFn: () => new joint.shapes.coras.ellipseElement(),
                width: 190,
                height: 80,
                iconHeight: riskHeight,
                icon: riskSymbol,
                text: "Risk",
                corasType: 1,
                typeStyles: {
                    0: { "icon/href": riskSymbol, "icon/height": riskHeight },
                    1: { "icon/href": riskSymbolOutlined, "icon/height": riskHeight },
                    2: { "icon/href": riskSymbolShaded, "icon/height": riskHeight }
                }
            },
            {
                shapeFn: () => new joint.shapes.coras.unboxedElement(),
                width: 40,
                height: 80,
                iconHeight: stakeholderHeight,
                icon: stakeholderSymbol,
                text: "Stakeholder",
                corasType: 1,
                typeStyles: {
                    0: { "icon/href": stakeholderSymbol, "icon/height": stakeholderHeight},
                    1: { "icon/href": stakeholderSymbolOutlined, "icon/height": stakeholderHeight},
                    2: { "icon/href": stakeholderSymbolShaded, "icon/height": stakeholderHeight }
                }
            },
            {
                shapeFn: () => new joint.shapes.coras.unboxedElement(),
                width: 40,
                height: 80,
                iconHeight: accidentalHeight,
                icon: threatHumanAccidentalSymbol,
                text: "Human Threat\nAccidental",
                corasType: 1,
                typeStyles: {
                    0: { "icon/href": threatHumanAccidentalSymbol, "icon/height": accidentalHeight },
                    1: { "icon/href":threatHumanAccidentalSymbolOutline, "icon/height": accidentalHeight },
                    2: { "icon/href": threatHumanAccidentalSymbolShadow, "icon/height": accidentalHeight }
                }
            },
            {
                shapeFn: () => new joint.shapes.coras.unboxedElement(),
                width: 40,
                height: 100,
                iconHeight: deliberateHeight,
                icon: threatHumanDeliberateSymbol,
                text: "Human Threat\nDeliberate",
                corasType: 1,
                typeStyles: {
                    0: { "icon/href": threatHumanDeliberateSymbol, "icon/height": deliberateHeight },
                    1: { "icon/href": threatHumanDeliberateSymbolOutlined, "icon/height": deliberateHeight },
                    2: { "icon/href": threatHumanDeliberateSymbolShaded, "icon/height": deliberateHeight }
                }
            },
            {
                shapeFn: () => new joint.shapes.coras.unboxedElement(),
                width: 40,
                height: 80,
                iconHeight: nonHumanHeight,
                icon: threatNonHumanSymbol,
                text: "Non-Human\nThreat",
                corasType: 1,
                typeStyles: {
                    0: { "icon/href": threatNonHumanSymbol, "icon/height": nonHumanHeight },
                    1: { "icon/href": threatNonHumanSymbolOutlined, "icon/height": nonHumanHeight },
                    2: { "icon/href": threatNonHumanSymbolShaded, "icon/height": nonHumanHeight }
                }
            },
            {
                shapeFn: () => new joint.shapes.coras.ellipseElement(),
                width: 190,
                height: 80,
                iconHeight: treatmentHeight,
                icon: treatmentSymbol,
                text: "Treatment",
                corasType: 1,
                typeStyles: {
                    0: { "icon/href": treatmentSymbol, "body/strokeDasharray": "", "icon/height": treatmentHeight },
                    1: { "icon/href": treatmentSymbolOutlined, "body/strokeDasharray": "8, 4", "icon/height": treatmentHeight },
                    2: { "icon/href": treatmentSymbolShaded, "body/strokeDasharray": "8, 4", "icon/height": treatmentHeight }
                }
            },
            {
                shapeFn: () => new joint.shapes.coras.rectElement(),
                width: 190,
                height: 80,
                iconHeight: incidentHeight,
                icon: unwantedIncidentSymbol,
                text: "Incident",
                corasType: 1,
                typeStyles: {
                    0: { "icon/href": unwantedIncidentSymbol, "body/strokeDasharray": "", "icon/height": incidentHeight },
                    1: { "icon/href": unwantedIncidentSymbolOutlined, "body/strokeDasharray": "8, 4", "icon/height": incidentHeight },
                    2: { "icon/href": unwantedIncidentSymbolShaded, "body/strokeDasharray": "8, 4", "icon/height": incidentHeight }
                }
            },
            {
                shapeFn: () => new joint.shapes.coras.unboxedElement(),
                width: 40,
                height: 80,
                iconHeight: vulnerabilityHeight,
                icon: vulnerabilitySymbol,
                text: "Vulnerability",
                corasType: 1,
                typeStyles: {
                    0: { "icon/href": vulnerabilitySymbol, "icon/height": vulnerabilityHeight },
                    1: { "icon/href": vulnerabilitySymbolOutlined, "icon/height": vulnerabilityHeight },
                    2: { "icon/href": vulnerabilitySymbolShaded, "icon/height": vulnerabilityHeight }
                }
            }
        ]
    },
    {
        name: "After",
        shapes: [
            {
                shapeFn: () => new joint.shapes.coras.unboxedElement(),
                width: 40,
                height: 80,
                iconHeight: assetHeight,
                icon: assetSymbol,
                text: "Asset",
                corasType: 2,
                typeStyles: {
                    0: { "icon/href": assetSymbol, "icon/height": assetHeight },
                    1: { "icon/href": assetSymbolOutlined, "icon/height": assetHeight },
                    2: { "icon/href": assetSymbolShaded, "icon/height": assetHeight }
                }
            },
            {
                shapeFn: () => new joint.shapes.coras.ellipseElement(),
                width: 190,
                height: 80,
                iconHeight: riskHeight,
                icon: riskSymbol,
                text: "Risk",
                corasType: 2,
                typeStyles: {
                    0: { "icon/href": riskSymbol, "icon/height": riskHeight },
                    1: { "icon/href": riskSymbolOutlined, "icon/height": riskHeight },
                    2: { "icon/href": riskSymbolShaded, "icon/height": riskHeight }
                }
            },
            {
                shapeFn: () => new joint.shapes.coras.unboxedElement(),
                width: 40,
                height: 80,
                iconHeight: stakeholderHeight,
                icon: stakeholderSymbol,
                text: "Stakeholder",
                corasType: 2,
                typeStyles: {
                    0: { "icon/href": stakeholderSymbol, "icon/height": stakeholderHeight},
                    1: { "icon/href": stakeholderSymbolOutlined, "icon/height": stakeholderHeight},
                    2: { "icon/href": stakeholderSymbolShaded, "icon/height": stakeholderHeight }
                }
            },
            {
                shapeFn: () => new joint.shapes.coras.unboxedElement(),
                width: 40,
                height: 80,
                iconHeight: accidentalHeight,
                icon: threatHumanAccidentalSymbol,
                text: "Human Threat\nAccidental",
                corasType: 2,
                typeStyles: {
                    0: { "icon/href": threatHumanAccidentalSymbol, "icon/height": accidentalHeight },
                    1: { "icon/href":threatHumanAccidentalSymbolOutline, "icon/height": accidentalHeight },
                    2: { "icon/href": threatHumanAccidentalSymbolShadow, "icon/height": accidentalHeight }
                }
            },
            {
                shapeFn: () => new joint.shapes.coras.unboxedElement(),
                width: 40,
                height: 100,
                iconHeight: deliberateHeight,
                icon: threatHumanDeliberateSymbol,
                text: "Human Threat\nDeliberate",
                corasType: 2,
                typeStyles: {
                    0: { "icon/href": threatHumanDeliberateSymbol, "icon/height": deliberateHeight },
                    1: { "icon/href": threatHumanDeliberateSymbolOutlined, "icon/height": deliberateHeight },
                    2: { "icon/href": threatHumanDeliberateSymbolShaded, "icon/height": deliberateHeight }
                }
            },
            {
                shapeFn: () => new joint.shapes.coras.unboxedElement(),
                width: 40,
                height: 80,
                iconHeight: nonHumanHeight,
                icon: threatNonHumanSymbol,
                text: "Non-Human\nThreat",
                corasType: 2,
                typeStyles: {
                    0: { "icon/href": threatNonHumanSymbol, "icon/height": nonHumanHeight },
                    1: { "icon/href": threatNonHumanSymbolOutlined, "icon/height": nonHumanHeight },
                    2: { "icon/href": threatNonHumanSymbolShaded, "icon/height": nonHumanHeight }
                }
            },
            {
                shapeFn: () => new joint.shapes.coras.ellipseElement(),
                width: 190,
                height: 80,
                iconHeight: treatmentHeight,
                icon: treatmentSymbol,
                text: "Treatment",
                corasType: 2,
                typeStyles: {
                    0: { "icon/href": treatmentSymbol, "body/strokeDasharray": "", "icon/height": treatmentHeight },
                    1: { "icon/href": treatmentSymbolOutlined, "body/strokeDasharray": "8, 4", "icon/height": treatmentHeight },
                    2: { "icon/href": treatmentSymbolShaded, "body/strokeDasharray": "8, 4", "icon/height": treatmentHeight }
                }
            },
            {
                shapeFn: () => new joint.shapes.coras.rectElement(),
                width: 190,
                height: 80,
                iconHeight: incidentHeight,
                icon: unwantedIncidentSymbol,
                text: "Incident",
                corasType: 2,
                typeStyles: {
                    0: { "icon/href": unwantedIncidentSymbol, "body/strokeDasharray": "", "icon/height": incidentHeight },
                    1: { "icon/href": unwantedIncidentSymbolOutlined, "body/strokeDasharray": "8, 4", "icon/height": incidentHeight },
                    2: { "icon/href": unwantedIncidentSymbolShaded, "body/strokeDasharray": "8, 4", "icon/height": incidentHeight }
                }
            },
            {
                shapeFn: () => new joint.shapes.coras.unboxedElement(),
                width: 40,
                height: 80,
                iconHeight: vulnerabilityHeight,
                icon: vulnerabilitySymbol,
                text: "Vulnerability",
                corasType: 2,
                typeStyles: {
                    0: { "icon/href": vulnerabilitySymbol, "icon/height": vulnerabilityHeight },
                    1: { "icon/href": vulnerabilitySymbolOutlined, "icon/height": vulnerabilityHeight },
                    2: { "icon/href": vulnerabilitySymbolShaded, "icon/height": vulnerabilityHeight }
                }
            }
        ]
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
        window.localStorage.setItem(this.paperId + "graph", JSON.stringify(this.graph.toJSON()))
    }

    getFromLocalStorage() {
        return window.localStorage.getItem(this.paperId + "graph");
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
        if (this.getFromLocalStorage()) this.graph.fromJSON(JSON.parse(this.getFromLocalStorage()));
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
        if (filePath.files && filePath.files[0]) {
            reader.addEventListener('load', (e) => this.graph.fromJSON(JSON.parse(e.target.result)), { once: true });
            reader.readAsText(filePath.files[0]);
            filePath.value = "";
        }
    }

    clearGraph(e) {
        this.graph.clear();
        window.localStorage.removeItem(this.paperId + "graph");
        if (this.props.initialDiagram) this.graph.fromJSON(this.props.initialDiagram);
        this.props.clearConfirmed();
    }

    downloadSvg() {
        let svgElement = this.paperRef.current.getElementsByTagName('svg')[0];
        //get svg source.
        let serializer = new XMLSerializer();
        let source = serializer.serializeToString(svgElement);

        //add name spaces.
        if (!source.match(/^<svg[^>]+xmlns="http\:\/\/www\.w3\.org\/2000\/svg"/)) {
            source = source.replace(/^<svg/, '<svg xmlns="http://www.w3.org/2000/svg"');
        }
        if (!source.match(/^<svg[^>]+"http\:\/\/www\.w3\.org\/1999\/xlink"/)) {
            source = source.replace(/^<svg/, '<svg xmlns:xlink="http://www.w3.org/1999/xlink"');
        }

        // Fix svg size
        let search = /(<svg xmlns="\S*" xmlns:xlink="\S*" version="\S*" id="\S*" width=)\S*( height=)\S*(>)/gm;
        let replace = `$1"${this.paperRef.current.offsetWidth}px"$2"${this.paperRef.current.offsetHeight}px"$3`
        source = source.replace(search, replace);

        //add xml declaration
        source = '<?xml version="1.0" standalone="no"?>\r\n' + source;

        //convert svg source to URI data scheme.
        let url = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(source);

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
                    showClearModal={this.props.showClearModal}
                    clearPosition={this.props.clearPosition}
                    clearClicked={this.props.clearClicked}
                    downloadFn={this.downloadSvg} />
                {this.props.elementEditor.visible ? <ElementEditor
                    {...this.props.elementEditor.data}
                    cancel={this.props.elementEditorCancel}
                    save={this.props.elementEditorSave}
                    delete={this.props.elementEditorDelete}
                    labelOnChange={this.props.elementEditorLabelEdit}
                    xOnChange={this.props.elementEditorChangeX}
                    yOnChange={this.props.elementEditorChangeY}
                    typeOnChange={this.props.elementEditorChangeType} /> : null}
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
                    <EditorTool toolDefinitions={toolDefinitions} /> : null}
            </div>);
    }
}



const EditorMenu = ({ loadStartFn, loadRef, loadFn, saveFn, clearFn, showClearModal, clearClicked, clearPosition, downloadFn }) =>
    <div className="editor-menu">
        <button className="editor-menu__button" onClick={loadStartFn}>Load</button>
        <input type="file" name="loadFile" label="Load" className="editor-menu__hidden" onChange={loadFn} ref={loadRef} />
        <button className="editor-menu__button" onClick={saveFn}>Save</button>
        <button className="editor-menu__button" onClick={clearClicked}>Clear</button>
        <Modal isOpen={showClearModal} noBackground={true} position={clearPosition}>
            <div className="editor-clear-modal">
                <div className="editor-clear-modal__description">Are you sure you want to clear the diagram?</div>
                <button className="editor-clear-modal__button editor-clear-modal__button--danger" onClick={clearFn}>Yes, clear</button>
                <button className="editor-clear-modal__button editor-clear-modal__button" onClick={clearClicked}>No, cancel</button>
            </div>
        </Modal>
        <button className="editor-menu__button" onClick={downloadFn}>Download (SVG)</button>
    </div>;



export default connect((state) => ({
    elementEditor: state.editor.elementEditor,
    showClearModal: state.editor.editorMenu.showClearModal,
    clearPosition: state.editor.editorMenu.clearPosition
}), (dispatch) => ({
    elementRightClicked: (element, graph) => dispatch(ElementRightClicked(element, graph)),
    elementDoubleClicked: (element, event) => dispatch(ElementDoubleClicked(element, event)),
    elementEditorCancel: () => dispatch(ElementEditorCancel()),
    elementEditorSave: () => dispatch(ElementEditorSave()),
    elementEditorDelete: () => dispatch(ElementEditorDelete()),
    elementEditorLabelEdit: (label) => dispatch(ElementLabelEdit(label)),
    elementEditorChangeX: (x) => dispatch(ElementChangeX(x)),
    elementEditorChangeY: (y) => dispatch(ElementChangeY(y)),
    elementEditorChangeType: (type) => dispatch(ElementChangeType(type)),
    elementDropped: (graph, pageX, pageY) => dispatch(ToolElementRelease(graph, pageX, pageY)),
    clearClicked: (e) => dispatch(MenuClearClicked(e)),
    clearConfirmed: () => dispatch(MenuClearConfirmed())
}))(Editor);
