import React from 'react';

import './elementeditor.css';

class ElementEditor extends React.Component {
    constructor(props) {
        super(props);

        this.onLabelChange = this.onLabelChange.bind(this);
        this.onPositionChangeX = this.onPositionChangeX.bind(this);
        this.onPositionChangeY = this.onPositionChangeY.bind(this);
        this.onTypeChange = this.onTypeChange.bind(this);

        const { x, y } = this.props.isLink ? { x: null, y: null } : this.props.element.position();

        this.state = {
            label: this.props.element.attr('text/text'),
            x,
            y,
            type: this.props.element.get('corasType')
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

    onTypeChange(e) {
        this.props.typeOnChange(parseInt(e.target.value));
        this.setState({ type: parseInt(e.target.value) });
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
                    <label className="element-editor-section__label element-editor-section__label--full">Element Type</label>
                    <RadioGroup name="symboltype" values={[ "Regular", "Before", "After" ]} currentValue={this.state.type} onChange={this.onTypeChange} />
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

const RadioButton = ({ name, value, checked, onChange, label }) =>
    <span>
        <input
            type="radio"
            name={name}
            value={value}
            checked={checked}
            onChange={onChange} />
        <label className="element-editor-section__label">{label}</label>
    </span>;

const RadioGroup = ({ name, values, currentValue, onChange }) =>
    <span>
        {values.map((value, index) => <RadioButton
                                        name={name}
                                        value={index}
                                        key={index}
                                        checked={index === currentValue}
                                        onChange={onChange}
                                        label={value} />)}
    </span>;

export default ElementEditor;
