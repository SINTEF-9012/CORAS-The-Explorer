import joint from 'jointjs';

const toolHandlers = [
    function initializeToolHandlers() {
        this.toolPaper = new joint.dia.Paper({
            el: document.getElementById("tool-paper"),
            model: this.toolGraph,
            height: 60,
            interactive: false
        });

        let rect = new joint.shapes.standard.Rectangle();
        rect.attr({
            position: {
                x: 10,
                y: 10
            },
            body: {
                fill: 'blue'
            },
            label: {
                text: 'New Box',
                fill: 'white'
            }
        });
        rect.resize(100, 40);
        
        rect.addTo(this.toolGraph);
        
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
        flyShape.resize(100, 40);
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
                const s = flyShape.clone();
                s.position(x - target.left - offset.x, y - target.top - offset.y);
                this.graph.addCell(s);
            }
            body.removeChild(flyPaperElem)
            body.removeEventListener('mousemove', mousemoveFn);
        }, { once: true });
    }
]

export default toolHandlers;