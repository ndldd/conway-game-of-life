/**
 * Created by thomas on 03.10.14.
 */


//var jasmine;
beforeEach(function () {
});

describe('some suite', function () {
    var suiteWideFoo;


    beforeEach(function () {
        suiteWideFoo = 1;
//        jasmine.addMatchers({
//            mymatch: function () {
//                return {
//                    compare: function (actual, expected) {
//                        return {
//                            pass: (actual % 2) === 0
//                        };
//                    }
//                };
//            }
//        });
//
//
    });

    it('should equal bar', function () {
//        expect(4).toBeExponentiallyLessThan(3);
        expect(suiteWideFoo).toEqual(1);
//        expect(0).mymatch(0);
    });

    describe('some suite', function () {
//        var suiteWideFoo;
//
//        beforeEach(function () {
//            suiteWideFoo = 1;
//        });
        beforeEach(function () {

        });


        it('should equal bar', function () {
            expect(suiteWideFoo).toEqual(1);

        });
    });

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
        var BOARDSIZE = 44;

        board = new Board(BOARDSIZE, BOARDSIZE);


    });


    it('calculate returns zero', function () {

    })


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
        })

        it("has rows ", function () {
            expect(board.board.length).toBe(ROWS);

        });
        it("has columns", function () {
            expect(board.board[0].length).toBe(COLUMNS);
            expect(board.board[ROWS - 1].length).toBe(COLUMNS);
        });
        it('all values are zero', function () {

            var rowSum;


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


                })


            });
            describe("fake zeros", function () {

                it("fills with fake random zeros", function () {
                    Math.random.and.returnValue(0.4); // changing return value of spy

                    board.makeRandom();
                    expect(sumBoard(board.board)).toBe(0);
                });
            });


        });


    });


    it('update with single value', function () {

        expect(sumBoard(board.board)).toBe(0);

        board.setValue(3, 0, 0);
        expect(sumBoard(board.board)).toBe(3);

    });


    describe('accessing neighbours should not be allowed ', function () {

        it('when board has size 0', function () {
            board = new Board(0, 0);
            expect(board.rowExists(0)).toBe(false);

        })

    })
    describe('checking for rows', function () {

        beforeEach(function () {
            BOARDSIZE = 33;
            board = new Board(BOARDSIZE, BOARDSIZE);
        });

        it("first row exist", function () {
            expect(board.rowExists(0)).toBe(true);

        });
        it("last row exists", function () {
            expect(board.rowExists(BOARDSIZE - 1)).toBe(true);
        });

        it("last row + 1 does not exist", function () {
            expect(board.rowExists(BOARDSIZE)).toBe(false);
        });


    });

    describe("checking for columns", function () {
        beforeEach(function () {
            BOARDSIZE = 33;
            board = new Board(BOARDSIZE, BOARDSIZE - 4);

        });
        it("colum 0 exists in first row", function () {
            expect(board.columnExists(0)).toBe(true);
        })

        it("column 0 does not exist on empty board", function () {
            BOARDSIZE = 0;
            board = new Board(BOARDSIZE, BOARDSIZE);
            expect(board.columnExists(0)).toBe(false);
        });

        it("column nubmer  is not larger than boardsize", function () {
            BOARDSIZE = 44;
            board = new Board(BOARDSIZE, BOARDSIZE);
            expect(board.columnExists(BOARDSIZE - 1)).toBe(true);
            expect(board.columnExists(BOARDSIZE)).toBe(false);
        })
    });

    describe("getting list of neighbours", function () {


        it("return [] if there are no neighbours", function () {
            board = new Board(1, 1);
            expect(board.getNeighbours(0, 0)).toEqual([]);
        })

        it ('return undefined if the position is not on the board', function(){

             board = new Board(0,0);
            expect(board.getNeighbours(0,0)).toBe(undefined);
            expect(board.getNeighbours(0,1)).toBe(undefined);
            expect(board.getNeighbours(1,0)).toBe(undefined);
            expect(board.getNeighbours(-1,0)).toBe(undefined);

        });

        it("return [] for small boards", function () {
            board = new Board(1, 1);
            expect(board.getNeighbours(0, 0)).toEqual([]);
        });
        it("return [0] only one neighbour right", function () {
            board = new Board(1, 2);
            expect(board.getNeighbours(0, 0)).toEqual([0]);
        });

        it ('return [0] if one neigbhour below', function(){
            board = new Board(2,1);
            expect(board.getNeighbours(0,0)).toEqual([0]);
        });

        it("returns [0,0,0]  for three neighbours right and below", function () {
            board = new Board(2,2);
            expect (board.getNeighbours(0,0)).toEqual([0,0,0]);
        });
        it("returns [0,0,0]  for three neighbours left and top", function () {
            board = new Board(2,2);
            expect (board.getNeighbours(1,1)).toEqual([0,0,0]);
        });
        it("returns [0]  for neighbour on the left", function () {
                board = new Board(1,2);
            expect (board.getNeighbours(0,1)).toEqual([0]);
        });
        it("returns [0]  for neighbour on the top", function () {
                board = new Board(2,1);
            expect (board.getNeighbours(1,0)).toEqual([0]);
        });


    });


});