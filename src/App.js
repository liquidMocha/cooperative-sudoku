import './App.css';
import {useEffect, useState} from 'react';
import _ from 'lodash';

function App() {
  const [moves, setMoves] = useState([]);
  const [id, setId] = useState();
  const [row, setRow] = useState();
  const [column, setColumn] = useState();
  const [number, setNumber] = useState();

  useEffect(() => {
    const eventSource = new EventSource('http://localhost:8080/123123/moves');
    eventSource.onmessage = (event) => {
      console.log('new data: ', event.data);
      console.log('existing moves: ', moves);
      setMoves(_.concat(moves, event.data));
    };

    return () => eventSource.close();
  }, [moves]);

  const submitMove = (e) => {
    e.preventDefault();
    e.stopPropagation();
    fetch(`http://localhost:8080/${id}/move`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        row: row,
        column: column,
        number: number,
      }),
    }).then((response) => {
      console.log(response);
    }).catch((error) => {
      console.log(error);
    });
  };

  const handleNewGame = (e) => {
    e.preventDefault();
    e.stopPropagation();
    fetch(`http://localhost:8080/start`, {
      method: 'POST',
      mode: 'cors',
    }).then((response) => {
      console.log(response);
    }).catch((error) => {
      console.log(error);
    });
  };

  return (
      <div className="App">
        <header className="App-header">

        </header>
        <p>
          <input type="text" onChange={(e) => setId(e.target.value)}/>
          <button onClick={handleNewGame}>submit</button>
        </p>
        <div>
          <label>
            Row:
            <input type="number" onChange={(e) => setRow(e.target.value)}/>
          </label>
          <label>
            Column:
            <input type="number" onChange={(e) => setColumn(e.target.value)}/>
          </label>
          <label>
            Number:
            <input type="number" onChange={(e) => setNumber(e.target.value)}/>
          </label>
          <button onClick={submitMove}>make move</button>
        </div>
        {moves.map(move => {
          return (<div>
            {JSON.stringify(move)};
          </div>);
        })}
      </div>
  );
}

export default App;
