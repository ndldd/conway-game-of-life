define(function () {

    var Board = function (rows, columns, counter) {
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
    };

    Board.prototype.makeRandom = function () {
        //var row;
        this.board = [];
        //row = new Array(this.columns);
        var arr, j;
        for (var i = 0; i < this.rows; i++) {
            arr = [];
            j = this.columns;
            while (j--) {
                arr[j] = Math.floor(Math.random() * 2);      // 1 or 0
            }
            this.board.push(arr);
        }
        if (this.counter) {
            this.counter.reset();
        }
        this.notifyObservers();
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
    };

    Board.prototype.calculateRowSurvival = function (currentRow, rowNumber, boardRows) {
        boardRows[rowNumber] = currentRow.map(function (status, colNumber) {
            var cellNeighbours = this.getNeighbours(rowNumber, colNumber);
            this.nextGeneration[rowNumber][colNumber] = this.calculateCellSurvival(cellNeighbours, status);
            return status;
        }, this);
    };

    Board.prototype._rowExists = function (rowNumber) {
        if (typeof (this.board[rowNumber]) === 'undefined') {
            return false;
        } else {
            return true;
        }
    };

    Board.prototype._columnExists = function (colNumber) {
        return (typeof(this.board[0]) !== 'undefined' && typeof(this.board[0][colNumber]) !== 'undefined');
    };

    Board.prototype.setValue = function (value, x, y) {
        this.board[x][y] = value;
    };

    Board.prototype._addRightNeighbour = function (x, y, neighbours) {
        if (this._columnExists(y + 1)) {
            neighbours.push(this.board[x][y + 1]);
        }
    };

    Board.prototype._addLeftNeighbour = function (x, y, neighbours) {
        if (this._columnExists(y - 1)) {
            neighbours.push(this.board[x][y - 1]);
        }
    };

    Board.prototype._collectRow = function (x, y, centerRow) {

        var neighbours = [];
        if (this._rowExists(x)) {
            this._addLeftNeighbour(x, y, neighbours);
            if (x !== centerRow) {
                neighbours.push(this.board[x][y]);
            }
            this._addRightNeighbour(x, y, neighbours);
        }
        return neighbours;
    };

    Board.prototype.getNeighbours = function (x, y) {
        if (!this._columnExists(y) || !this._rowExists(x)) {
            return undefined;
        }
        var all = [];
        all = all.concat(this._collectRow(x - 1, y, x));
        all = all.concat(this._collectRow(x, y, x));
        all = all.concat(this._collectRow(x + 1, y, x));

        return all;
    };

    Board.prototype.calculateCellSurvival = function (neighbourList, alive) {
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
        this.observers = [];
        for (var i = this.observers.length - 1; i >= 0; i--) {
            if (this.observers[i] === callback) {
                this.observers.splice(i, 1);
            }
        }
    };

    return Board;
});