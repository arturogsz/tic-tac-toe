import React from 'react';
import Board from './board';
import calculateWinner from '../functions/calculateWinner'

  class Game extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        history: [{
          squares: Array(9).fill(null),
        }],
        order: Array(9).fill(0),
        toggle: false,
        stepNumber: 0,
        xIsNext: true,
      };
}

    handleClick(i) {
      const history = this.state.history.slice(0, this.state.stepNumber + 1);
      const current = history[history.length - 1];
      const squares = current.squares.slice();
      const order = this.state.order ;
      if (calculateWinner(squares) || squares[i]) {
        return;
      }
      // Aqui se asigna el valor X / O al cuadro clickado
      squares[i] = this.state.xIsNext ? 'X' : 'O';
      //console.log(this.state.stepNumber);
      order[this.state.stepNumber] = i;
      this.setState({
        history: history.concat([{
          squares: squares,
        }]),
        order: order,
        stepNumber: history.length,
        xIsNext: !this.state.xIsNext,
      });
    }

    jumpTo(step) {
      this.setState({
        stepNumber: step,
        xIsNext: (step % 2) === 0,
      });
    }

    toggle() {
      this.setState({
        toggle: !this.state.toggle,
      });
    }

    render() {
      const history = this.state.history;
      const current = history[this.state.stepNumber];
      const winner = calculateWinner(current.squares);
      const gridStrings = ["0,0", "1,0", "2,0",
                           "0,1", "1,1", "2,1",
                           "0,2", "1,2", "2,2"];
      const moves = history.map((step, move) => {
        const location = gridStrings[this.state.order[move - 1]];
        const desc = move ?
          'Go to move #' + move + ' ' + location :
          'Go to game start';
        const style = (move === this.state.stepNumber) ? "bold" : "" ;
        return (
          <li key={move} className={style}>
            <button onClick={() => this.jumpTo(move)} className={style}>{desc}</button>
          </li>
        );
      });

      let status;
      if (winner) {
        status = 'Winner: ' + winner;
      } else {
        status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
      }

      return (
        <div className="game">
          <div className="game-board">
            <Board
              squares={current.squares}
              onClick={(i) => this.handleClick(i)}
            />
          </div>
          <div className="game-info">
            <div>{status}</div>
            <ol>{this.state.toggle ? moves.reverse() : moves}</ol>
          </div>
          <div className="game-toggle">
            <button onClick={() => this.toggle()}>Toggle</button>
          </div>
        </div>
      );
    }
  }

  export default Game;