export class DisabledControls {

  private play: boolean;
  private next: boolean;
  private stop: boolean;
  private clear: boolean;
  private seed: boolean;

  constructor() {
    this.play = false;
    this.next = false;
    this.stop = false;
    this.clear = false;
    this.seed = false;
  }

  disablePlay() {
    this.play = true;
    return this;
  }

  disableNext() {
    this.next = true;
    return this;
  }

  disableStop() {
    this.stop = true;
    return this;
  }

  disableClear() {
    this.clear = true;
    return this;
  }

  disableSeed() {
    this.seed = true;
    return this;
  }
}
