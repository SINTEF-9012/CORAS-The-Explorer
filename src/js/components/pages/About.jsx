import React from 'react';

import PageHeading from '../atoms/PageHeading/PageHeading';

const About = (props) =>
    <div className="about-page">
        <PageHeading title={"About CORAS"} />
        <p>
            The CORAS language is a graphical modelling language for communication, documentation and analysis of security threat and risk scenarios in security risk analyses. The language is an integral part of the CORAS method, which is based on the use of structured brainstorming. In these brainstorming sessions, the CORAS language is applied for making models of threat scenarios and risks on the fly. Such brainstorming sessions are characterized by the involvement of people with thorough knowledge of specific, but only partly overlapping aspects, of the target of analysis. Typical participants are the intended users of the target, its designers, developers, and relevant decision makers. These people normally have quite different backgrounds and it may be difficult for the analysts to make them work well together as a group. The CORAS language improves both the efficiency of the analysis process and the quality of the results.
        </p>
        <p>
            We claim that our graphical approach to security risk modelling contributes to solving three issues related to security risk analysis:
        </p>
        <p>
            How to facilitate communication in a group consisting of people with different backgrounds and competences: Our aim has been to provide the participants with a means of communication that covers both technical and more high-level information, without being too complicated to understand. Offering a common basis for communication reduces misunderstandings and thereby gives a more correct risk picture.
            How to estimate the likelihoods and consequences of identified risks: In practice, reliable data on which this can be based is often not available. The participants must use their expert knowledge, experience and familiarity with the domain to estimate both the likelihoods and the consequences of incidents that might not have happened yet. Our aim has been to offer a structured, graphical risk picture to make the complexity more manageable. A graphical representation may illustrate who or what caused the incidents and the weaknesses in the system that made them possible.
            How to document the security analysis in a comprehensible manner: The findings of a security risk analysis constitute vital information not only to the participants in the analysis, but also to the organization as a whole. Our aim has been to define a documentation method that should be more or less self-explanatory, and not rely on extensive training to be understood.
            The language was originally defined as a UML profile, which became part of the "UML Profile for Modeling Quality of Service and Fault Tolerance Characteristics and Mechanisms Specification" standardised by the Object Management Group (OMG). The language has since then been developed into a specialized language (domain specific language) through several iterations with feedback from industrial case studies, teaching and empirical investigations.
        </p>
    </div>;
export default About;
