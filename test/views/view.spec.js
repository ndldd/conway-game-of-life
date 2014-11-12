define(['src/views/view', 'src/models/counter'], function (View, Counter) {
    // test specific to the html-div version of the view only


    describe('View', function () {

        var view;

        beforeEach(function () {
            view = new View();
            document.innerHTML = window.__html__['index.html'];
        });

        afterEach(function () {
            view = null;
            document.innerHTML = '';
        });


        describe(' after instantiation', function () {


            describe("draws board (removes and displays new)", function () {
                var view;
                var mockBoard;

                beforeEach(function () {

                    document.innerHTML = window.__html__['index.html'];
                    view = new View();
                    mockBoard = [
                        [0, 0],
                        [0, 0]
                    ];

                });

                afterEach(function () {
                    view = null;
                    document.innerHTML = '';
                    mockBoard = undefined;
                });

                describe('drawing', function () {
                    it('board is not empty', function () {

                        view.displayBoard(mockBoard);
                        var board = document.getElementById('board');
                        expect(board.innerHTML.trim()).not.toEqual('');

                    });

                })

                it('draws board with two rows', function () {
                    mockBoard = [
                        [0, 0],
                        [0, 0]
                    ];

                    view.displayBoard(mockBoard);

                    var board = document.getElementById('board');
                    expect(board.children.length).toBe(2);
                    expect(board.children[0].className).toBe('row');
                    expect(board.children[1].className).toBe('row');

                })

                it('rows have tiles', function () {
                    mockBoard = [
                        [0, 0],
                        [0, 0]
                    ];

                    view.displayBoard(mockBoard);

                    var board = document.getElementById('board');
                    expect(board.children[0].children.length).toBe(2);

                    expect(board.children[0].children[0].className).toBe('tile');


                });

                it('tiles have ".on" when their state is 1', function () {
                    mockBoard = [
                        [1, 1],
                        [1, 1]
                    ];

                    view.displayBoard(mockBoard);

                    var board = document.getElementById('board');


                    expect(board.children[0].children[0].className).toBe('tile on');

                });

            });
            describe("changes on board updates", function () {
                var view;
                beforeEach(function () {
                    view = new View();
                    document.innerHTML = window.__html__['index.html'];

                })

                afterEach(function () {
                    view = null;
                    document.innerHTML = '';
                })


                it("redraws ", function () {
                    view = new View([
                        [0, 0],
                        [0, 0]
                    ], new Counter());

                    newBoard = [
                        [1, 1],
                        [1, 1]
                    ];
                    view.addCounter()

                    view.displayBoard(view.board);
                    view.board.board = newBoard;

                    view.draw();


                    var htmlBoard = document.getElementById('board');


                    expect(htmlBoard.children[0].children[0].className).toBe('tile on');

                });


            });
            describe("on draw ", function () {
                it("updates the counter", function () {
                    view.board = {};
                    var spy = spyOn(view, 'updateCounterDisplay');
                    view.draw();

                    expect(view.updateCounterDisplay).toHaveBeenCalled();

                });
            });

        });


    });


});
