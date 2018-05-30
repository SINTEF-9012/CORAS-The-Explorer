import React from 'react';
import { Route, Switch } from 'react-router-dom';

import PageHeading from '../atoms/PageHeading/PageHeading';
import LegacyIntro from './Learn/LegacyIntro';

import Button from '../atoms/Button/Button';
import Heading from '../atoms/Heading/Heading';

import './Learn/learn.css';

const Learn = ({ match, location, history }) =>
    <div className="introduction-page">
        <PageHeading title={"Introduction to CORAS"} />
		<Switch>
			<Route path={`${match.url}`} component={Introduction} />
		</Switch>
	</div>;
	
const StepWrapper = ({ match, location, history }) => {
	switch(match.params.step) {
		default:
		case "1":
		return <div>Step1</div>
		break;

		case "2":
		return <div>Step2</div>
		break;

		case "legacy":
		return <LegacyIntro />;
		break;
	}
}

const Introduction = ({ match, location, history }) =>
	<div>
		<TextBlock>
			<p>
				Have you ever asked yourself some of the following questions:
			</p>
			<ul>
				<li>Should I worry when using my credit card on the Internet?</li>
				<li>How safe is my Internet bank account?</li>
				<li>How many doctors or healthcare personnel have access to my personal health records?</li>
				<li>Can I be sure that I am the only one reading my e-mail?</li>
				<li>How crucial can a single personal mistake be for my company?</li>
			</ul>
			<p>
				A security risk analysis may provide answers to such questions.<br />
				CORAS is a method for conducting security risk analysis, Which means that CORAS can help you answer such questions. Neat!
			</p>
			<p>
				CORAS is the name of a risk analysis method, a modelling language, and a set of tools. Together we call these <em>The CORAS Approach</em>.
				Through reading the information and going through the tutorials on this page, you will become familiar with the different elements of the CORAS approach, and can use them
				in your business or life as an aid to assess risks and threats, and mitigate them.
			</p>
		</TextBlock>
		<NavigationBlock
			title="Risk assessment and modelling"
			text={`Before you begin learning CORAS, you should have an understanding of the basic concepts
			of risk analysis and modelling, such as what we mean by the term "risk".
			If you feel confident you know enough, read on! Of not, check out the links
			below to quickly get up to speed before proceeding here.`}
			links={[
				{
					link: "/about#risk-assessment",
					text: "Learn about risk assessment",
					type: "small"
				},
				{
					link: "/about#modelling",
					text: "Learn about risk modelling",
					type: "small"
				}
			]} />
		<TextBlock>
			<p>
				So you know what risk assessment and risk modelling is, and now you want to try it out
				yourself? Great! Read on to learn how to use CORAS to achieve that. The following tutorials
				and documents are split into three sections:
			</p>
			<Heading level={1} text={"TestHeader"} />
			<Heading level={2} text={"TestHeader"} />
			<Heading level={3} text={"TestHeader"} />
			<Heading level={4} text={"TestHeader"} />
			<Heading level={5} text={"TestHeader"} />
			<Heading level={6} text={"TestHeader"} />
		</TextBlock>
		
	</div>;

const NavigationBlock = ({ title, text, links }) =>
	<div className="navigation-block">
		<h1 className="navigation-block__heading">{title}</h1>
		{text}
		<ul className="navigation-block__navbar">
			{links.map((link, index) => <li key={index} className="navigation-block__navbar-item"><Button {...link} /></li>)}
		</ul>
	</div>;

const TextBlock = ({ children }) =>
	<div className="text-block">
		{children}
	</div>

export default Learn;