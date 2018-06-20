import React from 'react';
import joint from 'jointjs';

import ElementEditor from './ElementEditor'

import "../../../../../node_modules/jointjs/dist/joint.css";
import './editor.css';

import AddCorasShapes from './CORASShapes.js';

AddCorasShapes(joint);

class EditorView extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(<div></div>);
    }
}

class EditorTool extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(<div></div>);
    }
}

class Editor extends React.Component {
    constructor(props) {
        super(props);

        this.graph = new joint.dia.Graph();
        this.toolGraph = new joint.dia.Graph();

        this.initializeEditorHandlers = this.initializeEditorHandlers.bind(this);
        this.handleScroll = this.handleScroll.bind(this);
        this.handleScrollBlank = this.handleScrollBlank.bind(this);
        this.beginMovePaper = this.beginMovePaper.bind(this);
        this.movePaper = this.movePaper.bind(this);
        this.endMovePaper = this.endMovePaper.bind(this);
        this.updatePaperSize = this.updatePaperSize.bind(this);
        this.addLink = this.addLink.bind(this);
        this.removeLink = this.removeLink.bind(this);
        this.edit = this.edit.bind(this);
        
        this.initializeToolHandlers = this.initializeToolHandlers.bind(this);
        this.dragElementToView = this.dragElementToView.bind(this);

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

    initializeEditorHandlers() {
        this.paper = new joint.dia.Paper({
            el: document.getElementById(this.paperId),
            model: this.graph,
            width: document.getElementById(this.paperWrapperId).offsetWidth-10,
            height: document.getElementById(this.paperWrapperId).offsetHeight-10,
            gridSize: 1,
            background: {
                color: 'rgba(255, 255, 255, 1)',
            },
            interactive: this.props.interactive === undefined ? true : this.props.interactive
        });

        if(this.props.initialDiagram) {
            // We have an initial diagram
            this.graph.fromJSON(this.props.initialDiagram);
        }
        
        window.addEventListener('resize', this.updatePaperSize);
        
        window.paper = this.paper;

        if(this.props.interactive === undefined ? true : this.props.interactive) {
            this.paper.on('element:contextmenu', this.addLink);
            this.paper.on('link:contextmenu', this.removeLink);
            this.paper.on('cell:pointerdblclick', this.edit);

            this.paper.on('cell:mousewheel', this.handleScroll);
            this.paper.on('blank:mousewheel', this.handleScrollBlank);
        
            this.paper.on('blank:pointerdown', this.beginMovePaper);
            this.paper.on('blank:pointermove', this.movePaper);
            this.paper.on('blank:pointerup', this.endMovePaper);
        }
    }

    handleScroll(cellView, e, x, y, delta) {
        const scaleFactor = 1.1;
        const currentScale = this.paper.scale();
        
        if(delta > 0) {
            const newX = currentScale.sx*scaleFactor > 5 ? currentScale.sx : currentScale.sx*scaleFactor;
            const newY = currentScale.sy*scaleFactor > 5 ? currentScale.sy : currentScale.sy*scaleFactor;
            this.paper.scale(newX, newY);
        } else if (delta < 0){
            const newX = currentScale.sx/scaleFactor < 0.52 ? currentScale.sx : currentScale.sx/scaleFactor;
            const newY = currentScale.sy/scaleFactor < 0.52 ? currentScale.sy : currentScale.sy/scaleFactor;
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
        if(this.state.paperMove.moving) {
            const { tx, ty } = this.paper.translate();
            this.paper.translate(tx + (x - this.state.paperMove.x), ty + (y - this.state.paperMove.y));
        }
    }
    
    endMovePaper(e, x, y) {
        this.setState({ paperMove: {moving: false}})
    }

    updatePaperSize() {
        this.paper.setDimensions(
            document.getElementById(this.paperWrapperId).offsetWidth-10,
            document.getElementById(this.paperWrapperId).offsetHeight-10);
    }

    addLink(elementView, e, x, y) {
        if(!this.state.link) {
            this.setState({ sourceElem: elementView });
            // Start of link creation
            this.setState({ link: new joint.shapes.standard.Link() });
            this.state.link.source(elementView.model);
        } else {
            // End of link creation
            if(this.state.sourceElem !== elementView) {
                this.state.link.target(elementView.model);
                this.state.link.addTo(this.graph);
            } else elementView.model.remove();
            this.setState({ sourceElem: null });
            this.setState({ link: null });
        }
    }

    removeLink(elementView, e, x, y) {
        if(!this.state.linkToRemove) this.setState({ linkToRemove: elementView });
        else if(this.state.linkToRemove === elementView) {
            this.setState({ linkToRemove: null });
            elementView.model.remove();
        } else this.setState({ linkToRemove: null });
    }

    edit(elementView, e, x, y) {
        this.setState({ 
            elementEditor: {
                visible: true,
                data: {
                    isLink: elementView.model.isLink(),
                    position: {
                        left: e.pageX,
                        top: e.pageY
                    },
                    elementView,
                    e,
                    x,
                    y
                }
            }
        })
    }

    initializeToolHandlers() {
        this.toolPaper = new joint.dia.Paper({
            el: document.getElementById("tool-paper"),
            model: this.toolGraph,
            width: document.getElementById("tool-paper").offsetWidth-10,
            height: 100,
            interactive: false
        });

        const asset = new joint.shapes.coras.asset();
        asset.position(10, 10);

        const risk = new joint.shapes.coras.risk();
        risk.position(75, 10);

        const stakeholder = new joint.shapes.coras.stakeholder();
        stakeholder.position(290, 10);

        const threathumanaccidental = new joint.shapes.coras.threathumanaccidental();
        threathumanaccidental.position(350, 10);

        const threathumandeliberate = new joint.shapes.coras.threathumandeliberate();
        threathumandeliberate.position(410, 10);

        const threatnonhuman = new joint.shapes.coras.threatnonhuman();
        threatnonhuman.position(470, 10);

        const treatment = new joint.shapes.coras.treatment();
        treatment.position(540, 10);

        const unwantedincident = new joint.shapes.coras.unwantedincident();
        unwantedincident.position(750, 10);

        const vulnerability = new joint.shapes.coras.vulnerability();
        vulnerability.position(870, 10);

        this.toolGraph.addCell([asset,risk,stakeholder,threathumanaccidental,threathumandeliberate,threatnonhuman,treatment,unwantedincident,vulnerability]);
        this.toolPaper.on('cell:pointerdown', this.dragElementToView);
    }
    
    dragElementToView(elementView, event, x, y) {
        const body = document.getElementsByTagName('body')[0];
        const flyPaperElem = document.createElement('div');
        flyPaperElem.style.cssText = "position:fixed;z-index:10000;opacity:0;pointer-event:none;";
        flyPaperElem.setAttribute('id', 'flypaper-paper');
        body.appendChild(flyPaperElem);
        
        const flyPaperGraph = new joint.dia.Graph();
        const flyPaper = new joint.dia.Paper({
            graph: flyPaperGraph,
            el: flyPaperElem,
            interactive: false
        });

        const flyShape = elementView.model.clone();
        flyShape.position(0, 0);
        const originalPosition = elementView.model.position();
        const offset = { x: x - originalPosition.x, y: y - originalPosition.y};
        flyShape.addTo(flyPaperGraph);
        function mousemoveFn(e) {
            flyPaperElem.style.left = `${e.pageX - offset.x}px`;
            flyPaperElem.style.top = `${e.pageY - offset.y}px`;
        }
        
        body.addEventListener('mousemove', mousemoveFn);
        
        // Cleanup
        body.addEventListener('mouseup', (e) => {
            const x = e.pageX;
            const y = e.pageY
            const target = this.paper.$el.offset();

            // Dropped over paper ?
            if (x > target.left &&
                x < target.left + this.paper.$el.width() &&
                y > target.top &&
                y < target.top + this.paper.$el.height()) {
                
                const {tx, ty} = this.paper.translate();
                const s = flyShape.clone();
                s.position(x - target.left - offset.x - tx, y - target.top - offset.y - ty);
                this.graph.addCell(s);
            }
            body.removeChild(flyPaperElem)
            body.removeEventListener('mousemove', mousemoveFn);
        }, { once: true });
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
