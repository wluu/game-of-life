// Conway's Game of Life: https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life

import { Injectable } from '@angular/core';

import { CellInfo } from '../misc/cell-info.interface';
import { debug } from '../misc/debug.logger';

import { TrackingService } from './tracking.service';

@Injectable()
export class LifeService {

  newGeneration: CellInfo[];

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
    this.newGeneration = [];

    // matrix to track already checked dead cells; don't want to check again
    const checkedDeadCells = this.tracking.board.map((someRow) => {
      // slice clones the array row and the row in tracking.board will not be modified or referenced
      return someRow.slice().fill(false);
    });

    for (let curRow = 0; curRow < this.tracking.totalRows; curRow++) {
      for (let curCol = 0; curCol < this.tracking.totalCols; curCol++) {
        const liveCell = this.tracking.board[curRow][curCol];

        if (liveCell) {
          debug.log('liveCell: curRow:', curRow, ', curCol:', curCol);
          let liveNeighbors = this.anyLiveNeighborsAt(curRow, curCol);

          // Any live cell with fewer than two live neighbors dies, as if caused by under population.
          // Any live cell with more than three live neighbors dies, as if by overpopulation.
          if (liveNeighbors < 2 || liveNeighbors > 3) {
            debug.log('cell dies');
            this.newGeneration.push({
              row: curRow,
              col: curCol,
              alive: false
            });
          } else {
            // Any live cell with two or three live neighbors lives onto the next generation.
            debug.log('cell lives onto next generation');
            this.newGeneration.push({
              row: curRow,
              col: curCol,
              alive: true
            });
          }

          this.getDeadNeighborsAt(curRow, curCol).forEach((deadNeighbor) => {
            debug.log('deadNeighbor.row:', deadNeighbor.row, ', deadNeighbor.col:', deadNeighbor.col);
            const cellIsChecked = checkedDeadCells[deadNeighbor.row][deadNeighbor.col];

            if (!cellIsChecked) {
              debug.log('mark dead cell');
              checkedDeadCells[deadNeighbor.row][deadNeighbor.col] = true;
              liveNeighbors = this.anyLiveNeighborsAt(deadNeighbor.row, deadNeighbor.col);

              // Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.
              if (liveNeighbors === 3) {
                debug.log('dead cell becomes a live cell');
                this.newGeneration.push({
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
    debug.log('newGeneration:', this.newGeneration);
  }

  private anyLiveNeighborsAt(r: number, c: number): number {
    let liveNeighbors = 0;

    this.checkNeighborsAt(r, c, (neighbor: CellInfo) => {
      if (neighbor.alive) {
        liveNeighbors++;
      }
    });

    debug.log('liveNeighbors:', liveNeighbors);
    return liveNeighbors;
  }

  private getDeadNeighborsAt(r: number, c: number): any[] {
    const deadNeighbors = [];

    this.checkNeighborsAt(r, c, (neighbor: CellInfo) => {
      if (!neighbor.alive) {
        deadNeighbors.push({
          row: neighbor.row,
          col: neighbor.col,
        });
      }
    });

    debug.log('deadNeighbors:', deadNeighbors);
    return deadNeighbors;
  }

  private checkNeighborsAt(r: number, c: number, cb: (info: CellInfo) => void) {
    this.neighbors.forEach((neighborCoord) => {
      const neighborRow = r + neighborCoord.row;
      const neighborCol = c + neighborCoord.col;

      if (this.isWithinBorders(neighborRow, neighborCol)) {
        cb({
          row: neighborRow,
          col: neighborCol,
          alive: this.tracking.board[neighborRow][neighborCol]
        });
      }
    });
  }

  private isWithinBorders(r: number, c: number) {
    return (r > -1 && r < this.tracking.totalRows) && (c > -1 && c < this.tracking.totalCols);
  }

}
