import React from 'react';
import Square from './square'

  class Board extends React.Component {
    
    renderRow(first) {
      const row = Array(3) ;
      for(let i = first; i < (first+3); i++) {
        row.push(this.renderSquare(i));
      }
      return (
        <div key={first} className="board-row">
          {row}
        </div>
      )
    }
    
    renderSquare(i) {
      return (
        <Square
            key={i}
            value={this.props.squares[i]}
            onClick={() => {this.props.onClick(i);}}
        />
      );
    }
  
    render() {
      const nums = [0,3,6];
      const rows = nums.map(val => {
        return this.renderRow(val);
      });
      return (
        <div>
          {rows}
        </div>
      );
    }
  }

  export default Board;