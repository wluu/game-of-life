import { Injectable } from '@angular/core';

@Injectable()
export class TrackingService {

  totalRows: number;
  totalCols: number;
  board: boolean[][];

  constructor() {
    this.board = [];
  }

  // initializing the tracking board
  initBoard(rows: number, cols: number) {
    this.totalRows = rows;
    this.totalCols = cols;

    for (let r = 0; r < this.totalRows; r++) {
      for (let c = 0; c < this.totalCols; c++) {
        this.board[r] = new Array(this.totalCols);
      }
    }
  }

  /*
    cellStyleInfo = {
      row: string,
      col: string,
      mark: boolean
    }

    both 'row' and 'col' will be in the format of: number / auto
  */
  markCell(cellStyleInfo: any) {
    // the grid layout starts index at 1
    const row = parseInt(cellStyleInfo.row.split('/')[0].trim(), 10) - 1;
    const col = parseInt(cellStyleInfo.col.split('/')[0].trim(), 10) - 1;
    this.board[row][col] = cellStyleInfo.mark;
  }
}
