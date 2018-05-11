import React from 'react';

import Preview from '../molecules/Preview/Preview.jsx';
import FrontPageActions from '../molecules/FrontPageActions/FrontPageActions.jsx';
import KeyPoints from '../molecules/KeyPoints/KeyPoints.jsx';

import ed from '../../../img/exampleDiagram.png';
const keyPointData= [
    {
        header: "Risk assessment",
        text: "CORAS supports risk analysis by providing a stepwise method helping you all the way from defining goals for the analysis, through identifying assets and risks to defining probabilities and mitigations for the discovered risks. The CORAS method can be used for any problem domain from small projects to large enterprise endeavors.", 
        link: "/about#risk-assessment"
    },
    {
        header: "Risk modelling",
        text: "The CORAS modelling language is an easy-to-use graphical modelling language that can be translated into text descriptions. The language consists of threats, vulnerabilities, incidents and assets, and the relations between these. CORAS is well suited to create a graphical representation of a threat scenario, to be used for discussion and mitigation.",
        link: "/about#modelling"
    },
    {
        header: "Tool support",
        text: "The method and language is supported by several accessible and easy-to-use tools. You can try the online editor on this page, or download stencils for Microsoft Visio. There is also a windows GUI for creating CORAS diagrams. The approach is described and explained in several published articles, in addition to a text book explaining risk assessment in general, and CORAS in particular.",
        link: "/try-it"
    }
]

const Frontpage = (props) =>
    <div>
        <Preview imageUrl={ed} tagLine={"CORAS - A risk modeling approach"}/>
        <FrontPageActions
            leftLink={{ path: '/introduction', text: "Learn CORAS" }}
            rightLink={{ path: '/try-it', text: "Try CORAS" }} />
        <KeyPoints keyPoints={keyPointData} />
    </div>;

export default Frontpage;