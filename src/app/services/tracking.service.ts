import { Injectable } from '@angular/core';

import { CellInfo } from '../misc/cell-info.interface';

@Injectable()
export class TrackingService {

  totalRows: number;
  totalCols: number;
  board: boolean[][];

  // initializing the tracking board
  initBoard(rows: number, cols: number) {
    this.totalRows = rows;
    this.totalCols = cols;

    this.board = [];

    for (let r = 0; r < this.totalRows; r++) {
      for (let c = 0; c < this.totalCols; c++) {
        this.board[r] = new Array(this.totalCols).fill(false);
      }
    }
  }

  mark(cell: CellInfo) {
    this.board[cell.row][cell.col] = cell.alive;
  }

  isBoardEmpty() {
    let countLiveCells = 0;

    this.board.forEach((row: boolean[]) => {
      row.forEach((live: boolean) => {
        if (live) {
          countLiveCells++;
        }
      });
    });

    return countLiveCells === 0;
  }
}
