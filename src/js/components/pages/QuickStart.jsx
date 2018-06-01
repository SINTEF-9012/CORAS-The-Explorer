import React, { Component } from 'react';

import ProgressionBox from '../atoms/ProgressionBox/ProgressionBox';
import Editor from '../molecules/Editor/Editor';
import Heading from '../atoms/Heading/Heading';

import './QuickStart/quickstart.css';
import stepImg from '../../../img/steps.jpg';

const exampleDiagram2 = JSON.parse('{"cells":[{"type":"standard.Rectangle","position":{"x":81,"y":63},"size":{"width":100,"height":40},"angle":0,"id":"0ae97a39-fcf6-4d86-9d55-5104c853d150","z":1,"attrs":{"body":{"fill":"blue"},"label":{"fill":"white","text":"New Box"}}},{"type":"standard.Rectangle","position":{"x":331,"y":193},"size":{"width":100,"height":40},"angle":0,"id":"29dbaf56-a449-4725-86a4-b963182c33af","z":2,"attrs":{"body":{"fill":"blue"},"label":{"fill":"white","text":"New Box"}}},{"type":"standard.Rectangle","position":{"x":474,"y":71},"size":{"width":100,"height":40},"angle":0,"id":"213f5b43-4a9f-4b3d-9044-956ef85904ec","z":3,"attrs":{"body":{"fill":"blue"},"label":{"fill":"white","text":"New Box"}}},{"type":"standard.Rectangle","position":{"x":274,"y":85},"size":{"width":100,"height":40},"angle":0,"id":"97b72ec2-e0c8-4de8-8268-14422d2b2aae","z":4,"attrs":{"body":{"fill":"blue"},"label":{"fill":"white","text":"New Box"}}},{"type":"standard.Rectangle","position":{"x":145,"y":197},"size":{"width":100,"height":40},"angle":0,"id":"994a7305-da11-4644-8010-f386611c3027","z":5,"attrs":{"body":{"fill":"blue"},"label":{"fill":"white","text":"New Box"}}},{"type":"standard.Link","source":{"id":"0ae97a39-fcf6-4d86-9d55-5104c853d150"},"target":{"id":"97b72ec2-e0c8-4de8-8268-14422d2b2aae"},"id":"f3cbc981-669d-4a4a-9eed-c9da7482cdcb","z":6,"attrs":{}},{"type":"standard.Link","source":{"id":"994a7305-da11-4644-8010-f386611c3027"},"target":{"id":"97b72ec2-e0c8-4de8-8268-14422d2b2aae"},"id":"2007f006-1cd5-4c00-9eaa-9e551ed7c986","z":7,"attrs":{}},{"type":"standard.Link","source":{"id":"97b72ec2-e0c8-4de8-8268-14422d2b2aae"},"target":{"id":"29dbaf56-a449-4725-86a4-b963182c33af"},"id":"344a8fd0-9e44-4cd1-90f8-e021a92202c8","z":8,"attrs":{}},{"type":"standard.Link","source":{"id":"97b72ec2-e0c8-4de8-8268-14422d2b2aae"},"target":{"id":"213f5b43-4a9f-4b3d-9044-956ef85904ec"},"id":"2bc958f7-b8ad-4051-a564-47c772022f92","z":9,"attrs":{}}]}');

const qsSteps = [
    {
        shortTitle: "What is CORAS",
        title: "What is CORAS",
        content: [
            {
                type: "text",
                content: "Have you ever asked yourself some of the following questions."
            },
            {
                type: "unorderedList",
                list: [
                    "Should I worry when using my credit card on the Internet?",
                    "How safe is my Internet bank account?",
                    "How many doctors or healthcare personnel have access to my personal health records?",
                    "Can I be sure that I am the only one reading my e-mail?",
                    "How crucial can a single personal mistake be for my company?"
                ]
            },
            {
                type: "text",
                content: "A security risk analysis may provide answers to such questions. CORAS is a method for conducting security risk analysis. CORAS provides a customised language for threat and risk modelling, and comes with detailed guidelines explaining how the language should be used to capture and model relevant information during the various stages of the security analysis. In this respect CORAS is model-based. The Unified Modelling Language (UML) is typically used to model the target of the analysis. For documenting intermediate results, and for presenting the overall conclusions we use special CORAS diagrams which are inspired by UML. The CORAS method provides a computerised tool designed to support documenting, maintaining and reporting analysis results through risk modelling."
            },
            {
                type: "text",
                content: "In the CORAS method a security risk analysis is conducted in eight steps:"
            },
            {
                type: "image",
                src: stepImg,
            },
            {
                type: "text",
                content: "We will go throught these steps in the rest of this tutorial"
            }
        ]
    },
    {
        shortTitle: "Preparation",
        title: "Preparation for Analysis",
        content: [
            {
                type: "text",
                content: `The first step is the initial
                preparations for a risk analysis. The main objective is to
                get a basic idea about what is to be the target and what
                will be the size of the analysis such that we can make the
                necessary preparations for the actual analysis tasks.`
            },
            {
                type: "image",
                src: "https://placekitten.com/800/200",
            }
        ]
    },
    {
        shortTitle: "Customer presentation",
        title: "Customer presentation of the target description",
        content: [
            {
                type: "text",
                content: `The second step is the introductory
                meeting with the customer on the behalf of which the
                analysis is conducted. The main item on the agenda for
                this meeting is to get the representatives of the customer
                to present their overall goals of the analysis and the
                target they wish to have analysed.`
            },
            {
                type: "image",
                src: "https://placekitten.com/1000/500"
            },
            {
                type: "text",
                content: `The objective is to
                achieve a common initial understanding of the target of
                analysis, and of what the parties of the analysis are most
                concerned about. The overall goals of the analysis are put
                forward, the focus and scope of the analysis are set, and
                the rest of the analysis is planned.`
            }
        ]
    },
    {
        shortTitle: "Refine",
        title: "Refine target description",
        content: [
            {
                type: "text",
                content: `The thirds step aims to ensure a common
                understanding of the target of analysis, including its
                focus, scope and main assets. The analysis team presents
                their understanding of what they learned at the first
                meeting and from studying documentation that has been made
                available to them by the customer. Based on interaction
                with the customer, the analysis team will also identify
                the main assets to be protected.`
            },
            {
                type: "image",
                src: "https://placekitten.com/750/300"
            },
            {
                type: "text",
                content: `The analysis team
                furthermore conducts a rough, high-level analysis to
                identify major threat scenarios, vulnerabilities and
                enterprise level risks that should be investigated
                further. The outcome of Step 3 is a refined and more
                detailed understanding of the target description and the
                objectives of the analysis, which at this point are
                documented by the analysts.`
            }
        ]
    },
    {
        shortTitle: "Approval",
        title: "Approval of target description",
        content: [
            {
                type: "text",
                content: `The fourth step aims to ensure that the
                background documentation for the rest of the analysis,
                including the target, focus and scope is correct and
                complete as seen by the customer. The step involves
                presenting a more refined description of the target to be
                analysed, including assumptions and preconditions being
                made. Typically, the analysts describe the target using a
                formal or semi-formal notation such as the UML. Before the
                actual risk analysis starts at the next step of the
                analysis process, the description of the target should be
                approved by the customer. Step 4 furthermore includes
                deciding the risk evaluation criteria for each asset. This
                analysis step concludes the context establishment.`
            },
            {
                type: "image",
                src: "https://placekitten.com/900/450"
            }
        ]
    },
    {
        shortTitle: "Risk identification",
        title: "Risk identification",
        content: [
            {
                type: "text",
                content: `The fifth step is the risk
                identification. To identify risks, CORAS makes use of
                structured brainstorming. Structured brainstorming is a
                step-by-step walkthrough of the target of analysis and is
                carried out as a workshop led by the analysts. The main
                idea of structured brainstorming is that since the
                workshop participants represent different competences,
                backgrounds and interests, they will view the target from
                different perspectives and consequently identify more, and
                possibly other, risks than individuals or a more
                homogeneous group would have managed.`
            },
            {
                type: "diagram",
                diagram: exampleDiagram2,
                width: 600,
                height: 300
            },
            {
                type: "text",
                content: `The risk
                identification involves a systematic identification of
                threats, unwanted incidents, threat scenarios and
                vulnerabilities with respect to the identified assets. The
                activities are supported by the CORAS language, and the
                results are documented on-the-fly by means of CORAS threat
                diagrams.`
            }
        ]
    },
    {
        shortTitle: "Risk estimation",
        title: "Risk estimation",
        content: [
            {
                type: "image",
                src: "https://placekitten.com/1000/75"
            },
            {
                type: "text",
                content: `The sixth step aims to determine the
                risk level of the risks that are represented by the
                identified unwanted incidents. The unwanted incidents were
                documented in threat diagrams during Step 5, and these
                diagrams serve as the basis for the risk estimation. Step
                6 is conducted as a brainstorming involving personnel with
                various backgrounds, and basically involves the estimation
                of the likelihoods and consequences of the unwanted
                incidents. These values in combination yield the risk
                level for each of the identified risks. The CORAS threat
                diagrams facilitate the likelihood estimation by
                supporting the estimation of the likelihood for threats
                and threat scenarios to cause the unwanted incidents.`
            }
        ]
    },
    {
        shortTitle: "Risk evaluation",
        title: "Risk evaluation",
        content: [
            {
                type: "text",
                content: `The seventh step aims to decide which
                of the identified risks are acceptable, and which of the
                risks must be further evaluated for possible
                treatment. Whether or not the risks are acceptable is
                determined by using the already defined risk evaluation
                criteria and the results of the risk estimation. Step 7
                furthermore involves estimating and evaluating risks with
                respect to indirect assets.`
            },
            {
                type: "image",
                src: "https://placekitten.com/450/200"
            },
            {
                type: "image",
                src: "https://placekitten.com/450/400"
            }
        ]
    },
    {
        shortTitle: "Risk treatment",
        title: "Risk treatment",
        content: [
             {
                 type: "image",
                 src: "https://placekitten.com/g/700/400"
             },
             {
                 type: "text",
                 content: `The eighth step is concerned with the
                 identification and analysis of treatments. The risks that
                 are found to be unacceptable are evaluated to find means
                 to reduce them. A treatment should contribute to reduced
                 likelihood and/or consequence of an unwanted
                 incident. Since treatments can be costly, they are
                 assessed with respect to their cost-benefit, before a
                 final treatment plan is made.`
             },
             {
                 type: "image",
                 src: "https://placekitten.com/700/800"
             }
        ]
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
                        <Editor initialDiagram={exampleDiagram} interactive={true} paperId="overlay-editor" />
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
                return <Editor
                        key={index}
                        initialDiagram={element.diagram}
                        interactive={false}
                        width={element.width}
                        height={element.height} />;
                
                case "unorderedList":
                return <ul key={index}>{element.list.map((item, index2) => <li key={index2}>{item}</li>)}</ul>;
        }})}
    </div>;

export default QuickStart;


const exampleDiagram = JSON.parse('{"cells":[{"type":"standard.Rectangle","position":{"x":890,"y":370},"size":{"width":100,"height":40},"angle":0,"id":"0290b78d-52ed-43e7-8812-fe65304df53d","z":1,"attrs":{"body":{"fill":"blue"},"label":{"fill":"white","text":"New Box"}}},{"type":"standard.Rectangle","position":{"x":600,"y":530},"size":{"width":100,"height":40},"angle":0,"id":"30567281-286a-4823-93c1-1c6c2de5ed00","z":2,"attrs":{"body":{"fill":"blue"},"label":{"fill":"white","text":"New Box"}}},{"type":"standard.Rectangle","position":{"x":390,"y":340},"size":{"width":100,"height":40},"angle":0,"id":"652143ed-03b1-4ce2-b493-a2a49da12768","z":3,"attrs":{"body":{"fill":"blue"},"label":{"fill":"white","text":"New Box"}}},{"type":"standard.Rectangle","position":{"x":680,"y":170},"size":{"width":100,"height":40},"angle":0,"id":"8d830968-1d1e-40f0-b72c-30750ec8c0d7","z":4,"attrs":{"body":{"fill":"blue"},"label":{"fill":"white","text":"New Box"}}},{"type":"standard.Rectangle","position":{"x":450,"y":100},"size":{"width":100,"height":40},"angle":0,"id":"57403a38-2689-4309-a91d-11f7cfe510f1","z":5,"attrs":{"body":{"fill":"blue"},"label":{"fill":"white","text":"New Box"}}},{"type":"standard.Rectangle","position":{"x":200,"y":220},"size":{"width":100,"height":40},"angle":0,"id":"83e255b5-847b-462c-acc0-5c56481e3fbc","z":6,"attrs":{"body":{"fill":"blue"},"label":{"fill":"white","text":"New Box"}}},{"type":"standard.Link","source":{"id":"83e255b5-847b-462c-acc0-5c56481e3fbc"},"target":{"id":"652143ed-03b1-4ce2-b493-a2a49da12768"},"id":"2f3bd531-223f-4248-908a-466ab2bfbaa4","z":7,"attrs":{}},{"type":"standard.Link","source":{"id":"652143ed-03b1-4ce2-b493-a2a49da12768"},"target":{"id":"57403a38-2689-4309-a91d-11f7cfe510f1"},"id":"9ef4a0e1-d41d-4451-a402-77d3b8bf04aa","z":8,"attrs":{}},{"type":"standard.Link","source":{"id":"57403a38-2689-4309-a91d-11f7cfe510f1"},"target":{"id":"8d830968-1d1e-40f0-b72c-30750ec8c0d7"},"id":"c1ca305c-08a6-4bb3-91c2-5b3dfe3b4db7","z":9,"attrs":{}},{"type":"standard.Link","source":{"id":"8d830968-1d1e-40f0-b72c-30750ec8c0d7"},"target":{"id":"652143ed-03b1-4ce2-b493-a2a49da12768"},"id":"37f8cebe-92d6-47a5-8eb1-c12de12a62ff","z":10,"attrs":{}},{"type":"standard.Link","source":{"id":"652143ed-03b1-4ce2-b493-a2a49da12768"},"target":{"id":"30567281-286a-4823-93c1-1c6c2de5ed00"},"id":"eb688e41-9f74-42d3-86f6-486260245aeb","z":11,"attrs":{}},{"type":"standard.Link","source":{"id":"652143ed-03b1-4ce2-b493-a2a49da12768"},"target":{"id":"0290b78d-52ed-43e7-8812-fe65304df53d"},"id":"f23dfc8a-cec6-4a18-994f-f10a3c5bad1b","z":12,"attrs":{}}]}');
