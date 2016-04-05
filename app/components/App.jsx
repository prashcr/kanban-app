import AltContainer from 'alt-container';
import React from 'react';
import Lanes from './Lanes.jsx';
import CustomDragLayer from './CustomDragLayer';
import LaneActions from '../actions/LaneActions';
import LaneStore from '../stores/LaneStore';
import {DragDropContext} from 'react-dnd';
import TouchBackend from 'react-dnd-touch-backend';

@DragDropContext(TouchBackend)
export default class App extends React.Component {

  render() {
    return <div>
      <button className="add-lane" onClick={this.addLane}>+</button>
      <AltContainer
        stores={[LaneStore]}
        inject={{
          lanes: () => LaneStore.getState().lanes || []
        }}
      >
        <Lanes onSwap={LaneActions.swap} />
      </AltContainer>
      <CustomDragLayer />
    </div>
  }

  addLane() {
    LaneActions.create({name: 'New lane'});
  }
}
