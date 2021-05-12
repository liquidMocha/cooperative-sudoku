import './App.css';
import {useState} from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import Game from './Game';

function App() {
  const [id, setId] = useState();
  const [row, setRow] = useState();
  const [column, setColumn] = useState();
  const [number, setNumber] = useState();

  // useEffect(() => {
  //   const eventSource = new EventSource(`http://localhost:8080/${id}/moves`);
  //   eventSource.onmessage = (event) => {
  //     console.log('new data: ', event.data);
  //     console.log('existing moves: ', moves);
  //     setMoves(_.concat(moves, event.data));
  //   };
  //
  //   return () => eventSource.close();
  // }, [moves, id]);

  const startNewGame = () => {
    fetch(`http://localhost:8080/start`, {
      method: 'POST',
      mode: 'cors',
    }).then((response) => {
      const reader = response.body.getReader();
      reader.read().then(foo => {
        const newGame = JSON.parse(new TextDecoder().decode(foo.value));
        console.log(newGame.id);
        window.location.href = `/${newGame.id}`;
      });
    }).catch((error) => {
      console.log(error);
    });
  };

  return (
      <div className="App">
        <BrowserRouter>
          <div onClick={startNewGame}>New Game</div>
          {/*<Link to="">Join/Resume Game</Link>*/}
          <Route path="/:id">
            <Game/>
          </Route>
        </BrowserRouter>
        {/*<p>*/}
        {/*  <input type="text" onChange={(e) => setId(e.target.value)}/>*/}
        {/*  <button onClick={handleNewGame}>submit</button>*/}
        {/*</p>*/}
        {/*<div>*/}
        {/*  <label>*/}
        {/*    Row:*/}
        {/*    <input type="number" onChange={(e) => setRow(e.target.value)}/>*/}
        {/*  </label>*/}
        {/*  <label>*/}
        {/*    Column:*/}
        {/*    <input type="number" onChange={(e) => setColumn(e.target.value)}/>*/}
        {/*  </label>*/}
        {/*  <label>*/}
        {/*    Number:*/}
        {/*    <input type="number" onChange={(e) => setNumber(e.target.value)}/>*/}
        {/*  </label>*/}
        {/*  <button onClick={submitMove}>make move</button>*/}
        {/*</div>*/}
        {/*{moves.map(move => {*/}
        {/*  return (<div>*/}
        {/*    {JSON.stringify(move)};*/}
        {/*  </div>);*/}
        {/*})}*/}
      </div>
  );
}

export default App;
