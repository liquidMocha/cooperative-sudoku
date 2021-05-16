import './App.scss';
import {BrowserRouter, Route} from 'react-router-dom';
import Game from './Game';
import StartPage from './StartPage';

function App() {
  return (
      <div className="App">
        <BrowserRouter>
          <Route path='/start'>
            <StartPage/>
          </Route>
          <Route path="/game/:id">
            <Game/>
          </Route>
        </BrowserRouter>
      </div>
  );
}

export default App;
