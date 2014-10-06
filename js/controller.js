define( ['./board'],function (Board) {


    Controller = function () {


    };

//a =new Board();
//    var Board =require(['./board']);


    Controller.prototype.createBoard = function () {

        board = new Board(100, 100);

        board.makeRandom();
        this.world = board;


    };

    Controller.prototype.drawBoard = function () {


        var board = document.getElementById('board');

//    console.log(this.world);
        var rows = this.world.board;
        for (row in rows) {
            for (column in rows[row]) {
                var tile = document.createElement('div');
                if (rows[row][column] === 0) {

                    tile.className = 'tile off';
                }
                else tile.className = 'tile on';
                board.appendChild(tile);
            }
            board.appendChild(document.createElement('br'));
        }

    };


    Controller.prototype.removeBoard = function () {
        var board = document.getElementById('board');
//    console.log(board);
//    board.innerHTML = '';


    };


    Controller.prototype.refresh = function () {

        var board = document.getElementById('board');
        board.innerHTML = '';
        var newBoard = new Board(100, 100);
        newBoard.makeRandom();
//    this.world =          newBoard;
        this.world.makeNextGeneration();
//    console.log();
//    console.log(this.world.nextGeneration)
        this.world.board = this.world.nextGeneration;


//    console.log(this.world);
        var rows = this.world.board;
        for (row in rows) {
            for (column in rows[row]) {
                var tile = document.createElement('div');
                if (rows[row][column] === 0) {

                    tile.className = 'tile off';
                }
                else tile.className = 'tile on';
                board.appendChild(tile);
            }
            board.appendChild(document.createElement('br'));
        }
    }
    return Controller;


});

