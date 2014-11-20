define(['../conwayapp.constants'],function (constants) {


    var SimRunner = function (board) {
        this.board = board;
        this.halt = false;
        this.stepDuration = constants.stepDuration;
    };

    SimRunner.prototype.start = function () {
        this.halt = false;
        this.run();
    };

    SimRunner.prototype.run = function () {
        if (! this.started){
            this.board.makeRandom();
            this.started=true;
        }
        if (!this.halt) {
        this.board.makeNextGeneration();
            window.setTimeout(function () {
                this.run();
            }.bind(this), this.stepDuration);
        }
    };

    SimRunner.prototype.stop = function () {
        this.halt = true;
    };

    SimRunner.prototype.reset = function () {
        this.board.makeRandom();
    };

    return SimRunner;
});