import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'life-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  boardWidth: number;
  boardHeight: number;
  boardMatrix: any[][];
  boardDimensionsStyle: any;

  ngOnInit() {
    // NOTE: manually setting the boardWidth and boardHeight for now
    this.boardWidth = 50;
    this.boardHeight = 30;
    this.boardMatrix = [];

    this.boardDimensionsStyle = {
      'grid-template-columns': `repeat(${this.boardWidth}, 30px)`,
      'grid-template-rows': `repeat(${this.boardHeight}, 30px)`
    };

    for (let row = 0; row < this.boardHeight; row++) {
      this.boardMatrix[row] = new Array(this.boardWidth);

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

        this.boardMatrix[row][col] = {
          // index starts at 1 for grid layout
          'grid-row': row + 1,
          'grid-column': col + 1,
          'border-style': borderStyle
        };
      }
    }
  }

  changeColor($event) {
    const backgroundColor = $event.target.style.backgroundColor;
    $event.target.style.backgroundColor = (!backgroundColor) ? 'red' : '';
  }

}
