var Chess = require('./chess').Chess;
var chess = new Chess();
console.log(chess.get('a2'));
console.log(chess.get('a7'));

const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function player() {
  while (!chess.game_over()) {
    // ask for next move
    // cpu does it

    nextmove();
  }
}

function cpu() {
  nextmove();
}

function score() {
  var white = 40;
  var black = 40;

  for (o in chess.board()) {
    for (i in chess.board()[o]) {
      obj = chess.board()[o][i];
      if (obj == null) continue;

      if (obj.color == "w") {
        if (obj.type == "p") {
          white--;
        } else if (obj.type == "r") {
          white-=5;
        } else if (obj.type == "n") {
          white-=3;
        } else if (obj.type == "b") {
          white-=3;
        } else if (obj.type == "q") {
          white-=10;
        }
      } else {
        if (obj.type == "p") {
          black--;
        } else if (obj.type == "r") {
          black-=5;
        } else if (obj.type == "n") {
          black-=3;
        } else if (obj.type == "b") {
          black-=3;
        } else if (obj.type == "q") {
          black-=10;
        }
      }
    }
  }
  var history = chess.history({ verbose: true });
  if (history.length > 0) {
    var color = history[history.length - 1].color;
    if (color = "w") {
      return white - black;
    } else {
      return black - white;
    }
  } else {
    return 0;
  }
}

var number_runs = 30;

var d = new Date();
var last = d.getTime();

function nextmove() {
  d = new Date();
  last = d.getTime();
  var moves = chess.moves({ verbose: true });
  // console.log(moves);
  var bestMove = null;
  bestMove = minimax(4);
  if (bestMove == null) {
    bestMove = moves[Math.floor(Math.random() * moves.length)];
    console.log("Null Best Move");
  }

  if(chess.move(bestMove) == null) {
    console.log("Illegal move");
  }
  console.log(chess.ascii());
  d = new Date();
  console.log("took " + ((d.getTime() - last) / 1000) + " seconds to move");
  if (chess.game_over()) {
    console.log("game over");
    return;
  }
  if (number_runs > 0) {
    number_runs--;
    nextmove();
  }
}

function minimax(depth) {
  console.log("minimax");
  var moves = chess.moves({ verbose: true });
  var score = -9999;
  var best = null;
  console.log("Evaluating " + moves.length + " moves");
  for (const obj of moves) {
//    console.log("obj: " + obj);
//    console.log(obj);
  //  console.log("MINIMAX: expecting W -> " + chess.turn());
    if (chess.move(obj) == null) {
      throw new Error("Minimax: Illegal move...how?");
    }
  //  console.log("MINIMAX: expecting B -> " + chess.turn());
    var m = max(depth);
    if (m > score) {
      score = m;
      best = obj;
    }
  //  console.log("Pre-undo -> " + chess.turn());
    chess.undo();
  //  console.log("post-undo -> " + chess.turn());
    return best;
  }
}

function max(depth) {
  if (depth == 0) return score();

  var moves = chess.moves({ verbose: true });
  var max = -9999;

  var passes = 0;
//  console.log(moves.length);
  for (const obj of moves) {
//console.log(passes++);
  //  console.log("MAX: expecting B -> " + chess.turn());
//    console.log(obj);
    if (chess.move(obj) == null) {

      throw new Error("Max: Illegal move...how?");
    }
//    console.log("MAX: expecting W -> " + chess.turn());

    var m = mini(depth - 1);

    if (m > max) {
      max = m;
    }

  //  console.log("Max: Pre-undo -> " + chess.turn());
    chess.undo();
    //console.log("Max: Post-undo -> " + chess.turn());
  }

  return max;
}

function mini(depth) {
  if (depth == 0) return score();

  var moves = chess.moves({ verbose: true });
  var min = 9999;

  for (const obj of moves) {
//    console.log("MIN: expecting W -> " + chess.turn());
    if (chess.move(obj) == null) {
      throw new Error("Mini: Illegal move...how?");
    }
//    console.log("MINI: expecting B -> " + chess.turn());

    var m = max(depth - 1);

    if (m < min) {
      min = m;
    }

//console.log("Mini: Pre-undo" + chess.turn());
    (chess.undo());
  //  console.log("Mini: Post-undo" + chess.turn());
  }

  return min;
}

rl.question("player or cpu? ", function(input) {
  if (input == "player") {
    player();
  } else {
    cpu();
  }
  rl.close();
});


function getPointValue(obj) {
  if (obj.type == "p") {
    return 1;
  } else if (obj.type == "r") {
    return 5;
  } else if (obj.type == "n") {
    return 3;
  } else if (obj.type == "b") {
    return 3;
  } else if (obj.type == "q") {
    return 10;
  }
}
