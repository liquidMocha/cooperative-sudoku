import './App.css';
import {BrowserRouter, Route} from 'react-router-dom';
import Game from './Game';

function App() {
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
          <Route path="/:id">
            <Game/>
          </Route>
        </BrowserRouter>
      </div>
  );
}

export default App;
