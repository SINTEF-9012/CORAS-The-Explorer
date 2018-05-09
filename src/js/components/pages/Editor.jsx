import React from 'react';

import joint from 'jointjs';
import "../../../../node_modules/jointjs/dist/joint.css";

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
            width: document.getElementById('paper-holder-wrapper').offsetWidth,
            height: document.getElementById('paper-holder-wrapper').offsetHeight,
            gridSize: 10,
            drawGrid: true,
            background: {
                color: 'rgba(0, 255, 0, 0.3)'
            }
        });

        window.addEventListener('resize', this.updatePaperSize);
        this.paper.on('element:pointerdblclick', this.removeElement);
        this.paper.on('link:pointerdblclick', this.removeElement);
        this.paper.on('element:contextmenu', this.addLink);
        this.paper.on('blank:contextmenu', this.addElement);
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
            document.getElementById('paper-holder-wrapper').offsetWidth,
            document.getElementById('paper-holder-wrapper').offsetHeight);
    }

    render() {
        return(
        <div>
            <div id="paper-holder-wrapper">
                <div id="paper-holder"></div>
            </div>
            <ToolChain onClickFn={this.addElement} />
        </div>);
    }
}

const ToolChain = ({ onClickFn }) =>
    <div>
        <button onClick={onClickFn} label="Add box">Add box</button>
    </div>;

export default Editor;
