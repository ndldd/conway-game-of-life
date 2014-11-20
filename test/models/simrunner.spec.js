define(['src/models/simrunner', 'src/conwayapp.constants'], function (SimRunner, constants) {
    describe('SimRunner', function () {
        describe('on initialization, ', function () {
            var runner;
            it("sets board and step duration", function () {
                var board = {};

                runner = new SimRunner(board);

                expect(runner).toBeDefined();
                expect(runner.board).toBeDefined();
                expect(runner.stepDuration).toBeDefined();
            });
        });

        describe('after instantiation, ', function () {
            var runner;
            var board;
            var spy;
            var simDuration = constants.stepDuration;

            beforeEach(function () {
                board = {
                    makeNextGeneration: function () {
                    },
                    makeRandom: function () {
                    }
                };

                spy = spyOn(board, 'makeNextGeneration');

                jasmine.clock().install();

                runner = new SimRunner(board);
            });

            afterEach(function () {
                board.makeNextGeneration.calls.reset();
            });

            it("on start calls its board", function () {
                runner = new SimRunner(board);

                runner.start();
                expect(spy).toHaveBeenCalled();
            });

            it("calls repeatedly after timeout", function () {
                runner.start();

                expect(spy).toHaveBeenCalled();

                jasmine.clock().tick(simDuration + 1);

                expect(board.makeNextGeneration.calls.count()).toEqual(2);

                jasmine.clock().tick(simDuration + 1);

                expect(board.makeNextGeneration.calls.count()).toEqual(3);
            });

            it("on stop halts", function () {
                runner.start();

                expect(spy).toHaveBeenCalled();

                jasmine.clock().tick(simDuration + 1);

                expect(board.makeNextGeneration.calls.count()).toEqual(2);

                runner.stop();

                jasmine.clock().tick(simDuration + 1);

                expect(board.makeNextGeneration.calls.count()).toEqual(2);
            });

            it('on start restarts after halt', function () {
                board.makeNextGeneration.calls.reset();

                runner.start();

                expect(board.makeNextGeneration.calls.count()).toEqual(1);

                runner.stop();

                jasmine.clock().tick(simDuration + 1);

                expect(board.makeNextGeneration.calls.count()).toEqual(1);

                runner.start();

                expect(board.makeNextGeneration.calls.count()).toEqual(2);

                jasmine.clock().tick(simDuration + 1);

                expect(board.makeNextGeneration.calls.count()).toEqual(3);
            });

            it("on reset makes a random board", function () {
                spyOn(board, 'makeRandom');

                runner.reset();

                expect(board.makeRandom).toHaveBeenCalled();
            });
        });
    });
});