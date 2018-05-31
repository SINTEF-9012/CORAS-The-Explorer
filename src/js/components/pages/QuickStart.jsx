import React, { Component } from 'react';

import ProgressionBox from '../atoms/ProgressionBox/ProgressionBox';
import Editor from '../molecules/Editor/Editor';
import Heading from '../atoms/Heading/Heading';

import './QuickStart/quickstart.css';

const qsSteps = [
    {
        shortTitle: "What is CORAS",
        title: "What is CORAS",
        content: [
            {
                type: "text",
                content: "This is where we explain the concept"
            },
            {
                type: "text",
                content: "In multiple paragraphs"
            },
            {
                type: "image",
                src: "https://placekitten.com/600/400",
            }
        ]
    },
    {
        shortTitle: "Preparation",
        title: "Preparation for Analysis",
        content: [
            {
                type: "text",
                content: "DYnamically done"
            },
            {
                type: "image",
                src: "https://placekitten.com/800/200",
            },
            {
                type: "text",
                content: "Multimedial"
            }
        ]
    },
    {
        shortTitle: "Customer presentation",
        title: "Customer presentation of the target description",
        content: [
            {
                type: "text",
                content: "We can also show uneditable sample diagrams"
            },
            {
                type: "diagram",
                diagram: exampleDiagram,
                width: 300,
                height: 200
            },
            {
                type: "text",
                content: "And we can continue to mix it with images and other stuff. Videos are not implemented, but will be quite trivial"
            },
            {
                type: "image",
                src: "https://placekitten.com/1000/500"
            }
        ]
    },
    {
        shortTitle: "Refine",
        title: "Refine target description"
    },
    {
        shortTitle: "Approval",
        title: "Approval of target description"
    },
    {
        shortTitle: "Risk identification",
        title: "Risk identification"
    },
    {
        shortTitle: "Risk estimation",
        title: "Risk estimation"
    },
    {
        shortTitle: "Risk evaluation",
        title: "Risk evaluation"
    },
    {
        shortTitle: "Risk treatment",
        title: "Risk treatment"
    }
];

class QuickStart extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showEditor: false
        }
    }
    render() {
        return (
            <div>
                <ProgressionBox
                    stepid={parseInt(this.props.match.params.step) < qsSteps.length ? parseInt(this.props.match.params.step) : 0}
                    steps={qsSteps}
                    rootPath={this.props.match.path.split("/")[1]} />
                <div className="quickstart-content-section">   
                    <SectionTitle step={parseInt(this.props.match.params.step) || 0} title={qsSteps[parseInt(this.props.match.params.step || 0)].title} />
                    <SectionContent content={qsSteps[parseInt(this.props.match.params.step) || 0].content || []} />
                </div>
                {this.state.showEditor ?
                <div className="lightbox" onClick={(e) => {
                    e.stopPropagation();
                    this.setState({ showEditor: false});
                }}>
                    <div className="lightbox__content" onClick={(e) => e.stopPropagation()}>
                    <Editor initialDiagram={exampleDiagram}/>
                    </div>
                </div> : null}
                <div className="show-editor-button">
                    <button className="show-editor-button__button" onClick={(e) => this.setState({ showEditor: true })}>Show editor</button>
                </div>
            </div>
        )
    }
}

const SectionTitle = ({ step, title }) =>
    <div className="quicstart-section-title">
        <div className="quickstart-section-title__pre">
            <Heading level={4} text={`Step ${step}`} withMargin={false} />
        </div>
        <div className="quickstart-section-title__title">
            <Heading level={2} text={title} />
        </div>
    </div>;

const SectionContent = ({ content }) =>
    <div>
        {content.map((element, index) => {
            switch(element.type) {
                case "text":
                return <p key={index} >{element.content}</p>;

                case "image":
                return <img key={index} src={element.src} />;

                case "diagram":
                return <Editor key={index} initialDiagram={element.diagram} interactive={false} width={element.width} height={element.height} />;
        }})}
    </div>;

export default QuickStart;


const exampleDiagram = JSON.parse('{"cells":[{"type":"standard.Rectangle","position":{"x":890,"y":370},"size":{"width":100,"height":40},"angle":0,"id":"0290b78d-52ed-43e7-8812-fe65304df53d","z":1,"attrs":{"body":{"fill":"blue"},"label":{"fill":"white","text":"New Box"}}},{"type":"standard.Rectangle","position":{"x":600,"y":530},"size":{"width":100,"height":40},"angle":0,"id":"30567281-286a-4823-93c1-1c6c2de5ed00","z":2,"attrs":{"body":{"fill":"blue"},"label":{"fill":"white","text":"New Box"}}},{"type":"standard.Rectangle","position":{"x":390,"y":340},"size":{"width":100,"height":40},"angle":0,"id":"652143ed-03b1-4ce2-b493-a2a49da12768","z":3,"attrs":{"body":{"fill":"blue"},"label":{"fill":"white","text":"New Box"}}},{"type":"standard.Rectangle","position":{"x":680,"y":170},"size":{"width":100,"height":40},"angle":0,"id":"8d830968-1d1e-40f0-b72c-30750ec8c0d7","z":4,"attrs":{"body":{"fill":"blue"},"label":{"fill":"white","text":"New Box"}}},{"type":"standard.Rectangle","position":{"x":450,"y":100},"size":{"width":100,"height":40},"angle":0,"id":"57403a38-2689-4309-a91d-11f7cfe510f1","z":5,"attrs":{"body":{"fill":"blue"},"label":{"fill":"white","text":"New Box"}}},{"type":"standard.Rectangle","position":{"x":200,"y":220},"size":{"width":100,"height":40},"angle":0,"id":"83e255b5-847b-462c-acc0-5c56481e3fbc","z":6,"attrs":{"body":{"fill":"blue"},"label":{"fill":"white","text":"New Box"}}},{"type":"standard.Link","source":{"id":"83e255b5-847b-462c-acc0-5c56481e3fbc"},"target":{"id":"652143ed-03b1-4ce2-b493-a2a49da12768"},"id":"2f3bd531-223f-4248-908a-466ab2bfbaa4","z":7,"attrs":{}},{"type":"standard.Link","source":{"id":"652143ed-03b1-4ce2-b493-a2a49da12768"},"target":{"id":"57403a38-2689-4309-a91d-11f7cfe510f1"},"id":"9ef4a0e1-d41d-4451-a402-77d3b8bf04aa","z":8,"attrs":{}},{"type":"standard.Link","source":{"id":"57403a38-2689-4309-a91d-11f7cfe510f1"},"target":{"id":"8d830968-1d1e-40f0-b72c-30750ec8c0d7"},"id":"c1ca305c-08a6-4bb3-91c2-5b3dfe3b4db7","z":9,"attrs":{}},{"type":"standard.Link","source":{"id":"8d830968-1d1e-40f0-b72c-30750ec8c0d7"},"target":{"id":"652143ed-03b1-4ce2-b493-a2a49da12768"},"id":"37f8cebe-92d6-47a5-8eb1-c12de12a62ff","z":10,"attrs":{}},{"type":"standard.Link","source":{"id":"652143ed-03b1-4ce2-b493-a2a49da12768"},"target":{"id":"30567281-286a-4823-93c1-1c6c2de5ed00"},"id":"eb688e41-9f74-42d3-86f6-486260245aeb","z":11,"attrs":{}},{"type":"standard.Link","source":{"id":"652143ed-03b1-4ce2-b493-a2a49da12768"},"target":{"id":"0290b78d-52ed-43e7-8812-fe65304df53d"},"id":"f23dfc8a-cec6-4a18-994f-f10a3c5bad1b","z":12,"attrs":{}}]}');
