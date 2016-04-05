import React from 'react';
import ItemTypes from '../constants/itemTypes';
import Lane from './Lane';
import Note from './Note';
import {DragLayer} from 'react-dnd';

const layerStyles = {
  position: 'fixed',
  pointerEvents: 'none',
  zIndex: 100,
  left: 0,
  top: 0,
  width: '100%',
  height: '100%'
};

function getItemStyles (props) {
  const { initialOffset, currentOffset } = props;
  if (!initialOffset || !currentOffset) {
    return {
      display: 'none'
    };
  }

  // http://www.paulirish.com/2012/why-moving-elements-with-translate-is-better-than-posabs-topleft/
  const { x, y } = currentOffset;
  var transform = `translate(${x}px, ${y}px)`;

  return {
    transform: transform,
    WebkitTransform: transform
  };
}

@DragLayer((monitor) => ({
  item: monitor.getItem(),
  itemType: monitor.getItemType(),
  initialOffset: monitor.getInitialSourceClientOffset(),
  currentOffset: monitor.getSourceClientOffset(),
  isDragging: monitor.isDragging()
}))
export default class CustomDragLayer extends React.Component {
  renderItem(type, item) {
    switch (type) {
      case ItemTypes.LANE:
        return <Lane className="lane"
                     key={item.id}
                     id={item.id}
                     lane={item} />
      case ItemTypes.NOTE:
        return <Note />
      default:
        return null
    }
  }
  
  render () {
    const { item, itemType, isDragging } = this.props;

    if (!isDragging) {
      return false;
    }

    return <div style={layerStyles}>
      <div style={getItemStyles(this.props)}>
        {this.renderItem(itemType, item)}
      </div>
    </div>
  }
}