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

    // matrix to track already checked dead cells; don't want to check again
    const checkedDeadCells = this.tracking.board.map((someRow) => {
      // slice clones the array row and the row in tracking.board will not be modified
      return someRow.slice().fill(false);
    });

    for (let curRow = 0; curRow < this.tracking.totalRows; curRow++) {
      for (let curCol = 0; curCol < this.tracking.totalCols; curCol++) {
        const liveCell = this.tracking.board[curRow][curCol];

        if (liveCell) {
          // NOTE: used for debugging
          console.log('curRow:', curRow, ', curCol:', curCol);

          let liveNeighbors = this.anyLiveNeighborsAt(curRow, curCol);

          // Any live cell with fewer than two live neighbors dies, as if caused by under population.
          // Any live cell with more than three live neighbors dies, as if by overpopulation.
          if (liveNeighbors < 2 || liveNeighbors > 3) {
            newGeneration.push({
              row: curRow,
              col: curCol,
              alive: false
            });
          } else {
            // Any live cell with two or three live neighbors lives on to the next generation.
            newGeneration.push({
              row: curRow,
              col: curCol,
              alive: true
            });
          }

          this.getDeadNeighborsAt(curRow, curCol).forEach((deadNeighbor) => {
            // NOTE: used for debugging
            console.log('deadNeighbor.row:', deadNeighbor.row, ', deadNeighbor.col:', deadNeighbor.col);

            const cellIsChecked = checkedDeadCells[deadNeighbor.row][deadNeighbor.col];

            if (!cellIsChecked) {
              // NOTE: used for debugging
              console.log('mark cell');

              checkedDeadCells[deadNeighbor.row][deadNeighbor.col] = true;
              liveNeighbors = this.anyLiveNeighborsAt(deadNeighbor.row, deadNeighbor.col);

              // Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.
              if (liveNeighbors === 3) {
                newGeneration.push({
                  row: deadNeighbor.row,
                  col: deadNeighbor.col,
                  alive: true
                });
              }
            }
          });
        }
      }
    }

    // TODO: emit the tracking board data which will have the updated board
    // emit newGeneration
  }

  private anyLiveNeighborsAt(r: number, c: number): number {
    let liveNeighbors = 0;

    this.checkNeighborsAt(r, c, (info) => {
      if (info.neighborIsAlive) {
        liveNeighbors++;
      }
    });

    // NOTE: used for debugging
    console.log('liveNeighbors:', liveNeighbors);

    return liveNeighbors;
  }

  private getDeadNeighborsAt(r: number, c: number): any[] {
    const deadNeighbors = [];

    this.checkNeighborsAt(r, c, (info) => {
      if (!info.neighborIsAlive) {
        deadNeighbors.push({
          row: info.neighborRow,
          col: info.neighborCol,
        });
      }
    });

    // NOTE: used for debugging
    console.log('deadNeighbors:', deadNeighbors);

    return deadNeighbors;
  }

  private checkNeighborsAt(r: number, c: number, cb: (info: any) => void) {
    this.neighbors.forEach((neighborCoord) => {
      const neighborRow = r + neighborCoord.row;
      const neighborCol = c + neighborCoord.col;

      if (this.isWithinBorders(neighborRow, neighborCol)) {
        cb({
          neighborIsAlive: this.tracking.board[neighborRow][neighborCol],
          neighborRow: neighborRow,
          neighborCol: neighborCol
        });
      }
    });
  }

  private isWithinBorders(r: number, c: number) {
    return (r > -1 && r < this.tracking.totalRows) && (c > -1 && c < this.tracking.totalCols);
  }

}
