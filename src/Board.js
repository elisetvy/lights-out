import React, { useState } from "react";
import _ from "lodash";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows = 3, ncols = 3, chanceLightStartsOn = Math.random() }) {
  const [board, setBoard] = useState(createBoard());

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    let initialBoard = [];
    // TODO: create array-of-arrays of true/false value
    const totalCells = nrows * ncols;
    const cellsOn = Math.floor(totalCells * chanceLightStartsOn);
    const cellsOff = totalCells - cellsOn;

    const t = Array(cellsOn).fill(true);
    const f = Array(cellsOff).fill(false);

    const shuffled = _.shuffle(t.concat(f));

    for (let i = 0; i < shuffled.length; i += ncols) {
      initialBoard.push(shuffled.slice(i, i + ncols));
    }

    return initialBoard;
  }

  function hasWon() {
    // TODO: check the board in state to determine whether the player has won.
    const allCells = _.flatten(board);
    return !allCells.includes(false);
  }

  function flipCellsAround(coord) {
    setBoard(oldBoard => {
      const [y, x] = coord.split("-").map(Number);

      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it

        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      // TODO: Make a (deep) copy of the oldBoard

      const oldBoardCopy = [...board];

      // TODO: in the copy, flip this cell and the cells around it

      const adjacentCells = [[y, x], [y + 1, x], [y - 1, x], [x + 1, y], [x - 1, y]];
      for (let cells of adjacentCells) {
        flipCell(...cells, oldBoardCopy);
      }

      // TODO: return the copy
      return oldBoardCopy;
    });
  }

  // if the game is won, just show a winning msg & render nothing else
  if (hasWon) {
    return <p>You won!!</p>;
  }

  // TODO

  // make table board
  return (
    <div>
      {board.map(cell =>
        <Cell flipCellsAroundMe={flipCellsAround} isLit={cell} />)};
    </div>);

  // TODO
}

export default Board;
