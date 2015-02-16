define(['src/views/canvasview', 'src/models/counter', 'src/conwayapp.constants', 'text!src/views/canvasviewtemplate.html'], function (View, Counter, constants, canvasTemplate) {
    // tests specific to the canvas view
    describe("CanvasView,", function () {
        describe("on instantiation sets type ", function () {
            var view;

            beforeEach(function () {
                view = new View();
            });

            it("is a subclass of view", function () {
                expect(view instanceof View).toBe(true);
            });

            it("is class Canvas View", function () {
                expect(view instanceof View).toBe(true);
            });
        });

        describe("on instantiation takes canvas template injection", function () {
            var view;

            it("view has a canvas board", function () {
                view = new View({}, {}, canvasTemplate);

                expect(document.querySelector('canvas').id).toBe('board');
            });
        });

        describe("when displayboard is called,", function () {
            var view;
            var canvas;
            var context;
            var tileSize = constants.tileSize;
            var padding = constants.padding;

            beforeEach(function () {
                view = new View({}, {}, canvasTemplate);
                context = jasmine.createSpyObj('context', ['fillRect', 'fillStyle', '']);
                canvas = {getContext: jasmine.createSpy('canvasSpy').and.returnValue(context)};
                canvas.style = {};
            });

            it("calls method to create a background  ", function () {
                spyOn(view, 'drawBoardBackground');
                var board = [[1]];

                view.displayBoard(board, canvas);

                expect(view.drawBoardBackground).toHaveBeenCalled();
            });

            it("gets dimensions from the _board", function () {
                var board = [
                    [1, 1],
                    [1, 1],
                    [1, 1]
                ];
                spyOn(view, 'calculateCanvasSize');

                view.displayBoard(board);

                expect(view.calculateCanvasSize).toHaveBeenCalledWith(board, tileSize, padding);// displayBoard
            });

            it("calculate canvasSize", function () {
                // todo:calculate canvas size test
            });

            it("gets a context object from (optional) canvas object", function () {
                view.displayBoard({}, canvas);

                expect(canvas.getContext).toHaveBeenCalledWith('2d');
            });

            it("drawBoardBackground creates Rect", function () {
                var backgroundWidth = 500;
                var backgroundHeight = 500;

                view.drawBoardBackground(context, backgroundWidth, backgroundHeight);

                expect(context.fillStyle).toBe('lightgray');
                expect(context.fillRect).toHaveBeenCalledWith(0, 0, backgroundWidth + padding, backgroundHeight + padding);
            });

            it("draws a row", function () {
                spyOn(view, 'drawRow');
                var board = [[1]];

                view.displayBoard(board, canvas);

                expect(view.drawRow).toHaveBeenCalled();
            });

            it("draw multiple rows", function () {
                spyOn(view, 'drawRow');
                var board = [[0], [0]];

                view.displayBoard(board, canvas);

                expect(view.drawRow.calls.count()).toBe(2);
            });

            describe("on drawRow", function () {
                var spy;

                beforeEach(function () {
                    spy = spyOn(view, 'drawTile');
                });

                it("draws row of tiles", function () {
                    var row = [0, 0, 0];

                    view.drawRow(null, row);

                    expect(view.drawTile.calls.count()).toBe(row.length);
                });

                it("draws tiles next to each other", function () {
                    var topBorder, leftBorder, padding;
                    var rowNumber = 0;
                    var padding = 1;

                    var context = {};
                    view.drawRow(context, [0, 0, 0], rowNumber);

                    topBorder = leftBorder = padding;

                    expect(view.drawTile.calls.argsFor(0)).toEqual([context, leftBorder, topBorder, tileSize, false]);
                    expect(view.drawTile.calls.argsFor(1)).toEqual([context, leftBorder + padding + tileSize, topBorder, tileSize, false]);
                    expect(view.drawTile.calls.argsFor(2)).toEqual([context, leftBorder + 2 * (padding + tileSize), topBorder, tileSize, false]);
                });

                it("draws tile in rows below each other", function () {
                    var topBorder, leftBorder;
                    var firstCall, secondCall;
                    var padding = 1;
                    topBorder = leftBorder = padding;
                    var board = [[0], [0]];
                    var context = {fillRect: jasmine.createSpy()};
                    var canvas = {getContext: jasmine.createSpy().and.returnValue(context)};
                    canvas.style = {};

                    view.displayBoard(board, canvas);

                    firstCall = view.drawTile.calls.argsFor(0);
                    secondCall = view.drawTile.calls.argsFor(1);
                    expect(firstCall).toEqual([context, leftBorder, topBorder, tileSize, false]);
                    expect(secondCall).toEqual([context, leftBorder, topBorder + tileSize + padding, tileSize, false]);
                });
            });

            it("drawTiles fills tiles", function () {
                var tileSize=3;

                view.drawTile(context, 1, 2, tileSize);

                expect(context.fillRect).toHaveBeenCalledWith(1, 2, tileSize, tileSize);
            });

            it("drawsTiles black when cell is alive white otherwise", function () {
                var tileSize=4;
                var alive = false;

                view.drawTile(context, null, null, tileSize, alive);

                expect(context.fillStyle).toBe('white');

                alive = true;

                view.drawTile(context, null, null, tileSize, alive);

                expect(context.fillStyle).toBe('black');
            });
        });
    });
});