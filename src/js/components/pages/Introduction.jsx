import React from 'react';

import stepImg from '../../../img/steps.jpg';

const Introduction = (props) =>
    <div class="introduction-page">
        <p>
            Have you ever asked yourself some of the following questions.
        </p>
        <p>
            <ul>
                <li>Should I worry when using my credit card on the Internet?</li>
                <li>How safe is my Internet bank account?</li>
                <li>How many doctors or healthcare personnel have access to my personal health records?</li>
                <li>Can I be sure that I am the only one reading my e-mail?</li>
                <li>How crucial can a single personal mistake be for my company?</li>
            </ul>
            A security risk analysis may provide answers to such questions. CORAS is a method for conducting security risk analysis. CORAS provides a customised language for threat and risk modelling, and comes with detailed guidelines explaining how the language should be used to capture and model relevant information during the various stages of the security analysis. In this respect CORAS is model-based. The Unified Modelling Language (UML) is typically used to model the target of the analysis. For documenting intermediate results, and for presenting the overall conclusions we use special CORAS diagrams which are inspired by UML. The CORAS method provides a computerised tool designed to support documenting, maintaining and reporting analysis results through risk modelling.<br />
        </p>
        <p>
            In the CORAS method a security risk analysis is conducted in eight steps:
        </p>
        <img src={stepImg} />
        <p>
	  The eight steps of the CORAS method are summarised as follows.  
	  <ul>
	    <li><b>Step 1</b>: The first step is the initial
	    preparations for a risk analysis. The main objective is to
	    get a basic idea about what is to be the target and what
	    will be the size of the analysis such that we can make the
	    necessary preparations for the actual analysis tasks.</li>
	    <li><b>Step 2</b>: The second step is the introductory
	    meeting with the customer on the behalf of which the
	    analysis is conducted. The main item on the agenda for
	    this meeting is to get the representatives of the customer
	    to present their overall goals of the analysis and the
	    target they wish to have analysed. The objective is to
	    achieve a common initial understanding of the target of
	    analysis, and of what the parties of the analysis are most
	    concerned about. The overall goals of the analysis are put
	    forward, the focus and scope of the analysis are set, and
	    the rest of the analysis is planned.</li>
	    <li><b>Step 3</b>: The thirds step aims to ensure a common
	    understanding of the target of analysis, including its
	    focus, scope and main assets. The analysis team presents
	    their understanding of what they learned at the first
	    meeting and from studying documentation that has been made
	    available to them by the customer. Based on interaction
	    with the customer, the analysis team will also identify
	    the main assets to be protected. The analysis team
	    furthermore conducts a rough, high-level analysis to
	    identify major threat scenarios, vulnerabilities and
	    enterprise level risks that should be investigated
	    further. The outcome of Step 3 is a refined and more
	    detailed understanding of the target description and the
	    objectives of the analysis, which at this point are
	    documented by the analysts.</li>
	    <li><b>Step 4</b>: The fourth step aims to ensure that the
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
	    analysis step concludes the context establishment.</li>
	    <li><b>Step 5</b>: The fifth step is the risk
	    identification. To identify risks, CORAS makes use of
	    structured brainstorming. Structured brainstorming is a
	    step-by-step walkthrough of the target of analysis and is
	    carried out as a workshop led by the analysts. The main
	    idea of structured brainstorming is that since the
	    workshop participants represent different competences,
	    backgrounds and interests, they will view the target from
	    different perspectives and consequently identify more, and
	    possibly other, risks than individuals or a more
	    homogeneous group would have managed. The risk
	    identification involves a systematic identification of
	    threats, unwanted incidents, threat scenarios and
	    vulnerabilities with respect to the identified assets. The
	    activities are supported by the CORAS language, and the
	    results are documented on-the-fly by means of CORAS threat
	    diagrams.</li>
	    <li><b>Step 6</b>: The sixth step aims to determine the
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
	    and threat scenarios to cause the unwanted incidents.</li>
	    <li><b>Step 7</b>: The seventh step aims to decide which
	    of the identified risks are acceptable, and which of the
	    risks must be further evaluated for possible
	    treatment. Whether or not the risks are acceptable is
	    determined by using the already defined risk evaluation
	    criteria and the results of the risk estimation. Step 7
	    furthermore involves estimating and evaluating risks with
	    respect to indirect assets.</li>
	    <li><b>Step 8</b>: The eighth step is concerned with the
	    identification and analysis of treatments. The risks that
	    are found to be unacceptable are evaluated to find means
	    to reduce them. A treatment should contribute to reduced
	    likelihood and/or consequence of an unwanted
	    incident. Since treatments can be costly, they are
	    assessed with respect to their cost-benefit, before a
	    final treatment plan is made.</li>
	  </ul>  
	  </p> 

    </div>;

export default Introduction;
