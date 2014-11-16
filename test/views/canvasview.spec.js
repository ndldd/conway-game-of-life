define(['src/views/canvasview', 'src/models/counter', 'src/conwayapp.constants', 'text!src/views/canvasviewtemplate.html' ], function (View, Counter, constants, canvasTemplate) {

    // tests specific to the canvas view

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
            it("calls method to create a background  ", function () {
                var spy = spyOn(view, 'drawBoardBackground');

                view.displayBoard([
                    [1],
                ], canvas);

                expect(view.drawBoardBackground).toHaveBeenCalled();
            });

            it("gets dimensions from the board", function () {
                var board = [
                    [1, 1],
                    [1, 1],
                    [1, 1]
                ];
                var spy = spyOn(view, 'calculateCanvasSize');

                view.displayBoard(board);
                expect(view.calculateCanvasSize).toHaveBeenCalledWith(board, TILE_SIZE, PADDING);// displayBoard
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
                expect(context.fillRect).toHaveBeenCalledWith(0, 0, 500 + PADDING, 500 + PADDING);
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
                    var topBorder = leftBorder = PADDING;
                    expect(view.drawTile.calls.argsFor(0)).toEqual([null, leftBorder, topBorder, TILE_SIZE, false]);
                    expect(view.drawTile.calls.argsFor(1)).toEqual([null, leftBorder + PADDING + TILE_SIZE, topBorder, TILE_SIZE, false]);
                    expect(view.drawTile.calls.argsFor(2)).toEqual([null, leftBorder + 2 * (PADDING + TILE_SIZE), topBorder, TILE_SIZE, false]);
                });

                it("draws tile in rows below each other", function () {
                    view.displayBoard([
                        [0],
                        [0]
                    ]);

                    context = document.createElement('canvas').getContext('2d');

                    var firstCall = view.drawTile.calls.argsFor(0)
                    firstCall[0] = null;
                    var topBorder = leftBorder = PADDING;
                    expect(firstCall).toEqual([null, leftBorder, topBorder, TILE_SIZE, false]);


                    var secondCall = view.drawTile.calls.argsFor(1);

                    secondCall[0] = null;
                    expect(secondCall).toEqual([null, leftBorder , topBorder + TILE_SIZE + PADDING, TILE_SIZE, false]);


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


});