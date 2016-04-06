import React from 'react';

export default class NoteDragPreview extends React.Component {
  render() {
    return <li className="note">
      <div>
        <span className="value">{this.props.value}</span>
      </div>
    </li>
  }
}
