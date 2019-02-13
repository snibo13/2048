let field = [
  [],
  [],
  [],
  []
]
let pieceSize = 60;
let startingPosition = pieceSize;
let margin = 5;
let colors = ['#ddddda', '#c2c8c5', '#94b0b7', '#7697a0', '#4a707a']
class Box {
  constructor(val = 0) {
    this.val = val;
  }

}

function setup() {
  createCanvas(pieceSize * 8 + margin * 7, pieceSize * 8 + margin * 7);
  // row = fill(0);
  // fill('#488');
  field = Array.from(new Array(4), row =>
    Array.from(new Array(4), col => new Box()));
  start();
  showField();
}

function draw() {
  showField();
}

function shiftLeft() {
  for (let y = 0; y < 4; y++) {
    for (let x = 1; x < 4; x++) {
      //Iterator for positions to the left
      let numberOfPositionsLeft = x;
      let z = numberOfPositionsLeft;
      while (z > 0) {
        if (field[y][x - z].val == 0 && field[y][x] != 0) {
          field[y][x - z].val = field[y][x].val;
          field[y][x].val = 0;
        }
        z--;
      }
    }
  }
}

function shiftUp() {
  for (let y = 1; y < 4; y++) {
    for (let x = 0; x < 4; x++) {
      if (field[y-1][x].val == 0 && field[y][x] != 0) {
        field[y-1][x].val = field[y][x].val;
        field[y][x].val = 0;
      }
    }
  }
}

function shiftRight() {
  for (let y = 0; y < 4; y++) {
    for (let x = 0; x < 3; x++) {
      if (field[y][x + 1].val == 0 && field[y][x] != 0) {
        field[y][x + 1].val = field[y][x].val;
        field[y][x].val = 0;
      }
    }
  }
}

function shiftDown() {
  for (let y = 0; y < 3; y++) {
    for (let x = 0; x < 4; x++) {
      if (field[y + 1][x].val == 0 && field[y][x] != 0) {
        field[y + 1][x].val = field[y][x].val;
        field[y][x].val = 0;
      }
    }
  }
}

function keyPressed() {
  if (keyCode == LEFT_ARROW)
    shiftLeft();
  if (keyCode == RIGHT_ARROW)
    shiftRight();
  if (keyCode == UP_ARROW)
    shiftUp();
  if (keyCode == DOWN_ARROW)
    shiftDown();
}

function start() {
  let posXOne, posXTwo, posYOne, posYTwo = 0;
  while (posXOne == posXTwo || posYOne == posYTwo) { //Making sure random pieces aren't in the same position
    posXOne = Math.floor(Math.random() * 4); //X Position of First spawned piece
    posXTwo = Math.floor(Math.random() * 4); //X Position of second spawned peice
    posYOne = Math.floor(Math.random() * 4); //Y Position of first spawned piece
    posYTwo = Math.floor(Math.random() * 4); //Y Position of second spawned piece
  }
  field[posYOne][posXOne] = new Box(2);
  field[posYTwo][posXTwo] = new Box(2);

}

function showField() {
  for (let y = 0; y < 4; y++) {
    for (let x = 0; x < 4; x++) {
      // fill(Math.log(colors[field[y][x].val])/Math.log(2) - 1); //Change of base log > 10 (x) = ln(x)/ln(10)
      rect(x * (pieceSize + margin) + startingPosition, y * (pieceSize + margin) + startingPosition, pieceSize, pieceSize);
      textAlign(CENTER, CENTER);
      text(field[y][x].val, x * (pieceSize + margin) + startingPosition, y * (pieceSize + margin) + startingPosition, pieceSize, pieceSize)
    }
  }
}
