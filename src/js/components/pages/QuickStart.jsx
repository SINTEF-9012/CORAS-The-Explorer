import React from 'react';

import ProgressionBox from '../atoms/ProgressionBox/ProgressionBox';
import Editor from '../molecules/Editor/Editor';

const qsSteps = [
    {
        title: "What is CORAS"
    },
    {
        title: "Preparation for Analysis"
    },
    {
        title: "Customer presentation of the target description"
    },
    {
        title: "Refine target description"
    },
    {
        title: "Approval of target description"
    },
    {
        title: "Risk identification"
    },
    {
        title: "Risk estimation"
    },
    {
        title: "Risk evaluation"
    },
    {
        title: "Risk treatment"
    }
]

const QuickStart = ({ match, location, history }) =>
    <div>
        <ProgressionBox
            stepid={parseInt(match.params.step) < qsSteps.length ? parseInt(match.params.step) : 0}
            steps={qsSteps}
            rootPath={match.path.split("/")[1]} />
        <Editor />
    </div>;

export default QuickStart;