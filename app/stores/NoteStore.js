import uuid from 'node-uuid';
import alt from '../libs/alt';
import NoteActions from '../actions/NoteActions';

class NoteStore {
  constructor() {
    this.bindActions(NoteActions);

    this.notes = [];
    
    this.exportPublicMethods({
      getNotesByIds: this.getNotesByIds.bind(this)
    });

    // this.dispatcher.register(console.log.bind(console));
  }
  create(note) {
    const {notes} = this;

    note.id = uuid.v4();

    this.setState({
      notes: notes.concat(note)
    });
    
    return note;
  }
  update(updatedNote) {

    const notes = this.notes.map(note => {
      if (note.id === updatedNote.id) {
        // Object.assign is used to patch the note data here. It
        // mutates target (first parameter). In order to avoid that,
        // I use {} as its target and apply data on it.
        //
        // Example: {}, {a: 5, b: 3}, {a: 17} -> {a: 17, b: 3}
        //
        // You can pass as many objects to the method as you want.
        return Object.assign({}, note, updatedNote);
      }

      return note;
    });

    // This is the same as `this.setState({notes: notes})`
    this.setState({notes});
  }
  delete(id) {
    this.setState({
      notes: this.notes.filter(note => note.id !== id)
    });
  }
  getNotesByIds(ids) {
    // 1. Make sure we are operating on an array and
    // map over the ids
    // [id, id, id, ...] -> [[Note], [], [Note], ...]
    return (ids || []).map(
      // 2. Extract matching notes
      // [Note, Note, Note] -> [Note, ...] (match) or [] (no match)
      id => this.notes.filter(note => note.id === id)
      // 3. Filter out possible empty arrays and get notes
      // [[Note], [], [Note]] -> [[Note], [Note]] => [Note, Note]
    ).filter(a => a.length).map(a => a[0]);
  }
}

export default alt.createStore(NoteStore, 'NoteStore');