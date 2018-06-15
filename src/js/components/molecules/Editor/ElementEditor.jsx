import React from 'react';

import './elementeditor.css';

class ElementEditor extends React.Component {
    constructor(props) {
        super(props);

        this.setPosition = this.setPosition.bind(this);

        this.remove = this.remove.bind(this);
        this.close = this.close.bind(this);
        this.save = this.save.bind(this);

        this.onLabelChange = this.onLabelChange.bind(this);
        this.onPositionChangeX = this.onPositionChangeX.bind(this);
        this.onPositionChangeY = this.onPositionChangeY.bind(this);

        this.state = {
            originalLabel: this.props.elementView.model.attr('text/text'),
            label: this.props.elementView.model.attr('text/text'),
            originalPosition: this.props.isLink ? { x: null, y: null } : this.props.elementView.model.position(),
            position: this.props.isLink ? { x: null, y: null } : this.props.elementView.model.position()
        }
    }

    setPosition(x, y) {
        if(!this.props.isLink) this.props.elementView.model.position(parseInt(x), parseInt(y));
    }

    remove() {
        this.props.elementView.model.remove();
        this.props.closeFn();
    }

    close() {
        this.props.elementView.model.attr('text/text', this.state.originalLabel);
        this.setPosition(this.state.originalPosition.x, this.state.originalPosition.y);
        this.props.closeFn();
    }

    save() {
        this.props.elementView.model.attr('text/text', this.state.label);
        this.setPosition(this.state.position.x, this.state.position.y);
        this.props.closeFn();
    }
    
    onLabelChange(e) {
        this.setState({ label: e.target.value });
        this.props.elementView.model.attr('text/text', e.target.value);
    }
    
    onPositionChangeX(e) {
        let value = e.target.value;
        this.setState((prevstate => {
            prevstate.position.x = value
            return prevstate;
        }));
        this.setPosition(value, this.state.position.y);
    }
    
    onPositionChangeY(e) {
        let value = e.target.value;
        this.setState((prevstate => {
            console.log(value);
            prevstate.position.y = value;
            return prevstate;
        }));
        this.setPosition(this.state.position.x, value);
    }

    render() {
        return (
            <form className="element-editor" style={{ left: this.props.position.left, top: this.props.position.top }}>
                <div className="element-editor-section">
                    <label htmlFor="label" className="element-editor-section__label element-editor-section__label--full">Label</label>
                    <input id="label" className="element-editor-section__input element-editor-section__input--100" type="text" value={this.state.label} onChange={this.onLabelChange} />
                </div>
                {!this.props.isLink ? <div className="element-editor-section">
                    <label className="element-editor-section__label element-editor-section__label--full">Position</label>
                    <div className="element-editor-section__partitioner">
                        <input id="x" className="element-editor-section__input element-editor-section__input--75" type="number" value={this.state.position.x} onChange={this.onPositionChangeX} />
                        <label htmlFor="x" className="element-editor-section__label">x</label>
                    </div>
                    <div className="element-editor-section__partitioner">
                        <input id="y" className="element-editor-section__input element-editor-section__input--75" type="number" value={this.state.position.y} onChange={this.onPositionChangeY} />
                        <label htmlFor="y" className="element-editor-section__label">y</label>
                    </div>
                </div> : null}
                <div className="element-editor-section">
                    <button className="element-editor-section__button element-editor-section__button--cta" type="button" onClick={this.save}>Save</button>
                    <button className="element-editor-section__button" type="button" onClick={this.close}>Cancel</button>
                    <button className="element-editor-section__button element-editor-section__button--danger" type="button" onClick={this.remove}>Delete</button>
                </div>
            </form>
        );
    }
}

export default ElementEditor;