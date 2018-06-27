function AddCorasShapes(joint) {
    joint.dia.Element.define("coras.unboxedElement", {
        "attrs": {
            "text": {
                text: "Asset",
                refX: "50%",
                refY: "100%",
                textAnchor: "middle",
                textVerticalAnchor: "bottom"
            },
        }
    }, {
        "markup": [
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
    joint.dia.Element.define("coras.ellipseElement", {
        "attrs": {
            "body": {
                "refCx": "50%",
                "refCy": "50%",
                "refRx": "50%",
                "refRy": "50%",
                "fill": "#fff",
                "stroke": "#000"
            },
            "text": {
                "refX": "50%",
                "refY": "50%",
                "textVerticalAnchor": 'middle',
                "textAnchor": 'middle'
            },
            "icon": {
                "refWidth": "40%",
                "refHeight": "40%",
                "refX": "30%",
                "refY": "-25%",
            }
        }
    }, {
        "markup": [
            {
                "tagName": "ellipse",
                "selector": "body"
            },
            {
                "tagName": "image",
                "selector": "icon"
            },
            {
                "tagName": "text",
                "selector": "text"
            }
        ]
    });
    joint.dia.Element.define("coras.unwantedincident", {
        attrs: {
            body: {
                refX: "0",
                refY: "0",
                refWidth: "100%",
                refHeight: "100%",
                fill: "#FFF",
                stroke: "#000"
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
                tagName: "image",
                selector: "icon"
            },
            {
                tagName: "text",
                selector: "text"
            }
        ]
    });
}

export default AddCorasShapes;
