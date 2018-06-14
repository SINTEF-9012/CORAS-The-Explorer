import joint from 'jointjs';

const editorHandlers = [
    function initializeEditorHandlers() {
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

            this.paper.on('cell:mousewheel', this.handleScroll);
            this.paper.on('blank:mousewheel', this.handleScrollBlank);
        
            this.paper.on('blank:pointerdown', this.beginMovePaper);
            this.paper.on('blank:pointermove', this.movePaper);
            this.paper.on('blank:pointerup', this.endMovePaper);
        }
    },

    function handleScroll(cellView, e, x, y, delta) {
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
    },

    function handleScrollBlank(e, x, y, delta) {
        this.handleScroll(null, e, x, y, delta);
    },

    function beginMovePaper(e, x, y) {
        this.setState({ paperMove: { moving: true, x, y } });
    },

    function movePaper(e, x, y) {
        if(this.state.paperMove.moving) {
            const { tx, ty } = this.paper.translate();
            this.paper.translate(tx + (x - this.state.paperMove.x), ty + (y - this.state.paperMove.y));
        }
    },
    
    function endMovePaper(e, x, y) {
        this.setState({ paperMove: {moving: false}})
    },

    function updatePaperSize() {
        this.paper.setDimensions(
            document.getElementById(this.paperWrapperId).offsetWidth-10,
            document.getElementById(this.paperWrapperId).offsetHeight-10);
    },

    function addLink(elementView, e, x, y) {
        if(!this.state.link) {
            // Start of link creation
            this.setState({ link: new joint.shapes.standard.Link() });
            this.state.link.source(elementView.model);
        } else {
            // End of link creation
            this.state.link.target(elementView.model);
            this.state.link.addTo(this.graph);
            this.setState({ link: null });
        }
    }
]

export default editorHandlers