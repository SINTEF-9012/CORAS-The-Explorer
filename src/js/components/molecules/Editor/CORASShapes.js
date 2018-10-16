function AddCorasShapes(joint) {
    joint.dia.Element.define("coras.unboxedElement", {
        attrs: {
            linkHandler: {
                refWidth: "225%",
                refHeight: "100%",
                fill: "#FFF",
                refX: "-75%",
                refY: "0",
                magnet: true
            },
            text: {
                text: "Asset",
                refX: "50%",
                refY: "100%",
                textAnchor: "middle",
                textVerticalAnchor: "bottom"
            },
        }
    }, {
        markup: [
            {
                tagName: "rect",
                selector: "linkHandler"
            },
            {
                tagName: "image",
                selector: "icon",
            },
            {
                tagName: "text",
                selector: "text"
            }
        ]
    });
    joint.dia.Element.define("coras.ellipseElement", {
        attrs: {
            body: {
                refCx: "50%",
                refCy: "50%",
                refRx: "50%",
                refRy: "50%",
                fill: "#fff",
                stroke: "#000",
                magnet: true
            },
            innerBody: {
                refCx: "50%",
                refCy: "50%",
                refRx: "45%",
                refRy: "45%",
                fill: "#FFF",
            },
            text: {
                refX: "50%",
                refY: "50%",
                textVerticalAnchor: 'middle',
                textAnchor: 'middle'
            },
            icon: {
                refWidth: "40%",
                refHeight: "40%",
                refX: "30%",
                refY: "-25%",
            }
        }
    }, {
        markup: [
            {
                tagName: "ellipse",
                selector: "body"
            },
            {
                tagName: "ellipse",
                selector: "innerBody"
            },
            {
                tagName: "image",
                selector: "icon"
            },
            {
                tagName: "text",
                selector: "text"
            }
        ]
    });
    joint.dia.Element.define("coras.rectElement", {
        attrs: {
            body: {
                refX: "0",
                refY: "0",
                refWidth: "100%",
                refHeight: "100%",
                fill: "#FFF",
                stroke: "#000",
                magnet: true
            },
            innerBody: {
                refX: "5%",
                refY: "5%",
                refWidth: "90%",
                refHeight: "90%",
                fill: "#FFF"
            },
            icon: {
                refWidth: "50%",
                refHeight: "50%",
                refX: "75%",
                refY: "-25%"
            },
            text: {
                refX: "50%",
                refY: "50%",
                textVerticalAnchor: "middle",
                textAnchor: "middle"
            }
        }
    }, {
        markup: [
            {
                tagName: "rect",
                selector: "body"
            },
            {
                tagName: "rect",
                selector: "innerBody"
            },
            {
                tagName: "image",
                selector: "icon"
            },
            {
                tagName: "text",
                selector: "text"
            }
        ]
    });
    joint.dia.Link.define('coras.link', {
        defaultLabel: {
            attrs: {
                text: { text: '*' },
                '.connection': { stroke: '#000000', 'stroke-width': 2 }
            }
        }
    });
}

export default AddCorasShapes;
