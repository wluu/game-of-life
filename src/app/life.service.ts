// Conway's Game of Life: https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life

import { Injectable } from '@angular/core';

import { TrackingService } from './tracking.service';

@Injectable()
export class LifeService {

  private neighbors: any[];
  private tracking: TrackingService;

  constructor() {
    this.neighbors = [
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

  useTrackingService(t: TrackingService) {
    this.tracking = t;
  }

  applyRules() {
    const newGeneration = [];

    for (let r = 0; r < this.tracking.totalRows; r++) {
      for (let c = 0; c < this.tracking.totalCols; c++) {
        const liveCell = this.tracking.board[r][c];

        if (liveCell) {
          // NOTE: used for debugging
          console.log('r:', r, ', c:', c);

          const liveNeighbors = this.anyLiveNeighborsAt(r, c);

          // Any live cell with fewer than two live neighbors dies, as if caused by under population.
          // Any live cell with more than three live neighbors dies, as if by overpopulation.
          if (liveNeighbors < 2 || liveNeighbors > 3) {
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
          // Any dead cell with exactly three live neighbors becomes a live cell; add to newGeneration
          // NOTE: will need a matrix to track which cell is being checked so we don't need to check the same cells over
        }
      }
    }

    // TODO: emit the tracking board data which will have the updated board
    // emit newGeneration
  }

  private anyLiveNeighborsAt(r: number, c: number): number {
    let liveNeighbors = 0;

    // NOTE: used for debugging
    const temp = [];

    this.neighbors.forEach((neighborCoord) => {
      const neighborRow = r + neighborCoord.row;
      const neighborCol = c + neighborCoord.col;

      if (this.cellWithinBorders(neighborRow, neighborCol)) {
        const neighborIsAlive = this.tracking.board[neighborRow][neighborCol];

        if (neighborIsAlive) {
          liveNeighbors++;

          // NOTE: used for debugging
          temp.push({
            row: neighborRow,
            col: neighborCol,
          });

        }
      }
    });

    // NOTE: used for debugging
    console.log(temp);

    return liveNeighbors;
  }

  private cellWithinBorders(r: number, c: number) {
    return (r > -1 && r < this.tracking.totalRows) && (c > -1 && c < this.tracking.totalCols);
  }

}
