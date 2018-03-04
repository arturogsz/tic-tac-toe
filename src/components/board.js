import React from 'react';
import Square from './square'

  class Board extends React.Component {
    
    renderRow(first) {
      const row = Array(3);
      let style = "";
      for(let i = first; i < (first+3); i++) {
        // 'i' will be square key
        style = this.props.winningSquares.includes(i) ? "winner" : "" ;        
        row.push(this.renderSquare(i, style));
      }
      return (
        <div key={first} className="board-row">
          {row}
        </div>
      )
    }
    
    renderSquare(i, style) {
      console.log(style);
      return (
        <Square
            key={i}
            value={this.props.squares[i]}
            onClick={() => {this.props.onClick(i);}}
            bckgrnd={style}
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