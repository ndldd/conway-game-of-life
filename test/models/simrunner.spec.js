define(['js/models/simrunner', 'js/app.constants' ], function (SimRunner, constants) {

    describe('SimRunner', function () {
        describe('creates initialized objects', function () {

            var runner;


            it("has calls a board", function () {

                var board = {};
                runner = new SimRunner(board);
                expect(runner).toBeDefined();
                expect(runner.board).toBeDefined();
                expect(runner.stepDuration).toBeDefined();


            });
        });
        describe('', function () {

            var runner;

            var board;
            var spy;
            var SIM_DURATION = constants.stepDuration;

            beforeEach(function () {

                board = { makeNextGeneration: function () {

                },
                    makeRandom: function () {
                    }
                };

                spy = spyOn(board, 'makeNextGeneration');

                jasmine.clock().install();

                runner = new SimRunner(board);
//                board.makeNextGeneration().reset()

            })
            afterEach(function () {
                board.makeNextGeneration.calls.reset();
            })

            it("on start calls its board", function () {

                spy = jasmine.createSpy('makeNextGeneration');


                var board = {makeNextGeneration: spy, makeRandom: function () {
                }}


                runner = new SimRunner(board);

                runner.start();
                expect(spy).toHaveBeenCalled();
            });


            it("calls repeatedly after timeout", function () {

                board.makeNextGeneration.calls.reset();

                runner.start();


                expect(spy).toHaveBeenCalled();

                jasmine.clock().tick(SIM_DURATION+1);                // TODO:must be a constant to work



                expect(board.makeNextGeneration.calls.count()).toEqual(2);
                jasmine.clock().tick(SIM_DURATION+1);
                expect(board.makeNextGeneration.calls.count()).toEqual(3);

            });

            it("on stop halts", function () {
//                 board.makeNextGeneration.calls.reset();
                runner.start();

                expect(spy).toHaveBeenCalled();
                jasmine.clock().tick(SIM_DURATION+1);
                expect(board.makeNextGeneration.calls.count()).toEqual(2);


                runner.stop()
                jasmine.clock().tick(SIM_DURATION+1);
                expect(board.makeNextGeneration.calls.count()).toEqual(2);

            });

            it('on start restarts after halt', function () {
                board.makeNextGeneration.calls.reset();

                runner.start();
                expect(board.makeNextGeneration.calls.count()).toEqual(1);
                runner.stop();
                jasmine.clock().tick(SIM_DURATION+1);
                expect(board.makeNextGeneration.calls.count()).toEqual(1);
                runner.start();
                expect(board.makeNextGeneration.calls.count()).toEqual(2);
                jasmine.clock().tick(SIM_DURATION+1);
                expect(board.makeNextGeneration.calls.count()).toEqual(3);

            });
            it("on reset makes a random board", function () {


                var spy= spyOn(board, 'makeRandom');


                runner.reset();


                expect(board.makeRandom).toHaveBeenCalled();

            });


        });
    });

});