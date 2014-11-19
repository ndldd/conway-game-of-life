/**
 * Created by thomas on 03.10.14.
 */

define(['src/models/board', 'src/models/counter' ], function (Board) {
//var jasmine;
    beforeEach(function () {
    });

    describe('Board', function () {


        var sumBoard;
        var board;

        beforeEach(function () {

            sumBoard = function (board) {


                var flattened = board.reduce(function (a, b) {
                    return a.concat(b);
                });
                return  flattened.reduce(function (a, b) {
                    return a + b;
                });
            };
        });
        beforeEach(function () {
            var BOARD_SIZE = 44;


            board = new Board(BOARD_SIZE, BOARD_SIZE);


        });


        describe("after creation", function () {


            var board;
            var ROWS = 15;
            var COLUMNS = 15;


            beforeEach(function () {

                board = new Board(ROWS, COLUMNS);

            });

            afterEach(function () {
                board = null;
            });


            it('has a board', function () {
                expect(board.board).toBeDefined();
            });

            it("has rows ", function () {
                expect(board.board.length).toBe(ROWS);

            });
            it("has columns", function () {
                expect(board.board[0].length).toBe(COLUMNS);
                expect(board.board[ROWS - 1].length).toBe(COLUMNS);
            });
            it('all values are zero', function () {

                var all;
                var flattened = board.board.reduce(function (a, b) {
                    return a.concat(b);
                });

                expect(flattened.length).toBe(ROWS * COLUMNS);

                all = flattened.reduce(function (a, b) {
                    return a + b;
                });

                expect(all).toBe(0);


            });
            describe("random board creation", function () {

                var spy;

                beforeEach(function () {
                    spy = spyOn(Math, "random").and.returnValue(0.5);


                });


                describe('fake ones', function () {

                    it("fills board with fake random ones", function () {

                        expect(sumBoard(board.board)).toBe(0);

                        board.makeRandom();

                        expect(sumBoard(board.board)).toBe(ROWS * COLUMNS);
                        expect(spy).toHaveBeenCalled();


                    });


                });
                describe("fake zeros", function () {

                    it("fills with fake random zeros", function () {
                        Math.random.and.returnValue(0.4); // changing return value of spy

                        board.makeRandom();
                        expect(sumBoard(board.board)).toBe(0);
                    });
                });


            });


            it('update with single value', function () {

                expect(sumBoard(board.board)).toBe(0);

                board.setValue(3, 0, 0);
                expect(sumBoard(board.board)).toBe(3);
            });

        });


//                                           define(['js/board'], function (Board) {


//    });


        describe('accessing neighbours should not be allowed ', function () {

            it('when board has size 0', function () {
                board = new Board(0, 0);
                expect(board.rowExists(0)).toBe(false);
            });
        });

        describe('checking for rows', function () {

            var BOARD_SIZE;
            beforeEach(function () {
                BOARD_SIZE = 33;
                board = new Board(BOARD_SIZE, BOARD_SIZE);
            });

            it("first row exist", function () {
                expect(board.rowExists(0)).toBe(true);

            });
            it("last row exists", function () {
                expect(board.rowExists(BOARD_SIZE - 1)).toBe(true);
            });

            it("last row + 1 does not exist", function () {
                expect(board.rowExists(BOARD_SIZE)).toBe(false);
            });


        });

        describe("checking for columns", function () {
            var BOARD_SIZE;
            beforeEach(function () {
                BOARD_SIZE = 33;
                board = new Board(BOARD_SIZE, BOARD_SIZE - 4);

            });
            it("column 0 exists in first row", function () {
                expect(board.columnExists(0)).toBe(true);
            });

            it("column 0 does not exist on empty board", function () {
                BOARD_SIZE = 0;
                board = new Board(BOARD_SIZE, BOARD_SIZE);
                expect(board.columnExists(0)).toBe(false);
            });

            it("column number  is not larger than board size", function () {
                BOARD_SIZE = 44;
                board = new Board(BOARD_SIZE, BOARD_SIZE);
                expect(board.columnExists(BOARD_SIZE - 1)).toBe(true);
                expect(board.columnExists(BOARD_SIZE)).toBe(false);
            });
        });

        describe("getting list of neighbours", function () {


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

            describe('cases with one neighbour', function () {

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
            describe("cases with 9 cells neighbours:", function () {
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

        describe("making survival Calculations", function () {

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
                var BOARD_HEIGHT = 5;
                var BOARD_WIDTH = 4;
                var board;

                beforeEach(function () {

                board= new Board(BOARD_HEIGHT, BOARD_WIDTH);
                });

                it("has same dimensions", function () {

                    board.makeNextGeneration();

                    expect(board.board.length).toBe(BOARD_HEIGHT);
                    expect(board.board[0].length).toBe(BOARD_WIDTH);

                });

                it("board sum should be different with new generation", function () {
                    var after;
                    var before;
                    var BOARD_HEIGHT = 3;
                    var BOARD_WIDTH = 3;
                    board = new Board(BOARD_HEIGHT, BOARD_WIDTH);
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
                    var BOARD_HEIGHT = 6;
                    var BOARD_WIDTH = 4;
                    board = new Board(BOARD_HEIGHT, BOARD_WIDTH);


                    var spy = spyOn(board, 'calculateCellSurvival').and.callThrough();
                    board.makeNextGeneration();

                    expect(spy.calls.count()).toEqual(BOARD_HEIGHT * BOARD_WIDTH);

                });


            });
        });

        describe("observers ", function () {
            var board, callback;
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
//
                    counter = jasmine.createSpyObj('counter', ['add', 'reset']);

                    board = new Board(3, 3, counter);
//                        spyOn(counter,'add');
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
