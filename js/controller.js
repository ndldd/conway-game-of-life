define(['./board'], function (Board) {


    Controller = function () {

        this.timeouts = [];

        this.name = 'classic / No Canvas';

    };

//a =new Board();
//    var Board =require(['./board']);


    Controller.prototype.createBoard = function () {

       var  board = this.board = new Board(100, 100);
        this.halt = false;

        board.makeRandom();
        this.world = board;



    };

    Controller.prototype.drawBoard = function (callback) {


        var board = document.getElementById('board');

//    console.log(this.world);
        var rows = this.world.board;
        for (row in rows) {
            var htmlRow = document.createElement('div');
            htmlRow.className='row';
            for (column in rows[row]) {
                var tile = document.createElement('div');
                if (rows[row][column] === 0) {

                    tile.className = 'tile off';
                }
                else {
                    tile.className = 'tile on'
                    ;
                }


                htmlRow.appendChild(tile);
            }
            board.appendChild(htmlRow);
        }
        if (callback != null) {

            callback();
        }

    };


    Controller.prototype.removeBoard = function () {
        var board = document.getElementById('board');
//    console.log(board);
    board.innerHTML = '';


    };


    Controller.prototype.stop = function () {
        for (i in this.timeouts) {
//            window.clearTimeout(i);
        }
        console.log('---------------');
        console.log(this.timeouts);
        this.halt = true;
        console.log('stop');
    };

    Controller.prototype.continue = function(){
        this.halt = false;
        this.refresh();
    }
    Controller.prototype.reset = function(){
        this.halt = true;
        this.board.makeRandom();
        this.removeBoard()
        this.drawBoard()
    }


    Controller.prototype.refresh = function () {


        var board = document.getElementById('board');
        if (!this.halt) {
        board.innerHTML = '';
        var newBoard = new Board(100, 100);
        newBoard.makeRandom();
//    this.world =          newBoard;
        this.world.makeNextGeneration();
//    console.log();
//    console.log(this.world.nextGeneration)
        this.world.board = this.world.nextGeneration;

        var self = this;


            this.drawBoard(
                function () {

//                window.clearTimeout();
                    self.timeouts.push(window.setTimeout(function () {
                        self.refresh();
                    }, 20));
//                console.log(self.timeouts);
                    for (i in self.timeouts) {
                        window.clearTimeout(i);
                    }
//                self.timeouts.shift();
                }
            );
        }


//
////    console.log(this.world);
//        var rows = this.world.board;
//        for (row in rows) {
//            for (column in rows[row]) {
//                var tile = document.createElement('div');
//                if (rows[row][column] === 0) {
//
//                    tile.className = 'tile off';
//                }
//                else tile.className = 'tile on';
//                board.appendChild(tile);
//            }
//            board.appendChild(document.createElement('br'));
//        }
    } ;
    return Controller;


});

