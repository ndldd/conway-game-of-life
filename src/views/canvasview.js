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
define(['text!./canvasviewtemplate.html', './view', '../conwayapp.constants'], function (canvasTemplate, View, constants) {

    var TILE_SIZE = constants.tileSize;
    var PADDING = constants.padding;

    var CanvasView = function (board, counter) {
        View.call(this, board, counter, canvasTemplate);
    };

    CanvasView.prototype = Object.create(View.prototype);
    CanvasView.prototype.constructor = CanvasView;

    CanvasView.prototype.calculateCanvasSize = function (board, tileSize, padding) {
        return board.length * (tileSize + padding) + padding;
    };

    CanvasView.prototype.displayBoard = function (board, canvas) {
        var width = this.calculateCanvasSize(board, TILE_SIZE, PADDING);
        var height = width;
        if (!canvas) {
            canvas = document.getElementById("board");
            canvas.width = width;
            canvas.height = height;
        }
        canvas.style.minWidth = 0; // reset html
        var context = canvas.getContext('2d');

        this.drawBoardBackground(context, width + PADDING, height + PADDING);

        for (var r = 0; r < board.length; r++) {
            this.drawRow(context, board[r], r);
        }
    };

    CanvasView.prototype.drawBoardBackground = function (context, width, height) {
        context.fillStyle = 'lightgray';
        context.fillRect(0, 0, width + PADDING, height + PADDING);
    };

    CanvasView.prototype.drawTile = function (context, xPosition, yPosition, size, isAlive) {
        if (isAlive) {
            context.fillStyle = 'black';
        }
        else {
            context.fillStyle = 'white';
        }
        context.fillRect(xPosition, yPosition, size, size);
    };

    CanvasView.prototype.drawRow = function (context, columnArray, rowNumber) {
        var xPosition = 0 + PADDING;
        var yPosition = rowNumber * ( TILE_SIZE + PADDING) + PADDING;

        for (var i = 0, len = columnArray.length; i < len; i++) {
            var isAlive = columnArray[i] === 1 ? true : false;
            this.drawTile(context, xPosition, yPosition, TILE_SIZE, isAlive);
            xPosition += PADDING + TILE_SIZE;
        }
    };

    return CanvasView;
});