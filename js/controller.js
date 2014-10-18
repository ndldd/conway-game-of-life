define(['./models/board' ], function (Board ) {


//    var counter = new Counter();

    var Controller = function (counter, simRunner, view) {

        if(view){
            this.view=view;
            this.displayCounter();
        };
        this.timeouts = [];
        if (counter != null){

        this.generationCounter =  counter;

        }


        this.name = 'classic / No Canvas';
        if (simRunner){
            this.simRunner = simRunner;
        }

    };


    Controller.prototype.startSimulation = function(){
        this.simRunner.start();

    };
    Controller.prototype.resetSimulation = function () {
     this.simRunner.reset();
    };

    Controller.prototype.displayCounter = function () {

        this.view.addCounter();

    };




//a =new Board();
//    var Board =require(['./board']);


//    Controller.prototype.createBoard = function () {
//
//        var board = this.board = new Board(100, 100);
//        this.halt = false;
//
//        board.makeRandom();
//        this.world = board;
//
//
//    };

//    Controller.prototype.displayCounter= function(){
//
//        var board = document.getElementById('view-container');
//        var counter = document.createElement('p');
//        counter.id = 'generationCounter';
//        counter.innerText= 'current Generation: ' + String(this.generationCounter.getCount());
//
//        board.parentElement.insertBefore(counter, board);
//
//    };
//    Controller.prototype.updateCounter = function(){
//        var counter = document.getElementById('generationCounter');
//        counter.innerText = 'current Generation: ' + String(this.generationCounter.getCount());
//
//    };
//    Controller.prototype.drawBoard = function (callback) {
//
//        var board = document.getElementById('board');
//
//        var rows = this.world.board;
//        for (row in rows) {
//            var htmlRow = document.createElement('div');
//            htmlRow.className = 'row';
//            for (column in rows[row]) {
//                var tile = document.createElement('div');
//                if (rows[row][column] === 0) {
//
//                    tile.className = 'tile off';
//                }
//                else {
//                    tile.className = 'tile on'
//                    ;
//                }
//
//
//                htmlRow.appendChild(tile);
//            }
//            board.appendChild(htmlRow);
//        }
//        if (callback != null) {
//
//            callback();
//        }
//
//    };

    Controller.prototype.stopSimulation = function () {

        this.simRunner.stop();

    }


//    Controller.prototype.removeBoard = function () {
//        var board = document.getElementById('board');
//        board.innerHTML = '';
//    };
//
//
//    Controller.prototype.stop = function () {
//        for (i in this.timeouts) {
////            window.clearTimeout(i);
//        }
////        console.log('---------------');
////        console.log(this.timeouts);
//        this.halt = true;
////        console.log('stop');
//    };
//
//    Controller.prototype.continue = function () {
//        this.halt = false;
//        this.refresh();
//    };
//    Controller.prototype.reset = function () {
//        this.halt = true;
//        this.board.makeRandom();
//        this.removeBoard();
//        this.drawBoard();
//        this.generationCounter.reset();
//        this.updateCounter();
//    };


//    Controller.prototype.refresh = function () {
//
//
//        var board = document.getElementById('board');
//        if (!this.halt) {
//            board.innerHTML = '';
//            var newBoard = new Board(100, 100);
//            newBoard.makeRandom();
//
//            this.world.makeNextGeneration();
//            this.generationCounter.add();
//            this.updateCounter();
//            this.world.board = this.world.nextGeneration;
//
//
//
//            var self = this;
//
//
//            this.drawBoard(
//                function () {
//
//
//                    self.timeouts.push(window.setTimeout(function () {
//                        self.refresh();
//                    }, 20));
//
//                    for (i in self.timeouts) {
//                        window.clearTimeout(i);
//                    }
//                }
//            );
//        }


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
//    };
    return Controller;


});

