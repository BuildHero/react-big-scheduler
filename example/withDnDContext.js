import React from 'react';
import {DndProvider} from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

export default (ui) => {
  return <DndProvider backend={HTML5Backend}>{ui}</DndProvider>;
};