define(['require' , 'src/conwayapp' , 'src/views/view', 'src/views/canvasview', 'text!./../src/views/canvasviewtemplate.html' ], function (require, App, View, CanvasView, canvasViewTemplate) {


    var app;
    beforeEach(function () {
        document.body.innerHTML = window.__html__['index.html'];
        app = new App();

    });
    describe('app', function () {

        describe('building collaborators', function () {
            beforeEach(function () {


            });


            it('init', function () {

                app.init();


                expect(app.controller).toBeDefined();
                expect(app.controller.simRunner).toBeDefined();
                expect(app.controller.simRunner.board).toBeDefined();
                expect(app.controller.view).toBeDefined();

            });

            it('init board ', function () {

                expect(app.board).toBeUndefined();
                app.init();
                expect(app.board).toBeDefined();

            });
            it("app has a counter", function () {
                app.init();
                expect(app.counter).toBeDefined();
            });


            describe("creates a view", function () {
                it("creates a view passes the model references", function () {

                    app.init();
                    expect(app.view).toBeDefined();
                    expect(app.view.counter).toBeDefined();
                    expect(app.view.board).toBeDefined();

                });
                it("remembers the current View type", function () {

                    app.init();
                    expect(app.currentView).toBeDefined();
                });
            });


            it("app has a controller", function () {

                app.init();
                expect(app.controller).toBeDefined();
            });

        });
        describe("passing dependencies", function () {
            it("", function () {
                /// TODO:method to give controller new view
            });
        });

        describe("exposes controller methods", function () {
            beforeEach(function () {
                app.init();
            });
            it("start", function () {
                expect(app.start).toBeDefined();
            });
            it("stop", function () {
                expect(app.stop).toBeDefined();

            });
            it("reset", function () {
                expect(app.reset).toBeDefined();

            });
            it("switchView", function () {
                expect(app.switchView).toBeDefined();

            });


        });


        describe("creating a View", function () {

            var view;
            beforeEach(function () {
                app.board = {addSubscriber: function () { }};
            });
            it("createView when passed a View constructor returns a View ", function () {
                view = app.createView(View);

                expect(view instanceof View).toBe(true);
                expect(view instanceof CanvasView).toBe(false);

            });
            it("createView when passed a CanvasView constructor returns a CanvasView ", function () {

                view = app.createView(CanvasView);

                expect(view instanceof View).toBe(true);
                expect(view instanceof CanvasView).toBe(true);

            });
            it("on create View passes components", function () {

                app.view = null;

                view = app.createView(View);

                expect(app.view).toBe(view);

            });

        });


        describe("on switchView", function () {


            beforeEach(function () {
                app.view = new View();
                app.controller = {setView:function(){}};
            });
            it("tells current View to destroy itself", function () {

                app.view = {destroy: jasmine.createSpy('spy')};

                app.controller = {setView : function () { }};
                app.switchView();

                expect(app.view.destroy).toHaveBeenCalled();

            });


            it("creates a CanvasView and set currentView", function () {

                app.view.destroy = function () {
                };
                app.createView = jasmine.createSpy('spy');


                app.currentView = 'HtmlView';
                app.switchView();


                expect(app.createView).toHaveBeenCalledWith(CanvasView, canvasViewTemplate);
                expect(app.currentView).toBe('CanvasView');


            });
            it("creates a HtmlView set currentView", function () {
                app.view.destroy = function () {
                };
                app.createView = jasmine.createSpy('spy');

                app.currentView = 'CanvasView';
                app.switchView();

                expect(app.createView).toHaveBeenCalledWith(View);
                expect(app.currentView).toBe('HtmlView');


            });

        });
        describe("on switch View", function () {
            var view;
            it("calls to select a new view ", function () {

            });
            it("controller gets a  reference to the new view", function () {

                app.controller = {setView : jasmine.createSpy('spy')};
                app.view= {destroy: function () { }};
                view = app.switchView()  ;


                expect(app.controller.setView).toHaveBeenCalled();

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


});