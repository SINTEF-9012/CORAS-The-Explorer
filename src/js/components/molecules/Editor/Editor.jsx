import React from 'react';
import joint from 'jointjs';

import "../../../../../node_modules/jointjs/dist/joint.css";
import './editor.css';

class Editor extends React.Component {
    constructor(props) {
        super(props);

        this.graph = new joint.dia.Graph();

        this.updatePaperSize = this.updatePaperSize.bind(this);
        this.removeElement = this.removeElement.bind(this);
        this.addLink = this.addLink.bind(this);
        this.addElement = this.addElement.bind(this);
        this.handleScroll = this.handleScroll.bind(this);
        this.handleScrollBlank = this.handleScrollBlank.bind(this);

        this.movePaper = this.movePaper.bind(this);
        this.beginMovePaper = this.beginMovePaper.bind(this);
        this.endMovePaper = this.endMovePaper.bind(this);

        this.paperId = this.props.paperId || 'paper-holder';
        this.paperWrapperId = `${this.paperId}-wrapper`;
        
        this.state = {
            currentLink: null
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
        const { tx, ty } = this.paper.translate();
        this.paper.translate(tx + (x - this.state.paperMove.x), ty + (y - this.state.paperMove.y));
    }

    endMovePaper(e, x, y) {
        this.setState({ paperMove: {moving: false}})
    }

    componentDidMount() {
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
            this.paper.on('element:pointerdblclick', this.removeElement);
            this.paper.on('link:pointerdblclick', this.removeElement);
            this.paper.on('element:contextmenu', this.addLink);
            this.paper.on('blank:contextmenu', this.addElement);

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

    addLink(e) {
        if(!this.state.currentLink) {
            this.setState({currentLink: new joint.shapes.standard.Link()});
            this.state.currentLink.source(e.model);
        } else {
            this.state.currentLink.target(e.model);
            this.state.currentLink.addTo(this.graph);
            this.setState({currentLink: null});
        }
    }

    removeElement(e) {
        e.model.remove();
    }

    addElement(e, x, y) {
        let rect = new joint.shapes.standard.Rectangle();
        rect.position(x || 100, y || 30);
        rect.resize(100, 40);
        rect.attr({
            body: {
                fill: 'blue'
            },
            label: {
                text: 'New Box',
                fill: 'white'
            }
        });

        rect.addTo(this.graph);
    }

    updatePaperSize() {
        this.paper.setDimensions(
            document.getElementById(this.paperWrapperId).offsetWidth,
            document.getElementById(this.paperWrapperId).offsetHeight);
    }

    render() {
        return(
         <div id={this.paperWrapperId} className="editor-paper" style={{ width: `${this.props.width}px`, height: `${this.props.height}px` }}>
            <div id={this.paperId}></div>
        </div>);
    }
}

export default Editor;
