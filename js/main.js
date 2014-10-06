//board = new Board(32,44);
//console.log(board);
//
//board.makeRandom()
//console.log(board);


require(['./controller' ], function () {

    var controller = new Controller();
//console.log(Controller);


    controller.createBoard();
    controller.drawBoard();
    controller.removeBoard();

    setInterval(function () {

        controller.refresh();
    }, 20);
});
