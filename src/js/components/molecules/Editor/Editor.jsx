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

        this.state = {
            currentLink: null
        }
    }

    componentDidMount() {
        this.paper = new joint.dia.Paper({
            el: document.getElementById('paper-holder'),
            model: this.graph,
            width: this.props.width || document.getElementById('paper-holder-wrapper').offsetWidth,
            height: this.props.height || document.getElementById('paper-holder-wrapper').offsetHeight,
            gridSize: 1,
            background: {
                color: 'rgba(255, 255, 255, 1)',
            },
            interactive: this.props.interactive === undefined ? true : this.props.interactive
        });

        this.paper.$el.css('pointer-events', 'none');

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
        }
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
            this.props.width ||document.getElementById('paper-holder-wrapper').offsetWidth,
            this.props.height || document.getElementById('paper-holder-wrapper').offsetHeight);
    }

    render() {
        return(
         <div id="paper-holder-wrapper">
                <div id="paper-holder"></div>
            </div>);
    }
}

export default Editor;
