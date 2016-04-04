import React from 'react';
import Lane from './Lane.jsx';

export default ({lanes, onSwap}) => {
  return <div className="lanes">
    {lanes.map(lane =>
      <Lane
        className="lane"
        key={lane.id}
        id={lane.id}
        lane={lane}
        onSwap={onSwap} />
    )}
  </div>
}