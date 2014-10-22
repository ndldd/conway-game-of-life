/**
 *@fileOverview
 *@version 1.0
 *
 * @namespace conway.CanvasView
 * @constructor
 * @param {string} board - The title of the book.
 * @param {string} counter - The author of the book.
 * @param {string} canvasTemplate - The author of the book.
 */
define(['text!./canvasviewtemplate.html', './view', '../app.constants'], function (canvasTemplate, View, constants) {


    var TILE_SIZE = constants.tileSize;
    var PADDING = constants.padding;


//    var CELLNUMBER = 500;
//    var WIDTH = CELLNUMBER*(TILE_SIZE + PADDING);
//    var HEIGTH = WIDTH;



    CanvasView = function (board, counter, canvasTemplate) {
        View.call(this, board, counter, canvasTemplate);


    };

    CanvasView.prototype = Object.create(View.prototype);

    CanvasView.prototype.constructor = CanvasView;

//    return CanvasView;
    CanvasView.prototype.calculateCanvasSize= function (board, tileSize, padding) {
        return board.length * (tileSize+padding);
    };

    CanvasView.prototype.displayBoard = function (board, canvas) {
        var width = this.calculateCanvasSize(board, TILE_SIZE,PADDING);
        var height = width;
        if (!canvas) {
            canvas = document.getElementById("board");
            canvas.width  = width;
            canvas.height = height;

        }
        canvas.style.minWidth=0; // reset html
        var context = canvas.getContext('2d');

        this.drawBoardBackground(context, width, height);


        for (var r = 0; r < board.length; r++) {

            this.drawRow(context,board[r], r);

        }

//        var newNode= document.createTextNode('tx')
//        newNode.textContent='test'+this.counter.getCount();
//
//     var board = document.getElementById('board') ;
//        board.appendChild(newNode);
//        console.log(this.board);
    };
    CanvasView.prototype.drawBoardBackground = function (context, width, heigth) {
        context.fillStyle = 'lightgray';
        context.fillRect(0, 0, width, heigth);

    };


    CanvasView.prototype.drawTile = function (context, xPosition, yPosition, TILE_SIZE, status) {

        if (status) {

        context.fillStyle = 'black';
        }
        else{
            context.fillStyle = 'white';
        }

        context.fillRect(xPosition, yPosition, TILE_SIZE, TILE_SIZE);


    };

    CanvasView.prototype.drawRow = function (context, columnArray, rowNumber) {
        var xPosition = 0;
        var yPosition = rowNumber * ( TILE_SIZE + PADDING);

        for (var i = 0, len = columnArray.length; i < len; i++) {

            var alive = columnArray[i]==1? true : false;

            this.drawTile(context, xPosition, yPosition, TILE_SIZE, alive );
            xPosition += PADDING + TILE_SIZE;
        }

    };

    return CanvasView;


});