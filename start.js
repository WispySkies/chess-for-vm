var Chess = require('./chess').Chess;
var chess = new Chess();
console.log(chess.get('a2'));
console.log(chess.get('a7'));

const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

var current = 0;

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

function score(player) {
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

  if (player = 0) {
    return white - black;
  } else {
    return black - white;
  }
}

var number_runs = 10000;

var d = new Date();
var last = d.getTime();

function nextmove() {
  last = d.getTime();
  var moves = chess.moves({ verbose: true });
  // console.log(moves);
  var bestMove = null;
  // var lastPoint = 0;
  // for (index in moves) {
  //   if (chess.get(moves[index].to) == null) {
  //     continue;
  //   }
  //   if (getPointValue(chess.get(moves[index].to)) > lastPoint) {
  //     bestMove = moves[index];
  //     lastPoint = getPointValue(chess.get(moves[index].to));
  //   }
  // }
  bestMove = minimax(2, current);
  if (bestMove == null) {
    bestMove = moves[Math.floor(Math.random() * moves.length)];
  }
  chess.move(bestMove);
  console.log(chess.ascii());
  current ^= 1;
  if (chess.game_over()) {
    console.log("game over");
    return;
  }
  if (number_runs > 0) {
    number_runs--;
    nextmove();
  }
}

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

function minimax(depth, player) {
  console.log("minimax");
  var p = player == "white" ? 0 : 1;
  var moves = chess.moves({ verbose: true });
  var score = -9999;
  var best = null;
  console.log("Evaluating " + moves.length + " moves");
  for (index in moves) {
    var m = max(depth, moves[index].to, chess.fen(), p);
    if (m > score) {
      score = m;
      best = moves[index];
    }
  }
  return best;
}

function max(depth, move, fen, player) {
  // console.log("\n\n\n" + depth);
  var c = new Chess();
  c.load(fen);
  c.move(move);

  if (depth == 0) return score(player);

  var moves = c.moves({ verbose: true });
  var max = -9999;
  // console.log("Max: Evaluating"  + moves.length + " moves");
  for (index in moves) {
    var m = mini(depth - 1, moves[index].to, c.fen(), player);
    if (m > max) {
      max = m;
    }
  }

  return max;
}

function mini(depth, move, fen, player) {
  var c = new Chess();
  c.load(fen);
  c.move(move);

  if (depth == 0) return score(player);

  var moves = c.moves({ verbose: true });
  var min = 9999;

// console.log("Mini: Evaluating"  + moves.length + " moves");
  for (index in moves) {
    var m = max(depth - 1, moves[index].to, c.fen(), player);
    if (m < min) {
      min = m;
    }
  }

  return max;
}

rl.question("player or cpu? ", function(input) {
  if (input == "player") {
    player();
  } else {
    cpu();
  }
  rl.close();
});
