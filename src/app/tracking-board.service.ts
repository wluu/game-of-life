import { Injectable } from '@angular/core';

@Injectable()
export class TrackingBoardService {

  private trackingBoard: boolean[][];

  constructor() {
    this.trackingBoard = [];
  }

  // initializing the tracking board
  addNewRow(whichRow: number, columns: number) {
    this.trackingBoard[whichRow] = new Array(columns);
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
    this.trackingBoard[row][col] = cellStyleInfo.mark;
  }
}
