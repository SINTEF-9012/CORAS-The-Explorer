import React from 'react';

import Preview from '../molecules/Preview/Preview.jsx';
import FrontPageActions from '../molecules/FrontPageActions/FrontPageActions.jsx';
import KeyPoints from '../molecules/KeyPoints/KeyPoints.jsx'
;
const Frontpage = (props) =>
    <div>
        <Preview />
        <FrontPageActions />
        <KeyPoints />
    </div>;

export default Frontpage;