// Conway's Game of Life: https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life

import { Injectable } from '@angular/core';

@Injectable()
export class LifeService {

  constructor() { }

  applyRules(trackingBoard: boolean[][]) {
    // NOTE: a neighbor includes the diagonals too

    // TODO: 1. Any live cell with fewer than two live neighbors dies, as if caused by under population.
    // TODO: 2. Any live cell with two or three live neighbors lives on to the next generation.
    // TODO: 3. Any live cell with more than three live neighbors dies, as if by overpopulation.

    // TODO: 4. for every live cell, check its EMPTY neighbor and apply the "resurrection" rule:
    // Any dead cell with exactly three live neighbors becomes a live cell

    // TODO: emit the tracking board data which will have the updated board
  }
}
