/**
 *@fileOverview
 *@version 1.0
 *
 * @namespace conway.view
 */
define(['text!./viewtemplate.html'], function (htmlTemplate) {

    /**
     * Class for Creating an Board consisting of DIVs
     *
     * @param {Board} board
     * @param {Counter} counter
     * @param specialTemplate
     * @constructor
     */
    var View = function (board, counter, specialTemplate) {


        var container = document.getElementById('view-container');
        var div = document.createElement('div')

        var template = specialTemplate ? specialTemplate : htmlTemplate;

        div.innerHTML = template;
        container.appendChild(div);

        template = null;

        if (board) {
            this.board = board;

        }
        if (counter) {
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
        this.updateCounterDisplay();
    };

    View.prototype.addCounter = function () {
        var container = document.getElementById('view-container');
        var div = document.createElement('div');
        div.id = 'generationCounter';

          var newContent = document.createTextNode('Generation: ' + this.counter.getCount());
        div.appendChild(newContent);


        container.appendChild(div);


    };
    View.prototype.destroy = function () {


        var container = document.getElementById('view-container').innerHTML = "";

        this.unsubscribe(this.board);
        container.innerHTML = "";
    };

    View.prototype.updateCounterDisplay = function () {

        this.removeCounterDisplay();
        this.addCounter();
    };
    View.prototype.removeCounterDisplay = function () {
        try {

            var htmlCounter = document.getElementById('generationCounter');
            htmlCounter.parentNode.removeChild(htmlCounter);
        }
        catch (TypeError) {

        }
    };

    View.prototype.subscribe = function (board) {

        if (!this.registeredCallback) {

            var callback = this.draw.bind(this);
            board.addSubscriber(callback);
            this.registeredCallback = callback;
        }

    };

    View.prototype.unsubscribe = function (board) {


        board.removeSubscriber(this.registeredCallback);
        this.registeredCallback = null;

    };
    return View;

});