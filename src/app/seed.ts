import { CellInfo } from './cell-info.interface';

export const enum Seed {
  Blinker = 'Blinker',
  Pulsar = 'Pulsar',
  Pentadecathlon = 'Pentadecathlon',
  Glider = 'Glider',
  LWSS = 'LWSS'
}

export class InitSeed {
  static blinker(): CellInfo[] {
    return [
      {row: 12, col: 24, alive: true},
      {row: 13, col: 24, alive: true},
      {row: 14, col: 24, alive: true}
    ];
  }

  static pulsar(): CellInfo[] {
    return [
      {row: 6, col: 22, alive: true},
      {row: 6, col: 28, alive: true},
      {row: 7, col: 22, alive: true},
      {row: 7, col: 28, alive: true},
      {row: 8, col: 22, alive: true},
      {row: 8, col: 23, alive: true},
      {row: 8, col: 27, alive: true},
      {row: 8, col: 28, alive: true},
      {row: 10, col: 18, alive: true},
      {row: 10, col: 19, alive: true},
      {row: 10, col: 20, alive: true},
      {row: 10, col: 23, alive: true},
      {row: 10, col: 24, alive: true},
      {row: 10, col: 26, alive: true},
      {row: 10, col: 27, alive: true},
      {row: 10, col: 30, alive: true},
      {row: 10, col: 31, alive: true},
      {row: 10, col: 32, alive: true},
      {row: 11, col: 20, alive: true},
      {row: 11, col: 22, alive: true},
      {row: 11, col: 24, alive: true},
      {row: 11, col: 26, alive: true},
      {row: 11, col: 28, alive: true},
      {row: 11, col: 30, alive: true},
      {row: 12, col: 22, alive: true},
      {row: 12, col: 23, alive: true},
      {row: 12, col: 27, alive: true},
      {row: 12, col: 28, alive: true},
      {row: 14, col: 22, alive: true},
      {row: 14, col: 23, alive: true},
      {row: 14, col: 27, alive: true},
      {row: 14, col: 28, alive: true},
      {row: 15, col: 20, alive: true},
      {row: 15, col: 22, alive: true},
      {row: 15, col: 24, alive: true},
      {row: 15, col: 26, alive: true},
      {row: 15, col: 28, alive: true},
      {row: 15, col: 30, alive: true},
      {row: 16, col: 18, alive: true},
      {row: 16, col: 19, alive: true},
      {row: 16, col: 20, alive: true},
      {row: 16, col: 23, alive: true},
      {row: 16, col: 24, alive: true},
      {row: 16, col: 26, alive: true},
      {row: 16, col: 27, alive: true},
      {row: 16, col: 30, alive: true},
      {row: 16, col: 31, alive: true},
      {row: 16, col: 32, alive: true},
      {row: 18, col: 22, alive: true},
      {row: 18, col: 23, alive: true},
      {row: 18, col: 27, alive: true},
      {row: 18, col: 28, alive: true},
      {row: 19, col: 22, alive: true},
      {row: 19, col: 28, alive: true},
      {row: 20, col: 22, alive: true},
      {row: 20, col: 28, alive: true},
    ];
  }

  static pentadecathlon(): CellInfo[] {
    return [
      {row: 8, col: 24, alive: true},
      {row: 8, col: 25, alive: true},
      {row: 8, col: 26, alive: true},
      {row: 9, col: 25, alive: true},
      {row: 10, col: 25, alive: true},
      {row: 11, col: 24, alive: true},
      {row: 11, col: 25, alive: true},
      {row: 11, col: 26, alive: true},
      {row: 13, col: 24, alive: true},
      {row: 13, col: 25, alive: true},
      {row: 13, col: 26, alive: true},
      {row: 14, col: 24, alive: true},
      {row: 14, col: 25, alive: true},
      {row: 14, col: 26, alive: true},
      {row: 16, col: 24, alive: true},
      {row: 16, col: 25, alive: true},
      {row: 16, col: 26, alive: true},
      {row: 17, col: 25, alive: true},
      {row: 18, col: 25, alive: true},
      {row: 19, col: 24, alive: true},
      {row: 19, col: 25, alive: true},
      {row: 19, col: 26, alive: true},
    ];
  }

  static glider(): CellInfo[] {
    return [
      {row: 0, col: 19, alive: true},
      {row: 1, col: 20, alive: true},
      {row: 2, col: 18, alive: true},
      {row: 2, col: 19, alive: true},
      {row: 2, col: 20, alive: true},
    ];
  }

  static lwss(): CellInfo[] {
    return [
      {row: 12, col: 1, alive: true},
      {row: 12, col: 4, alive: true},
      {row: 13, col: 5, alive: true},
      {row: 14, col: 1, alive: true},
      {row: 14, col: 5, alive: true},
      {row: 15, col: 2, alive: true},
      {row: 15, col: 3, alive: true},
      {row: 15, col: 4, alive: true},
      {row: 15, col: 5, alive: true}
    ];
  }
}
