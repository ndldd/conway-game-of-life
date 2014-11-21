define(['src/models/board', 'src/models/counter'], function (Board) {
    describe('Board', function () {
        var board;

        var sumBoard; // helper function
        sumBoard = function (board) {
            var flattened = board.reduce(function (a, b) {
                return a.concat(b);
            });

            return flattened.reduce(function (a, b) {
                return a + b;
            });
        };

        beforeEach(function () {
            var boardSize = 44;
            board = new Board(boardSize, boardSize);
        });

        describe("after creation", function () {
            var board;
            var rows = 15;
            var columns = 16;

            beforeEach(function () {
                board = new Board(rows, columns);
            });

            afterEach(function () {
                board = null;
            });

            it('has a board', function () {
                expect(board.board).toBeDefined();
            });

            it("has rows ", function () {
                expect(board.board.length).toBe(rows);
            });

            it("has columns", function () {
                expect(board.board[0].length).toBe(columns);
                expect(board.board[rows - 1].length).toBe(columns);
            });

            it('all values are zero', function () {
                var all;
                var flattened = board.board.reduce(function (a, b) {
                    return a.concat(b);
                });

                expect(flattened.length).toBe(rows * columns);

                all = flattened.reduce(function (a, b) {
                    return a + b;
                });

                expect(all).toBe(0);
            });

            it('update with single value', function () {
                expect(sumBoard(board.board)).toBe(0);

                board.setValue(3, 0, 0);

                expect(sumBoard(board.board)).toBe(3);
            });
        });

        describe("when creating a random board ", function () {
            var spy;

            beforeEach(function () {
                spy = spyOn(Math, "random");
            });

            it(" board sets '1' randomly ", function () {
                var rows = 15;
                var columns = 16;
                board = new Board(rows, columns);
                expect(sumBoard(board.board)).toBe(0);

                Math.random.and.returnValue(0.5);

                board.makeRandom();  // all cells are 1

                expect(sumBoard(board.board)).toBe(rows * columns);
                expect(spy).toHaveBeenCalled();
            });

            it("board sets '0' randomly ", function () {
                Math.random.and.returnValue(0.4); // changing return value of spy

                board.makeRandom();

                expect(sumBoard(board.board)).toBe(0);
            });
        });

        describe('when board has size 0', function () {
            it('accessing neighbours should not be allowed ', function () {
                board = new Board(0, 0);

                expect(board._rowExists(0)).toBe(false);
            });
        });

        describe('when checking for rows', function () {
            var boardSize;

            beforeEach(function () {
                boardSize = 42;
                board = new Board(boardSize, boardSize);
            });

            it("first row exist", function () {
                expect(board._rowExists(0)).toBe(true);

            });

            it("last row exists", function () {
                expect(board._rowExists(boardSize - 1)).toBe(true);
            });

            it("the number of rows is not larger than the board size", function () {
                expect(board._rowExists(boardSize)).toBe(false);
            });
        });

        describe("when checking for columns", function () {
            var boardSize;

            beforeEach(function () {
                boardSize = 12;
                board = new Board(boardSize, boardSize - 4);
            });

            it("column 0 exists in first row", function () {
                expect(board._columnExists(0)).toBe(true);
            });

            it("column 0 does not exist on empty board", function () {
                boardSize = 0;

                board = new Board(boardSize, boardSize);

                expect(board._columnExists(0)).toBe(false);
            });

            it("the number of columns is not larger than the board size", function () {
                boardSize = 44;

                board = new Board(boardSize, boardSize);

                expect(board._columnExists(boardSize - 1)).toBe(true);
                expect(board._columnExists(boardSize)).toBe(false);
            });
        });

        describe("when getting list of neighbours", function () {

            it("return [] if there are no neighbours", function () {
                board = new Board(1, 1);

                expect(board.getNeighbours(0, 0)).toEqual([]);
            });

            it('return undefined if the position is not on the board', function () {
                board = new Board(0, 0);

                expect(board.getNeighbours(0, 0)).toBe(undefined);
                expect(board.getNeighbours(0, 1)).toBe(undefined);
                expect(board.getNeighbours(1, 0)).toBe(undefined);
                expect(board.getNeighbours(-1, 0)).toBe(undefined);

            });

            it("return [] for small boards", function () {
                board = new Board(1, 1);

                expect(board.getNeighbours(0, 0)).toEqual([]);
            });

            describe('cases with only one neighbour', function () {
                it(" to the right", function () {
                    board.board = [
                        [1, 2]
                    ];

                    expect(board.getNeighbours(0, 0)).toEqual([2]);
                });

                it(' below', function () {
                    board.board = [
                        [1],
                        [2]
                    ];

                    expect(board.getNeighbours(0, 0)).toEqual([2]);
                });
                it("on the top", function () {
                    board.board = [
                        [1],
                        [2]
                    ];

                    expect(board.getNeighbours(1, 0)).toEqual([1]);
                });
                it("on the left", function () {
                    board.board = [
                        [1, 2]
                    ];
                    expect(board.getNeighbours(0, 1)).toEqual([1]);
                });
            });

            describe("cases with three neighbours", function () {

                beforeEach(function () {
                    board.board = [
                        [1, 2],
                        [3, 4]
                    ];
                });

                it(" to the top right", function () {
                    expect(board.getNeighbours(1, 0)).toEqual([1, 2, 4]);
                });

                it(" right and below", function () {
                    expect(board.getNeighbours(0, 0)).toEqual([2, 3, 4]);
                });

                it(" left and top", function () {
                    expect(board.getNeighbours(1, 1)).toEqual([1, 2, 3]);
                });

                it('left and below ', function () {
                    expect(board.getNeighbours(0, 1)).toEqual([1, 3, 4]);
                });
            });

            describe("cases with nine cell neighbours:", function () {
                beforeEach(function () {
                    board.board = [
                        [1, 2, 3],
                        [4, 5, 6],
                        [7, 8, 9]
                    ];
                });

                it("for position 2", function () {
                    expect(board.getNeighbours(0, 1)).toEqual([1, 3, 4, 5, 6]);
                });

                it("for position 4", function () {
                    expect(board.getNeighbours(1, 0)).toEqual([1, 2, 5, 7, 8]);
                });

                it("for position 5", function () {
                    expect(board.getNeighbours(1, 1)).toEqual([1, 2, 3, 4, 6, 7, 8, 9]);
                });

                it("for position 6", function () {
                    expect(board.getNeighbours(1, 2)).toEqual([2, 3, 5, 8, 9]);
                });

                it("for position 8", function () {
                    expect(board.getNeighbours(2, 1)).toEqual([4, 5, 6, 7, 9]);
                });

                it("for position 1", function () {
                    expect(board.getNeighbours(0, 0)).toEqual([2, 4, 5]);
                });

                it("for position 3", function () {
                    expect(board.getNeighbours(0, 2)).toEqual([2, 5, 6]);
                });

                it("position 7", function () {
                    expect(board.getNeighbours(2, 0)).toEqual([4, 5, 8]);
                });

                it("position 9", function () {
                    expect(board.getNeighbours(2, 2)).toEqual([5, 6, 8]);
                });
            });
        });

        describe("making survival calculations", function () {
            it("calculates survival for one cell", function () {
                var outcome;
                outcome = board.calculateCellSurvival();

                expect(outcome).toBe(undefined);
            });

            describe("living cells", function () {
                var outcome;
                it("if there are less than two neighbours cell dies", function () {
                    outcome = board.calculateCellSurvival([1, 0, 0], 1);

                    expect(outcome).toBe(0);

                    outcome = board.calculateCellSurvival([0, 1], 1);

                    expect(outcome).toBe(0);
                });

                it("if there are two or three neighbours cell lives ", function () {
                    outcome = board.calculateCellSurvival([0, 1, 1], 1);

                    expect(outcome).toBe(1);

                    outcome = board.calculateCellSurvival([0, 1, 1, 1], 1);

                    expect(outcome).toBe(1);
                });

                it("more than three neighbours cells dies", function () {
                    outcome = board.calculateCellSurvival([1, 1, 1, 1], 1);

                    expect(outcome).toBe(0);

                    outcome = board.calculateCellSurvival([1, 1, 1, 1, 1], 1);

                    expect(outcome).toBe(0);
                });
            });

            describe("dead cells", function () {
                var outcome;

                it("with three neighbours cell gets born", function () {
                    outcome = board.calculateCellSurvival([1, 1, 1, 0, 0], 0);

                    expect(outcome).toBe(1);

                    outcome = board.calculateCellSurvival([1, 1, 1, 1, 0], 0);

                    expect(outcome).toBe(0);

                    outcome = board.calculateCellSurvival([1, 1, 0], 0);

                    expect(outcome).toBe(0);
                });
            });
        });

        describe('applying survival function to board', function () {
            describe("return a new board ", function () {
                var boardHeight = 5;
                var boardWidth = 4;
                var board;

                beforeEach(function () {
                    board = new Board(boardHeight, boardWidth);
                });

                it("has same dimensions", function () {
                    board.makeNextGeneration();

                    expect(board.board.length).toBe(boardHeight);
                    expect(board.board[0].length).toBe(boardWidth);
                });

                it("board sum should be different with new generation", function () {
                    var after;
                    var before;
                    var boardHeight = 3;
                    var boardWidth = 3;
                    board = new Board(boardHeight, boardWidth);
                    board.board = [
                        [1, 0, 1],
                        [0, 0, 1],
                        [0, 1, 0]
                    ];
                    before = sumBoard(board.board);

                    expect(before).toBe(4);

                    board.makeNextGeneration();

                    after = sumBoard(board.board);
                    expect(after).not.toEqual(before);
                });

                it('calls survival for each cell', function () {
                    var boardHeight = 6;
                    var boardWidth = 4;
                    board = new Board(boardHeight, boardWidth);
                    spyOn(board, 'calculateCellSurvival').and.callThrough();

                    board.makeNextGeneration();

                    expect(board.calculateCellSurvival.calls.count()).toEqual(boardHeight * boardWidth);
                });
            });
        });

        describe("observers ", function () {
            var board;
            var callback;

            beforeEach(function () {
                board = new Board(3, 4);
                callback = function () {
                };
            });

            it('adds subscribers', function () {
                board.addSubscriber(callback);

                expect(board.observers).toContain(callback);
            });

            it("removes subscribers", function () {
                board.addSubscriber(callback);

                board.removeSubscriber(callback);

                expect(board.observers).not.toContain(callback);
            });
        });

        describe("when updating the board,", function () {
            describe("notifies subscribers", function () {
                var spy;
                var board;
                beforeEach(function () {
                    board = new Board(3, 4);

                    spy = jasmine.createSpy('spy');

                    board.addSubscriber(spy);
                });

                it("on update", function () {
                    board.makeNextGeneration();

                    expect(spy).toHaveBeenCalled();
                });

                it("on make random", function () {
                    board.makeRandom();

                    expect(spy).toHaveBeenCalled();
                });
            });

            describe("notifies other collaborators ", function () {
                var counter;

                beforeEach(function () {
                    counter = jasmine.createSpyObj('counter', ['add', 'reset']);
                    board = new Board(3, 3, counter);
                });

                it(" when making a new generation: calls counter", function () {
                    board.makeNextGeneration();

                    expect(counter.add).toHaveBeenCalled();
                });

                it("when making random: resets counter", function () {
                    board.makeRandom();

                    expect(board.counter.reset).toHaveBeenCalled();
                });
            });
        });
    });
});