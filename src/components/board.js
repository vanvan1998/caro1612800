import React from 'react';
import '../App.css';

function Square(prs) {
  return (
    <button
      className="square"
      type="button"
      style={{ color: prs.color }}
      onClick={prs.onClick}
    >
      {prs.value}
    </button>
  );
}

class Board extends React.Component {
  renderSquare(i, j) {
    const prs = this.props;
    return (
      <Square
        value={prs.squares[i][j]}
        color={prs.color(i, j)}
        onClick={() => prs.onClick(i, j)}
      />
    );
  }

  render() {
    const table = [];

    for (let i = 0; i < 20; i += 1) {
      const children = [];
      for (let j = 0; j < 20; j += 1) {
        children.push(
          <div key={j} className="board-row">
            {this.renderSquare(i, j)}
          </div>
        );
      }
      table.push(
        <div key={i} className="divRow">
          {children}
        </div>
      );
    }
    return table;
  }
}

export default Board;
