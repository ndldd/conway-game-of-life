define(['js/views/canvasview', 'js/models/counter', 'js/app.constants' ], function (View, Counter, constants) {

    var canvasTemplate = ' <button id="start-btn" onclick="conway.start()">Start</button> <button id="stop-btn" onclick="conway.stop()">Stopp</button> <button id="reset-btn" onclick="conway.reset()">Reset</button> <canvas class="board" id="board"> </canvas>'

    describe("CanvasView,", function () {


        describe("setting type properly on instantiation", function () {

            var view;

            beforeEach(function () {
                view = new CanvasView();
            });
            it("is a subclass of view", function () {
                expect(view instanceof View).toBe(true);
            });

            it("is class Canvas View", function () {
                expect(view instanceof CanvasView).toBe(true);
            });
        });

        describe("on instantiation takes canvas template injection", function () {
            it("view has a canvas board", function () {
                view = new View({}, {}, canvasTemplate);

                expect(document.querySelector('canvas').id).toBe('board');

            });
        });


        describe("on displayboard,", function () {
            var view;
            var canvas;
            var context;
            var TILE_SIZE = constants.tileSize;
            var PADDING = constants.padding;
            beforeEach(function () {
                view = new View({}, {}, canvasTemplate);
                context = jasmine.createSpyObj('context', ['fillRect', 'fillStyle', '']);
                canvas = {getContext: jasmine.createSpy('canvasSpy').and.returnValue(context)};
                canvas.style = {};
            });
            it("calls method to create a background ", function () {
                var spy = spyOn(view, 'drawBoardBackground');


                canvas.width = 3;
                canvas.height = 3;

                view.displayBoard([
                    [1]
                ], canvas);

                expect(view.drawBoardBackground).toHaveBeenCalledWith(context, canvas.width, canvas.height);
            });
            it("has a board with tiles", function () {

            });
            it("gets dimensions from the board", function () {
                var board = [
                    [1, 1],
                    [1, 1],
                    [1, 1]
                ];
                var spy = spyOn(view, 'calculateCanvasSize');

                view.displayBoard(board);
                expect(view.calculateCanvasSize).toHaveBeenCalledWith(board, TILE_SIZE,PADDING);// displayBoard
            });
            it("calculate canvasSize", function () {

            });

            it("gets a context object from (optional) canvas object", function () {

                view.displayBoard({}, canvas);

                expect(canvas.getContext).toHaveBeenCalledWith('2d');

            });
            it("drawBoardBackground creates Rect", function () {
                var bgWidth = 500;
                var bgHeight = 500;
                view.drawBoardBackground(context, bgWidth, bgHeight);

                expect(context.fillStyle).toBe('lightgray');
                expect(context.fillRect).toHaveBeenCalledWith(0, 0, 500, 500);
            });


            it("draws a row", function () {
                var spy = spyOn(view, 'drawRow');
                view.displayBoard([
                    [1]
                ], canvas);
                expect(view.drawRow).toHaveBeenCalled();
            });

            it("draw multiple rows", function () {
                var spy = spyOn(view, 'drawRow');
                view.displayBoard([
                    [0],
                    [0]
                ], canvas);
                expect(view.drawRow.calls.count()).toBe(2);

            });
            describe("on drawRow", function () {
                var spy;
                beforeEach(function () {
                    spy = spyOn(view, 'drawTile');
                });


                it("draws array of tiles", function () {

                    var row = [0, 0, 0];

                    view.drawRow(null, row);

                    expect(view.drawTile.calls.count()).toBe(3);
                });
                it("draws tiles next to each other", function () {

                    var rowNumber = 0;
                    view.drawRow(null, [0, 0, 0], rowNumber);

                    var PADDING = 1;
                    expect(view.drawTile.calls.argsFor(0)).toEqual([null, 0, 0, TILE_SIZE, false]);
                    expect(view.drawTile.calls.argsFor(1)).toEqual([null, PADDING + TILE_SIZE, 0, TILE_SIZE, false]);
                    expect(view.drawTile.calls.argsFor(2)).toEqual([null, 2 * (PADDING + TILE_SIZE), 0, TILE_SIZE, false]);
                });

                it("draws tile in rows below each other", function () {
                    view.displayBoard([
                        [0],
                        [0]
                    ]);

                    context = document.createElement('canvas').getContext('2d');

                    var firstCall = view.drawTile.calls.argsFor(0)
                    firstCall[0] = null;
                    expect(firstCall).toEqual([null, 0, 0, TILE_SIZE, false]);


                    var secondCall = view.drawTile.calls.argsFor(1);

                    secondCall[0] = null;
                    expect(secondCall).toEqual([null, 0 , TILE_SIZE + PADDING, TILE_SIZE, false]);


                });
            });
            it("drawTiles fills tiles", function () {
                var TILE_SIZE
                view.drawTile(context, 1, 2, TILE_SIZE);

                expect(context.fillRect).toHaveBeenCalledWith(1, 2, TILE_SIZE, TILE_SIZE);

            });
            it("drawsTiles as alive", function () {
                var TILE_SIZE
                view.drawTile(context, 1, 2, TILE_SIZE, false);
                expect(context.fillStyle).toBe('white');
                view.drawTile(context, 1, 2, TILE_SIZE, true);
                expect(context.fillStyle).toBe('black');
            });


        });
    });

    describe('Common for both Views', function () {

        describe("view adds a board on init", function () {
            var view;
            beforeEach(function () {

                document.innerHTML = window.__html__['index.html'];

            });

            afterEach(function () {
                view = null;
                document.innerHTML = '';

            });

            it('has a #board', function s() {
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

        xdescribe('html view', function () {
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