import React, { useState, useEffect } from "react";

import { CSSTransitionGroup } from "react-transition-group";

import Board from "./Board";

export default function GamePage(props) {
  const [highScores, setHighScores] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [error, setError] = useState(false);

  const fetchScores = async () => {
    try {
      const response = await fetch(
        " http://ftw-highscores.herokuapp.com/tictactoe-dev"
      );
      const data = await response.json();
      setHighScores(highScores.concat(data.items));
    } catch (error) {
      setError(true);
    }
  };

  useEffect(() => {
    fetchScores();
  }, []);

  const postGameScore = async () => {
    let data = new URLSearchParams();

    data.append("player", props.currentUser || "Anonymous");
    data.append("score", -1559744884);

    const url = `http://ftw-highscores.herokuapp.com/tictactoe-dev`;
    const config = {
      json: true,
      method: "POST",
      body: data.toString(),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    };
    const response = await fetch(url, config);

    if (response.status === 200) {
      fetchScores();
    }
  };

  const removeOneScore = id => {
    const newScores = highScores.filter(score => {
      return score._id !== id;
    });
    setHighScores(newScores);
  };

  return (
    <div className="bg-secondary h-100 d-flex flex-column justify-content-center align-items-center">
      <div className="d-flex flex-column">
        <h1>{props.currentUser.name}</h1>

        <div className="game-board">
          <Board someoneWon={postGameScore} isGameOver={gameOver} />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
        <button className="btn btn-primary btn-lg" onClick={postGameScore}>
          Post Score
        </button>
        <button className="btn btn-danger" onClick={props.onSignOut}>
          Sign Out
        </button>
        <ul>
          <CSSTransitionGroup
            transitionName="example"
            transitionEnterTimeout={500}
            transitionLeaveTimeout={300}
          >
            {highScores.map(score => {
              return (
                <li key={score._id} onClick={() => removeOneScore(score._id)}>
                  {score.player} got a {score.score}
                </li>
              );
            })}
          </CSSTransitionGroup>
        </ul>
      </div>
    </div>
  );
}
