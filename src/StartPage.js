import React, {useState} from 'react';
import {startNewGame} from './Api';
import {useHistory} from 'react-router-dom';
import './StartPage.scss';
import CaretRight from './CaretRight';

const StartPage = () => {
      const [gameId, setGameId] = useState();
      const [expandJoinGame, setExpandJoinGame] = useState(false);
      const history = useHistory();

      const handleStartNewGame = () => {
        startNewGame().then(id => {
          history.push(`/game/${id}`);
        });
      };

      const handleJoinGame = () => {
        history.push(`/game/${gameId}`);
      };

      return (
          <article className="start-page">
            <button type="button" onClick={handleStartNewGame}>New Game</button>
            <section>
              <section className="join-game-expander"
                       onClick={() => setExpandJoinGame(prev => !prev)}>
                <button type="button">Join/Resume Game</button>
                <CaretRight/>
              </section>
              {
                expandJoinGame &&
                <div>
                  <input type="text" onChange={(e) => setGameId(e.target.value)}/>
                  <button type="button" onClick={handleJoinGame}>Go</button>
                </div>
              }
            </section>
          </article>
      );
    }
;

export default StartPage;
