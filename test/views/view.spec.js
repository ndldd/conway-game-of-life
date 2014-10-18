define(['js/views/view', 'js/models/counter'], function (View, Counter) {
    describe('View', function () {

        describe("view adds a board on init", function () {
            var view;
            beforeEach(function () {

                document.innerHTML = window.__html__['index.html'];

            });

            afterEach(function () {
                view = null;
                document.innerHTML = '';

            });

            it('has a #board', function () {
                var board = document.getElementById('board');
                expect(board).toBeNull();
                view = new View();
                board = document.getElementById('board');
                expect(board).not.toBeNull();

            });
        });

        describe('view', function () {
            var container;
            beforeEach(function () {
//                document.body.innerHTML = window.__html__['test_fixtures/body.html'];
                document.innerHTML = window.__html__['index.html'];

                container = document.getElementById('view-container');
                view = new View();

            })
            afterEach(function () {
                document.innerHTML = '';
            });
            it('there is a view-container ', function () {
                expect(container).toBeDefined();


            });

            it('adds board', function () {
                var board = document.getElementById('board');
                expect(board).toBeDefined();
            });


        });

        describe('html view', function () {
            var view;

            describe('subscribes to Board', function () {

                it('calls board.addSubscriber', function () {
                    view = new View();
                    var board = {addSubscriber: function () {
                    }};
                    var spy = spyOn(board, 'addSubscriber')

                    view.subscribe(board);


//                    var callback = function () { }

                    expect(board.addSubscriber).toHaveBeenCalled();
//                    expect(view.draw.this).toBe(view);

                })

            });

            describe("displays controls", function () {

                beforeEach(function () {
                    view = new View();
                    document.innerHTML = window.__html__['index.html'];


                })

                afterEach(function () {
                    view = null;
                    document.innerHTML = '';
                })

                it("has a start button", function () {
                    var btn = document.getElementById('start-btn');

                    expect(btn.innerHTML.toLowerCase()).toContain('start');

                });
                it("has a start button", function () {
                    var btn = document.getElementById('stop-btn');

                    expect(btn.innerHTML.toLowerCase()).toContain('stopp');

                });
                it("has a reset button", function () {
                    var btn = document.getElementById('reset-btn');
                    expect(btn.innerHTML.toLowerCase()).toContain('reset');
                });
            });

            describe("displays counter", function () {

                var counter;
                beforeEach(function () {

                    counter = {getCount: function () {
                        return 0;
                    }};
                    view = new View({}, counter);
                    document.innerHTML = window.__html__['index.html'];

                });
                it("adds #counter", function () {


                    view.addCounter();

                    var displayedCounter = document.getElementById("generationCounter");

                    expect(displayedCounter).not.toBeNull();
                });
                it("counter shows a string", function () {

                    view.addCounter();

                    var displayedCounter = document.getElementById("generationCounter");

                    expect(displayedCounter.textContent).toBe('Generation: 0');
                });

                it("view gets count from counter", function () {
//                    var counter = {getCount: {}}
//                    spyOn(counter, 'getCount');
//                    view.addCounter(counter);
//                    expect(counter.getCount).toHaveBeenCalled();

                });


            });

            describe("draws board", function () {
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
                it("removes old board", function () {


                    view = new View([
                        [0],
                        [0]
                    ]);
                    view.displayBoard(view.board);
                    view.removeHtmlBoard();


                    var htmlBoard = document.getElementById('board');


                    expect(htmlBoard.children.length).toBe(0);


                });

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

                it("updates it's counter", function () {

                    var counter = new Counter();
                    view = new View({}, counter);
                    view.addCounter();
                    htmlCounter = document.getElementById('generationCounter');
                    expect(htmlCounter.textContent).toBe('Generation: 0');

                    view.counter._counter += 1;
                    view.updateCounterDisplay();
                    htmlCounter = document.getElementById('generationCounter');

                    expect(htmlCounter.textContent).toBe('Generation: 1');

                });
                it("view removes old counter Display", function () {
                    var view = new View({}, new Counter);

                    var spy = spyOn(view, 'removeCounterDisplay');
                    view.addCounter();
                    view.updateCounterDisplay();
                    expect(view.removeCounterDisplay).toHaveBeenCalled();


                });

                it("removes the old counter node", function () {
                    var view = new View({}, new Counter);
                    view.addCounter();

                    view.removeCounterDisplay();

                    expect(document.getElementById('generationCounter')).toBe(null);


                });

                it("view adds new Counter Display", function () {
                    counter = new Counter()

                    var view = new View({}, counter);
                    view.addCounter();

                    var spy = spyOn(view, 'addCounter');

                    view.updateCounterDisplay();

                    expect(view.addCounter).toHaveBeenCalled();


                });


            });


        });

    });
});
