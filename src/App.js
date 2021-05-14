import './App.css';
import {BrowserRouter, Route} from 'react-router-dom';
import Game from './Game';
import {startNewGame} from './Api';

function App() {
  const handleStartNewGame = () => {
    startNewGame().then(id => {window.location.href = `/${id}`;});
  };

  return (
      <div className="App">
        <BrowserRouter>
          <div onClick={handleStartNewGame}>New Game</div>
          <Route path="/:id">
            <Game/>
          </Route>
        </BrowserRouter>
      </div>
  );
}

export default App;
