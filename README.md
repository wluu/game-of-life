# game-of-life WIP
Conway's Game of Life

# My Notes

[States v2](https://drive.google.com/file/d/0B9DrOVKPxr98b2xfREU3VzB3ZzE4ZlQxNGFzMnBaaHBfeTNz/view?usp=sharing)

[Layout v2](https://drive.google.com/file/d/0B9DrOVKPxr98clZmVjl6dnRVZGxnc29SY19nYUtSQnFtVTY0/view?usp=sharing)

[High Level Rules](https://drive.google.com/file/d/0B9DrOVKPxr98VGVRQTRIV2hHLXEzNmpHRFVUd25HYlVackVV/view?usp=sharing)

# TODOs

Going to break this down into smaller chunks:

- [x] Make the board
  - [x] Forgot to add the borders to the board
- [x] Add event listeners to each cell in the board
  - Change color of any given cell when clicking on them
- [x] Work on game of life rules
  - [x] Add the life rules
  - [x] Mock the control to make sure the rules are correct
- [x] ~~Emit data to the board component~~ Get data from life service so we can actually update the board with new data
- [x] Will need to create some form of game loop so the cells appear to be moving
- [x] Create a class for the debugging logs and the debugging text on the board
- [x] Re-evaluate the state flows and layout design
- [ ] Add the controls (minimalistic level)
  - [x] Added the basic layout
  - [x] Hook up the buttons to the board component
  - [x] Add the ability to click and hold to select the cells
    - [x] REFACTOR A BIT
  - [x] Properly disable and enable the control buttons
    - Including when all cells die
  - [x] Add the next button
  - [x] Found bug: if the board is empty by deselecting, the control states are not properly reflected; listen on mouseup and check board if there are any live cells
  - [x] Found bug: hold down on left click does not de-select cells; should do shift + mousedown
  - [x] Add the drop-down list to have initial seeds: blinker, pulsar, pentadecathlon, glider, and lightweight spaceship (from wiki)
    - Read up on https://angular.io/guide/forms
    - ~~Make sure it's properly disabled/enabled during the different states~~
- [x] Look into the cursor change bug
- [x] ~~Add the help icon~~ Add how-to guide at the bottom
- [ ] Check performance/memory
- [ ] Material design???
