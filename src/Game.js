import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import _ from 'lodash';
import Cluster from './Cluster';
import './Game.scss';

const Game = () => {
  const {id} = useParams();
  const [moves, setMoves] = useState([]);
  const [formations, setFormations] = useState(
      [
        ...((_.range(9).map(index =>
            _.range(9).map(index => {
              return {};
            }),
        ))),
      ],
  );

  useEffect(() => {
    const eventSource = new EventSource(`http://localhost:8080/${id}/moves`);
    eventSource.onmessage = (event) => {
      console.log('new data: ', event.data);
      console.log('existing moves: ', moves);
      setMoves(_.concat(moves, event.data));
    };

    return () => eventSource.close();
  }, [moves, id]);

  const cellChange = (row, column, number) => {
    setFormations(previousFormation => {
      return previousFormation.map((r, rowIndex) => {
        return r.map((col, columnIndex) => {
          if (rowIndex === row && columnIndex === column) {
            return number;
          } else {
            return previousFormation[rowIndex][columnIndex];
          }
        })
      });
    });
  };

  return (
      <article>
        <div className="sudoku-grid">
          {formations.map(
              (formation, index) =>
                  <Cluster
                      key={`cluster-${index}`}
                      position={index}
                      formation={formation}
                      onCellChange={cellChange}
                  />)}
        </div>
      </article>
  );
};

export default Game;
