define([ 'js/controller', 'js/models/counter', 'js/views/view'], function (Controller, Counter, View) {
    describe('Controller', function () {

        describe("after instantiation ", function () {

            var counter, controller, view;
            beforeEach(function () {
                document.body.innerHTML = window.__html__['index.html'];
                view = new View();
//                counter = new Counter();
//                controller = new Controller();

//                spy = spyOn(controller, 'startSimulation');
                controller = jasmine.createSpyObj('controller', ['startSimulation', 'stopSimulation', 'resetSimulation'])

                window.conway = {
                    controller: controller,
                    start: controller.startSimulation.bind(controller),
                    stop: controller.stopSimulation.bind(controller),
                    reset: controller.resetSimulation.bind(controller),
                }
            });


            describe("click events from the view are handled", function () {
                it("on start", function () {
                    var startButton = document.getElementById('start-btn');
                    startButton.onclick();

                    expect(controller.startSimulation).toHaveBeenCalled();
                });

                it("on stop", function () {
                    var button = document.getElementById('stop-btn');
                    button.onclick();

                    expect(controller.stopSimulation).toHaveBeenCalled();
                });

                it("on reset", function () {
                    button = document.getElementById('reset-btn');
                    button.onclick();

                    expect(controller.resetSimulation).toHaveBeenCalled();
                });


            });

            describe("messages simRunner to ", function () {
                beforeEach(function () {
                    simRunner= jasmine.createSpyObj('simRunner', ['start', 'stop', 'reset'])
                    controller = new Controller(null, simRunner);
                });

                it("start simulations", function () {
                    controller.startSimulation();

                    expect(simRunner.start).toHaveBeenCalled();
                });

                it("stop simulation", function () {
                    controller.stopSimulation();

                    expect(simRunner.stop).toHaveBeenCalled();

                });

                it("reset simulation", function () {
                    controller.resetSimulation();
                    expect(simRunner.reset).toHaveBeenCalled();
                });

            });

        });

        describe('tells view to add Counter', function () {

            var controller;
            var counter;
            var view;
            beforeEach(function () {
//            document.body.innerHTML = window.__html__['test_fixtures/body.html'];
//                document.body.innerHTML = window.__html__['index.html'];
                counter = new Counter();
                view = new View({},counter);
                controller = new Controller(counter,{},view);
            });

            it('adds counter', function () {

//                expect(document.getElementById('generationCounter')).toBe(null);


                spyOn(view,'addCounter');
                controller.displayCounter();

                expect(view.addCounter).toHaveBeenCalled();

            });
            it("adds counter on init", function () {
                view = new View();

                spyOn(view, 'addCounter');
                controller = new Controller(counter,{}, view);
                expect(view.addCounter).toHaveBeenCalled();

            });



        });


        describe('after click on stop', function () {


            it("stops sim runner on stop event", function () {

                var simRunner = { stop: { } };

                controller = new Controller(null, simRunner)
                var spy = spyOn(simRunner, 'stop');

                controller.stopSimulation();
                expect(simRunner.stop).toHaveBeenCalled();


            });

        });
    });

})
;