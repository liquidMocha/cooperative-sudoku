import React from 'react';
import Cell from './Cell';
import './Row.scss';

const Row = ({formation, position, onCellChange}) => {
  return (
      <div className="row">
        {
          formation.map((data, index) => {
            return <Cell
                key={`cell-${position}-${index}`}
                position={{
                  row: position,
                  column: index,
                }}
                onChange={(number) => onCellChange(position, index, number)}
                data={data}
            />;
          })
        }
      </div>
  );
};

export default Row;
