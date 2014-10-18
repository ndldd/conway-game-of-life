define(['require' , 'js/app' ], function (require, app) {

    beforeEach(function () {
        document.body.innerHTML = window.__html__['index.html'];

    });
    describe('app', function () {

        describe('building object graph', function () {
            beforeEach(function () {

            });
            afterEach(function () {
                delete app.view;
                delete app.board;
            });

            it('init', function () {


                app.init();
                expect(app.view).toBeDefined();
                expect(app.view.board).toBeDefined();


                expect(app.controller).toBeDefined();
                expect(app.controller.simRunner).toBeDefined();
                expect(app.controller.simRunner.board).toBeDefined();

            });

            it('init board ', function () {

                expect(app.board).toBeUndefined();
                app.init();
                expect(app.board).toBeDefined();
                // must be larger than zero


            });


        });
    });
    describe("exposes controller methods", function () {
        it("start", function () {
            expect(app.start).toBeDefined();
        });
        it("stop", function () {
            expect(app.stop).toBeDefined();

        });
        it("reset", function () {
             expect(app.reset).toBeDefined();

        });

    });

    describe("passing references", function () {
        beforeEach(function () {
            app.init();
        });
        it("View to Controller", function () {
            expect(app.controller.view).toBeDefined();
        });
        it("counter to view", function () {

            expect(app.view.counter).toBeDefined();


        });
        it("counter to board", function () {
            expect(app.board.counter).toBeDefined();
        });

    });



});