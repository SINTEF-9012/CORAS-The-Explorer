import React from 'react';

import './celltool.css';

const CellTool = ({ x, y, width, height, holdFn, releaseFn, moveFn }) =>
    <div className="cell-tool" style={{ width: `${width}px`, height: `${height}px`, left: `${x}px`, bottom: `${y}px` }}>
        <div className="cell-tool__drag-handle cell-tool__drag-handle--top" onMouseMove={moveFn} onMouseDown={() => holdFn("up")} onMouseUp={releaseFn}></div>
        <div className="cell-tool__drag-handle cell-tool__drag-handle--right"></div>
        <div className="cell-tool__drag-handle cell-tool__drag-handle--bottom"></div>
        <div className="cell-tool__drag-handle cell-tool__drag-handle--left"></div>
    </div>;

export default CellTool;
