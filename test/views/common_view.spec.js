define(['src/views/view', 'src/models/counter', 'src/views/canvasview', 'text!src/views/canvasviewtemplate.html', ], function (htmlView, Counter, CanvasView, canvasViewTemplate) {

    var runSuites = function (View, Counter, template) {

        describe("view adds a #board element on init", function () {

            it('has a #board', function () {
                document.innerHTML = window.__html__['index.html'];

                var view = null;
                var board = document.getElementById('board');
                expect(board).toBeNull();

                view = new View();
                board = document.getElementById('board');
                expect(board).not.toBeNull();

            });

        });
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


            describe('on instantiation creates a container element ', function () {
                var container;
                beforeEach(function () {

                    container = document.getElementById('view-container');
                    view = new View();
                });
                it('there is a view-container in the document', function () {
                    expect(container).toBeDefined();
                });
                it('adds board', function () {
                    var board = document.getElementById('board');
                    expect(board).toBeDefined();
                });
            });


            describe(' after instantiation', function () {
                describe('on subscribe adds itself to Board observers', function () {

                    beforeEach(function () {
//                    var board
                    });
                    it('calls board.addSubscriber', function () {
                        var board = { removeSubscriber: function () {
                        }}
                        view = new View(board);
                        var board = {addSubscriber: function () {
                        }};
                        var spy = spyOn(board, 'addSubscriber')

                        view.subscribe(board);

                        expect(board.addSubscriber).toHaveBeenCalled();
                    });

                    it("keeps a reference to the bound callback", function () {


                        var board = {addSubscriber: function () {
                        }};

                        view.subscribe(board);

                        expect(view.registeredCallback).toBeTruthy();
                    });
                    it("only subscribes once / if there is not already callback registered", function () {

                        var board = {addSubscriber: function () {
                        }};
                        var spy = spyOn(board, 'addSubscriber');

                        view.registeredCallback = function () {
                        }

                        view.subscribe(board);

                        expect(board.addSubscriber).not.toHaveBeenCalled();

                    });
                    it("removes reference on unsubscribe", function () {


                        var board = {  removeSubscriber: function () {
                        } };

                        view.registeredCallback = function () {
                        };

                        view.unsubscribe(board);

                        expect(view.registeredCallback).toBeFalsy();
                    });


                });
                describe("on destroy ", function () {
                    it("removes itself from the container", function () {
                        container = document.getElementById('view-container');
                        expect(container.innerHTML).not.toBe('');
                        view.board = {removeSubscriber: function () {
                        }}

                        view.destroy();

                        container = document.getElementById('view-container');
                        expect(container.innerHTML).toBe('');
                    });

                    it("unsubscribes from model changes", function () {
                        var spy = spyOn(view, 'unsubscribe');
                        view.board = {};
                        view.destroy();
                        expect(view.unsubscribe).toHaveBeenCalledWith(view.board);
                    });

                });
                describe("on unsubscribe", function () {
                    it("calls board.removeSubscriber with the saved callback reference", function () {
                        view.board = {removeSubscriber: jasmine.createSpy('spy', 'removeSubscriber')}

                        var callback = view.registeredCallback = function () {
                        };
                        view.unsubscribe(view.board);

                        expect(view.board.removeSubscriber).toHaveBeenCalledWith(callback);

                    });
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
                    it("has a switchView button", function () {
                        var btn = document.getElementById('switchView-btn');
                        expect(btn.innerHTML.toLowerCase()).toContain('switch');
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


    };

    runSuites(htmlView, Counter);
    runSuites(CanvasView, Counter, canvasViewTemplate);


});
