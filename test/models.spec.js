/**
 * Created by thomas on 03.10.14.
 */


beforeEach(function () {
});

describe('Board', function () {


    var sumBoard;
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



    var board;


    beforeEach(function () {
        board = new Board(44, 44);
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




});