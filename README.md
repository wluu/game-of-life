# game-of-life WIP
Conway's Game of Life

# My Notes

[States](https://drive.google.com/file/d/0B9DrOVKPxr98b2xfREU3VzB3ZzE4ZlQxNGFzMnBaaHBfeTNz/view?usp=sharing)

[Layout](https://drive.google.com/file/d/0B9DrOVKPxr98clZmVjl6dnRVZGxnc29SY19nYUtSQnFtVTY0/view?usp=sharing)

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
- [ ] Add the controls
  - Start with text to substitute for the image of each control
  - Flesh this part as well when deep in it; will need to hook this part to the rules and the board
