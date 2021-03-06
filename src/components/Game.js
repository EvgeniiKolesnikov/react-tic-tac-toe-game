import React, { useState } from 'react';
import { calculateWinner } from '../helpers';
import Board from './Board';

const style = {
  width: '200px',
  margin: '20px auto',
};

const Game = () => {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [stepNumber, setStepNumber] = useState(0);

  const [xIsNext, setXIsNext] = useState(true);
  const winner = calculateWinner(history[stepNumber]);

  const handleClick = (i) => {
    const timeInHistory = history.slice(0, stepNumber + 1);
    const current = timeInHistory[stepNumber];
    const squares = [...current];
    if (winner || squares[i]) return;
    squares[i] = xIsNext ? 'x' : 'o';
    setHistory([...timeInHistory, squares]);
    setStepNumber(timeInHistory.length);
    setXIsNext(!xIsNext);
  };
  const jumpTo = (step) => {
    setStepNumber(step);
    setXIsNext(step % 2 === 0);
  };

  const renderMoves = () =>
    history.map((_step, move) => {
      const destination = move ? `Go to move ${move}` : 'Go to start';
      return (
        <li key={move}>
          <button onClick={() => jumpTo(move)}>
            {destination}
          </button>
        </li>
      );
    });

  return (
    <div>
      <Board squares={history[stepNumber]} onClick={handleClick} />
      <div style={style}>
        <p >
          {winner
            ? 'Winner: ' + winner
            : 'Next Player: ' + (xIsNext ? 'x' : 'o')}
          {renderMoves()}
        </p>
      </div>
    </div>
  );
};

export default Game;
