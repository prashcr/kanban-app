import React from 'react';
import NoteStore from '../stores/NoteStore';
import NoteDragPreview from './NoteDragPreview';

export default class LaneDragPreview extends React.Component {
  render() {
    const notes = NoteStore
      .getNotesByIds(this.props.lane.notes)
      .map(note => note.task)
      .map((task, i) => <NoteDragPreview value={task} key={i} />);

    return <div className="lane">
      <div className="lane-header">
        <div className="lane-add-note">
          <button>+</button>
        </div>
        <div className="lane-name">
          <span className="value">{this.props.lane.name}</span>
        </div>
        <div className="lane-delete">
          <button>x</button>
        </div>
      </div>
      <ul className="notes">
        {notes}
      </ul>
    </div>
  }
}