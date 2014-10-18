define(['text!./viewtemplate.html'], function (template) {
//    console.log('-----------');
//    console.log(template);


    var View = function (board, counter) {
//        template = require(['text!./jsviewtemplate.html']);

        var container = document.getElementById('view-container');
        var div = document.createElement('div')

        div.innerHTML = template;
        container.appendChild(div);



        if (board) {
            this.board = board;

        }
        if (counter){
            this.counter = counter;
        }

    };

    View.prototype.displayBoard = function (board) {


        var htmlBoard = document.getElementById('board');


        if (board) {

            for (var rowNumber = 0; rowNumber < board.length; rowNumber++) {
//                console.log('board',board);
//                console.log('row',row);
                var row = document.createElement('div');
                row.className = 'row';

//                console.log(board[rowNumber]);
                for (var column = 0; column < board[rowNumber].length; column++) {
                    var tile = document.createElement('div');

                    var className = 'tile';
                    if (board[rowNumber][column] === 1)
                        className += ' on';
                    tile.className = className;
                    row.appendChild(tile);

                }
                htmlBoard.appendChild(row);

            }
        }

    };
    View.prototype.removeHtmlBoard = function () {


        var htmlBoard = document.getElementById('board');
        if (htmlBoard) {

            htmlBoard.innerHTML = '';
        }


    };

    View.prototype.draw = function () {

//        console.log('called');
        this.removeHtmlBoard();
        this.displayBoard(this.board.board);
        this.updateCounterDisplay()
    };

    View.prototype.addCounter = function () {
        var container = document.getElementById('view-container');
        var div = document.createElement('div');
        div.id='generationCounter';
        div.innerText='Generation: '+ this.counter.getCount();
        container.appendChild(div);

    };

    View.prototype.updateCounterDisplay = function () {

        this.removeCounterDisplay();
        this.addCounter();
    };
    View.prototype.removeCounterDisplay = function(){
        var   htmlCounter = document.getElementById('generationCounter');
        htmlCounter.parentNode.removeChild(htmlCounter);
    };

    View.prototype.subscribe = function (board) {


        board.addSubscriber(this.draw.bind(this));

    };


    return View;

});