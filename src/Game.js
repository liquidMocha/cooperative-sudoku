import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import _ from 'lodash';
import Row from './Row';
import './Game.scss';
import {getGame, movesEventSource, submitMove} from './Api';

const blankBoard = () => [
  ...((_.range(9).map(index => _.range(9).map(index => {
    return {editable: true};
  }))))];

const Game = () => {
  const {id} = useParams();
  const [formations, setFormations] = useState(blankBoard());

  useEffect(() => {
    getGame(id).then((game) => {
      const board = blankBoard();

      game.initialCells.forEach(cell => {
        board[cell.row][cell.column] = {number: cell.number, editable: false};
      });

      _.sortBy(game.moves, [move => new Date(move.timestamp)]).forEach(move => {
        board[move.row][move.column] = {
          ...board[move.row][move.column],
          number: move.number,
        };
      });

      setFormations(board);
    });
  }, [id]);

  useEffect(() => {
    const eventSource = movesEventSource(id);
    eventSource.onmessage = (event) => {
      const updateCell = JSON.parse(event.data);

      setFormations(previousFormation => {
        return updateFormation(
            updateCell.row,
            updateCell.column,
            updateCell.number,
            previousFormation,
        );
      });
    };

    return () => eventSource.close();
  }, [id]);

  const cellChange = (row, column, number) => {
    submitMove(id, row, column, number);

    setFormations(previousFormation => {
      return updateFormation(row, column, number, previousFormation);
    });
  };

  const updateFormation = (row, column, number, formation) => {
    return formation.map((r, rowIndex) => {
      return r.map((col, columnIndex) => {
        if (rowIndex === row && columnIndex === column) {
          return {
            ...(formation[rowIndex][columnIndex]),
            number,
          };
        } else {
          return formation[rowIndex][columnIndex];
        }
      });
    });
  };

  return (
      <article>
        <div className="sudoku-grid">
          {formations.map(
              (formation, index) =>
                  <Row
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
