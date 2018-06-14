import joint from 'jointjs';
import AddCorasShapes from './CORASShapes.js';

AddCorasShapes(joint);

const toolHandlers = [
    function initializeToolHandlers() {
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
    },
    function dragElementToView(elementView, event, x, y) {
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
]

export default toolHandlers;