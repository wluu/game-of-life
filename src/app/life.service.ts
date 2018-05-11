// Conway's Game of Life: https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life

import { Injectable } from '@angular/core';

@Injectable()
export class LifeService {

  private BOARD: boolean[][];
  private NEIGHBORS: any[];
  private NUM_ROWS: number;
  private NUM_COLS: number;

  constructor() {
    this.NEIGHBORS = [
      {row: -1, col: -1}, // NW
      {row: -1, col: 0},  // N
      {row: -1, col: 1},  // NE
      {row: 0, col: -1},  // W
      {row: 0, col: 1},   // E
      {row: 1, col: -1},  // SW
      {row: 1, col: 0},   // S
      {row: 1, col: 1}    // SE
    ];
  }

  useBoard(b: boolean[][]) {
    this.BOARD = b;
    this.NUM_ROWS = b.length;
    this.NUM_COLS = b[0].length;
  }

  applyRules() {
    const newGeneration = [];

    for (let r = 0; r < this.NUM_ROWS; r++) {
      for (let c = 0; c < this.NUM_COLS; c++) {
        const liveCell = this.BOARD[r][c];
        if (liveCell) {
          // Any live cell with fewer than two live neighbors dies, as if caused by under population.
          // Any live cell with more than three live neighbors dies, as if by overpopulation.
          if (this.anyLiveNeighborsAt(r, c) < 2 || this.anyLiveNeighborsAt(r, c) > 3) {
            newGeneration.push({
              row: r,
              col: c,
              alive: false
            });
          } else {
            // Any live cell with two or three live neighbors lives on to the next generation.
            newGeneration.push({
              row: r,
              col: c,
              alive: true
            });
          }

          // TODO: 4. for every live cell, check its EMPTY neighbor and apply the "resurrection" rule:
          // Any dead cell with exactly three live neighbors becomes a live cell
        }
      }
    }

    // TODO: emit the tracking board data which will have the updated board
    // emit newGeneration
  }

  private anyLiveNeighborsAt(r: number, c: number): number {
    let liveNeighbors = 0;

    this.NEIGHBORS.forEach((neighborCoord) => {
      const neighborRow = r + neighborCoord.row;
      const neighborCol = c + neighborCoord.col;
      if (
        (neighborRow > -1 && neighborRow < this.NUM_ROWS) &&
        (neighborCol > -1 && neighborCol < this.NUM_COLS)
      ) {
        if (this.BOARD[neighborRow][neighborCol]) {
          liveNeighbors++;
        }
      }
    });

    return liveNeighbors;
  }

}
