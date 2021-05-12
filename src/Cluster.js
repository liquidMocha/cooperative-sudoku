import React from 'react';
import Cell from './Cell';
import './Cluster.scss';

const Cluster = ({formation, position, onCellChange}) => {
  return (
      <div className="cluster">
        {
          formation.map((data, index) => {
            return <Cell
                key={`cell-${position}-${index}`}
                position={{
                  row: rowNumber(position, index),
                  column: columnNumber(position, index),
                }}
                onChange={(number) => onCellChange(rowNumber(position, index),
                    columnNumber(position, index), number)}
                data={data}
            />;
          })
        }
      </div>
  );
};

export default Cluster;

const rowNumber = (position, index) => {
  return Math.trunc(position / 3) * 3 + Math.trunc(index / 3);
};

const columnNumber = (position, index) => {
  return ((position % 3) * 3 + index % 3);
};
