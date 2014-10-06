//board = new Board(32,44);
//console.log(board);
//
//board.makeRandom()
//console.log(board);

var controller = new Controller();


controller.createBoard();
controller.drawBoard();
controller.removeBoard();

setInterval(function (){

controller.refresh();
}, 20);
