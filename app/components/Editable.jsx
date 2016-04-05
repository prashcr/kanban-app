import React from 'react';

export default class Editable extends React.Component {
  render() {
    const {value, onEdit, onValueClick, editing, ...props} = this.props;

    return <div {...props}>
      {editing ? this.renderEdit() : this.renderValue()}
    </div>
  }

  renderEdit = () => {
    // We deal with blur and input handlers here. These map to DOM events.
    // We also set selection to input end using a callback at a ref.
    // It gets triggered after the component is mounted.
    //
    // We could also use a string reference (i.e., `ref="input") and
    // then refer to the element in question later in the code. This
    // would allow us to use the underlying DOM API through
    // this.refs.input. This can be useful when combined with
    // React lifecycle hooks.
    return <input type="text"
      ref={
        (e) => e ? e.selectionStart = this.props.value.length : null
      }
      autoFocus
      defaultValue={this.props.value}
      onBlur={this.finishEdit}
      onKeyPress={this.checkEnter} />
  };

  renderValue = () => {
    const onDelete = this.props.onDelete;
    
    return <div onClick={this.props.onValueClick}>
      <span className="value">{this.props.value}</span>
      {onDelete ? this.renderDelete() : null}
    </div>
  };

  renderDelete = () => {
    return <button
      className="delete"
      onClick={this.props.onDelete}>x</button>;
  };

  checkEnter = (e) => {
    // The user hit *enter*, let's finish up.
    if(e.key === 'Enter') {
      this.finishEdit(e);
    }
  };

  finishEdit = (e) => {
    // `Note` will trigger an optional `onEdit` callback once it
    // has a new value. We will use this to communicate the change to
    // `App`.
    //
    // A smarter way to deal with the default value would be to set
    // it through `defaultProps`.
    //
    // See the *Typing with React* chapter for more information.
    const { value } = e.target;

    if (this.props.onEdit) {
      this.props.onEdit(value);
    }
  };
}
