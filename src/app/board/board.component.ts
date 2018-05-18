import { Component, OnInit } from '@angular/core';

import { LifeService } from '../life.service';
import { TrackingService } from '../tracking.service';

@Component({
  selector: 'life-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
  providers: [TrackingService, LifeService]
})
export class BoardComponent implements OnInit {

  private boardWidth: number;
  private boardHeight: number;
  private cellsStyle: any[][];
  private boardDimensionStyle: any;

  constructor(
    private tracking: TrackingService,
    private life: LifeService
  ) {
    // NOTE: manually setting the boardWidth and boardHeight for now
    this.boardHeight = 30;
    this.boardWidth = 50;
    this.cellsStyle = [];
  }

  ngOnInit() {
    this.tracking.initBoard(30, 50);

    this.boardDimensionStyle = {
      'grid-template-columns': `repeat(${this.boardWidth}, 30px)`,
      'grid-template-rows': `repeat(${this.boardHeight}, 30px)`
    };

    for (let row = 0; row < this.boardHeight; row++) {
      this.cellsStyle[row] = new Array(this.boardWidth);

      for (let col = 0; col < this.boardWidth; col++) {
        let borderStyle = '';

        // creating cell borders from left to right on each row; starting point (0, 0)
        if (row === 0 && col === 0) {
          // starting at (0, 0), all the borders should be solid
          borderStyle = 'solid';
        } else if (row === 0) {
          // after (0, 0), all cells on the first row will have:
          borderStyle = 'solid solid solid none';
        } else if (col === 0) {
          // moving to the next rows, the cells in the first column will have:
          borderStyle = 'none solid solid solid';
        } else {
          // and the cells after the after column will have:
          borderStyle = 'none solid solid none';
        }

        this.cellsStyle[row][col] = {
          // index starts at 1 for grid layout
          'grid-row': row + 1,
          'grid-column': col + 1,
          'border-style': borderStyle
        };
      }
    }
  }

  updateCell($event: any) {
    const backgroundColor = $event.target.style.backgroundColor;

    const cellStyleInfo = {
      row: <string>$event.target.style.gridRow,
      col: <string>$event.target.style.gridColumn,
      mark: false
    };

    if (!backgroundColor) {
        $event.target.style.backgroundColor = 'red';
        cellStyleInfo.mark = true;
    } else {
        $event.target.style.backgroundColor = '';
    }

    this.tracking.markCell(cellStyleInfo);
  }

  // NOTE: used for testing the rules!
  fooTest() {
    this.life.useTrackingService(this.tracking);
    this.life.applyRules();

    // TODO: use this to update the board with a new generation of cells
    console.log('newGeneration:', this.life.newGeneration);
  }
}
