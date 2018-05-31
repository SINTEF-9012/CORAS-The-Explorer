import React from 'react';
import joint from 'jointjs';

import PageHeading from '../atoms/PageHeading/PageHeading';
import Editor from '../molecules/Editor/Editor';

const EditorPage = (props) =>
    <div>
        <div className="introduction-page"><PageHeading title={"CORAS Editor"} /></div>
        <Editor />
    </div>;

const ToolChain = ({ onClickFn }) =>
    <div>
        <button onClick={onClickFn} label="Add box">Add box</button>
    </div>;

export default EditorPage;
