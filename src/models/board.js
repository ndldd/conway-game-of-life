define(function () {


    function Board(rows, columns, counter) {

        this.rows = rows;
        this.columns = columns;
        this.observers = [];


        if (counter) {
            this.counter = counter;
        }


        this.init = function (rows, columns, nextGeneration) {


            var newBoard = [];

            var arr, j;
            for (var i = 0; i < rows; i++) {

                arr = [];
                j = columns;
                while (j--) {
                    arr[j] = 0;
                }
                newBoard.push(arr);
            }

            if (typeof nextGeneration === 'undefined') {

                this.board = newBoard;
            }
            else if (nextGeneration) {

                this.nextGeneration = newBoard;
            }


        };
        this.init(rows, columns);

    }

    Board.prototype.createEmptyBoard = function () {
        this.board = [];
    };

    Board.prototype.makeRandom = function () {

        this.board = [];
        var row = new Array(this.columns);

        var arr, j;
        for (var i = 0; i < this.rows; i++) {

            arr = [];
            j = this.columns;
            while (j--) {
                arr[j] = Math.floor(Math.random() * 2);
            }
            this.board.push(arr);
        }
        if (this.counter) {
            this.counter.reset();
        }

        this.notifyObservers();

    };

    Board.prototype.getBoard = function () {
        return this.board;

    };
    Board.prototype.makeNextGeneration = function () {



        this.init(this.rows, this.columns, true);

        this.board.map(this.calculateRowSurvival, this);

        this.board = this.nextGeneration;
        if (this.counter) {
            this.counter.add();
        }
        this.notifyObservers();

    };

    Board.prototype.notifyObservers = function () {


        for (var i = 0; i < this.observers.length; i++) {
            this.observers[i]();
        }
    }

    Board.prototype.calculateRowSurvival = function (currentRow, rowNumber, boardRows) {

        boardRows[rowNumber] = currentRow.map(function (status, colNumber, row) {
            var cellNeighbours = this.getNeighbours(rowNumber, colNumber);
            var outcome = this.calculateCellSurvival(cellNeighbours, status);

            this.nextGeneration[rowNumber][colNumber] = outcome;

            return status;

        }, this);


    };

    Board.prototype.rowExists = function (rowNumber) {


        if (typeof (this.board[rowNumber]) !== 'undefined') {
            return true;

        }

        else return false;

    };
    Board.prototype.columnExists = function (colNumber) {


        if (typeof(this.board[0]) !== 'undefined' && typeof(this.board[0][colNumber]) !== 'undefined') {

            return true;

        }
        else return false;
    };

    Board.prototype.setValue = function (value, x, y) {
        this.board[x][y] = value;

    };

    Board.prototype.getNeighbours = function (x, y) {

        var neighbours = [];

        if (!this.columnExists(y) || !this.rowExists(x)) {
            return undefined;
        }


        // row above current cell
        if (this.rowExists(x - 1)) {
            if (this.columnExists(y - 1)) {
                neighbours.push(this.board[x - 1][y - 1]);

            }
            neighbours.push(this.board[x - 1][y]);

            if (this.columnExists(y + 1)) {
                neighbours.push(this.board[x - 1][y + 1]);

            }
        }

        // same row (excluding cell itself)
        if (this.columnExists(y - 1)) {
            neighbours.push(this.board[x][y - 1]);
        }
        if (this.columnExists(y + 1)) {
            neighbours.push(this.board[x][y + 1]);
        }

        // row below current cell
        if (this.rowExists(x + 1)) {
            if (this.columnExists(y - 1)) {
                neighbours.push(this.board[x + 1][y - 1]);
            }

            neighbours.push(this.board[x + 1][y]);

            if (this.columnExists(y + 1)) {

                neighbours.push(this.board[x + 1][y + 1]);
            }

        }





        return neighbours;


    };


    Board.prototype.calculateCellSurvival = function (neighbourList, alive) {


//    if status =
        if (!Array.isArray(neighbourList) || typeof(status) === "undefined") {

            return undefined;
        }
        else {
            var sum = neighbourList.reduce(function (a, b) {

                return a + b;
            });


            if (alive === 1) {

                return (sum < 2 || sum > 3) ? 0 : 1;
            }
            else if (alive === 0) {
                return (sum === 3) ? 1 : 0;
            }

        }
    };


    Board.prototype.addSubscriber = function (callback) {
        this.observers.push(callback);

    };

    Board.prototype.removeSubscriber = function (callback) {
        this.observers=[];
        for (var i = this.observers.length-1; i >= 0; i--) {
            if (this.observers[i] === callback) {
                this.observers.splice(i,1);
            }
        }
    };

    return Board;

});



