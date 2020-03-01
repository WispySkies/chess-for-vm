var Chess = require('./chess').Chess;
var chess = new Chess();


console.log("Moves, white")
var w1 = console.log(chess.moves())

console.log("Moving first white move")
console.log(chess.move(chess.moves()[0]))

console.log("Undoing last move")
console.log(chess.undo())

console.log("Moves, white (should be the same)")
var w2 = console.log(chess.moves())

console.log(w1 == w2)

console.log("Moving white move again")
console.log(chess.move(chess.moves()[0]))

console.log("Moves, black")
var b1 = console.log(chess.moves())

console.log("Moving black")
console.log(chess.move(chess.moves()[0]))

console.log("Undoing black")
console.log(chess.undo())

var b2 = console.log("Moves, black (should be the same)")
console.log(chess.moves())

console.log(b1 == b2)

console.log(chess.undo())
console.log(chess.turn())

for (const obj of chess.moves({verbose: true})) {
  console.log(obj)
}
