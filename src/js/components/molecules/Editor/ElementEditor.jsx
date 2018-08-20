import React from 'react';

import './elementeditor.css';

class ElementEditor extends React.Component {
    constructor(props) {
        super(props);

        this.onLabelChange = this.onLabelChange.bind(this);
        this.onPositionChangeX = this.onPositionChangeX.bind(this);
        this.onPositionChangeY = this.onPositionChangeY.bind(this);
        this.onDashedChange = this.onDashedChange.bind(this);

        const { x, y } = this.props.isLink ? { x: null, y: null } : this.props.element.position();

        this.state = {
            label: this.props.element.attr('text/text'),
            x,
            y,
            dashed: this.props.dashed
        }
    }
    
    onPositionChangeX(e) {
        this.props.xOnChange(e.target.value);
        this.setState({ x: e.target.value });
    }
    
    onPositionChangeY(e) {
        this.props.yOnChange(e.target.value);
        this.setState({ y: e.target.value });
    }

    onLabelChange(e) {
        this.props.labelOnChange(e.target.value);
        this.setState({ label: e.target.value });
    }

    onDashedChange(e) {
        this.props.dashedOnChange();
        this.setState({ dashed: !this.state.dashed });
    }

    render() {
        return (
            <form className="element-editor" style={{ left: this.props.editorPosition.left, top: this.props.editorPosition.top }}>
                <div className="element-editor-section">
                    <label htmlFor="label" className="element-editor-section__label element-editor-section__label--full">Label</label>
                    <textarea
                        id="label"
                        className="element-editor-section__input element-editor-section__input--100"
                        type="text"
                        value={this.state.label}
                        onChange={this.onLabelChange}></textarea>
                </div>
                {!this.props.isLink ? <div className="element-editor-section">
                    <label className="element-editor-section__label element-editor-section__label--full">Position</label>
                    <div className="element-editor-section__partitioner">
                        <input id="x" className="element-editor-section__input element-editor-section__input--75" type="number" value={this.state.x} onChange={this.onPositionChangeX} />
                        <label htmlFor="x" className="element-editor-section__label">x</label>
                    </div>
                    <div className="element-editor-section__partitioner">
                        <input id="y" className="element-editor-section__input element-editor-section__input--75" type="number" value={this.state.y} onChange={this.onPositionChangeY} />
                        <label htmlFor="y" className="element-editor-section__label">y</label>
                    </div>
                </div> : null}
                <div className="element-editor-section">
                    <label className="element-editor-section__label">Dashed</label>
                    <input id="dashed" type="element-editor-section__checkbox" type="checkbox" checked={this.state.dashed} onChange={this.onDashedChange}/>
                </div>
                <div className="element-editor-section">
                    <button className="element-editor-section__button element-editor-section__button--cta" type="button" onClick={this.props.save}>Save</button>
                    <button className="element-editor-section__button" type="button" onClick={this.props.cancel}>Cancel</button>
                    <button className="element-editor-section__button element-editor-section__button--danger" type="button" onClick={this.props.delete}>Delete</button>
                </div>
            </form>
        );
    }
}

export default ElementEditor;
