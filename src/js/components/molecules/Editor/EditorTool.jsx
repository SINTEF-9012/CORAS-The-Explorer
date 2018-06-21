import React from 'react';
import joint from 'jointjs';
import { connect } from 'react-redux';
import { ToolElementClicked } from '../../../store/Actions';

class EditorTool extends React.Component {
    constructor(props) {
        super(props);
        
        this.toolGraph = new joint.dia.Graph();
    }

    componentDidMount() {
        this.toolPaper = new joint.dia.Paper({
            el: document.getElementById("tool-paper"),
            model: this.toolGraph,
            width: document.getElementById("tool-paper").offsetWidth - 10,
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

        this.toolGraph.addCell([asset, risk, stakeholder, threathumanaccidental, threathumandeliberate, threatnonhuman, treatment, unwantedincident, vulnerability]);

        this.toolPaper.on('cell:pointerdown', (elementView) => this.props.beginMoveElement(elementView.model.clone()));
    }

    render() {
        return (<div className="editor-toolbox">
            <div id="tool-paper"></div>
        </div>);
    }
}

export default connect((state) => ({}), (dispatch) => ({
    beginMoveElement: (element) => dispatch(ToolElementClicked(element))
}))(EditorTool);
