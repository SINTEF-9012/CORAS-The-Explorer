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
            this.paper.scale(currentScale.sx*scaleFactor, currentScale.sy*scaleFactor);
        } else if (delta < 0){
            this.paper.scale(currentScale.sx/scaleFactor, currentScale.sy/scaleFactor);
        }
    }

    handleScrollBlank(e, x, y, delta) {
        this.handleScroll(null, e, x, y, delta);
    }

    componentDidMount() {
        this.paper = new joint.dia.Paper({
            el: document.getElementById(this.paperId),
            model: this.graph,
            width: document.getElementById(this.paperWrapperId).offsetWidth,
            height: document.getElementById(this.paperWrapperId).offsetHeight,
            gridSize: 1,
            background: {
                color: 'rgba(255, 255, 255, 1)',
            },
            interactive: this.props.interactive === undefined ? true : this.props.interactive
        });

        //this.paper.$el.css('pointer-events', 'none');

        if(this.props.initialDiagram) {
            // We have an initial diagram
            this.graph.fromJSON(this.props.initialDiagram);
        }
        
        window.addEventListener('resize', this.updatePaperSize);
        

        if(this.props.interactive === undefined ? true : this.props.interactive) {
            this.paper.on('element:pointerdblclick', this.removeElement);
            this.paper.on('link:pointerdblclick', this.removeElement);
            this.paper.on('element:contextmenu', this.addLink);
            this.paper.on('blank:contextmenu', this.addElement);
            this.paper.on('cell:mousewheel', this.handleScroll);
            this.paper.on('blank:mousewheel', this.handleScrollBlank);
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
