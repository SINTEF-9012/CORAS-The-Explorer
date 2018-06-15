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
            this.paper.on('link:contextmenu', this.removeLink);
            this.paper.on('cell:pointerdblclick', this.edit);

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
    },

    function removeLink(elementView, e, x, y) {
        if(!this.state.linkToRemove) this.setState({ linkToRemove: elementView });
        else if(this.state.linkToRemove === elementView) {
            this.setState({ linkToRemove: null });
            elementView.model.remove();
        } else this.setState({ linkToRemove: null });
    },

    function edit(elementView, e, x, y) {
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
    },

    function editText(elementView, e, x, y) {
        const body = document.getElementsByTagName("body")[0];
        const inputBox = document.createElement("input");
        inputBox.id = x.toString();
        
        const target = this.paper.$el.offset();
        const elemPos = elementView.model.position ? elementView.model.position() : {x, y};
        inputBox.type = "text";
        inputBox.style.cssText = `position: absolute; top: ${elemPos.y + target.top + 30}px; left: ${elemPos.x + target.left}px;`;

        body.appendChild(inputBox);

        function keyHandler(e) {
            if(e.keyCode === 13) {
                if(elementView.model.isLink()) elementView.model.insertLabel(0, { attrs: { text: { text: inputBox.value } } });
                else elementView.model.attr('text/text', inputBox.value);
                body.removeChild(inputBox);
                body.removeEventListener('keyup', keyHandler);
            }
        }

        body.addEventListener('keyup', keyHandler)
    }
]

export default editorHandlers