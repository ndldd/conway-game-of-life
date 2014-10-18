define(function () {
    var SimRunner = function (board) {

        this.board = board;
        this.halt = false;




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
//        console.log('running');
//        console.log('running');
        if (!this.halt) {
        this.board.makeNextGeneration();
            window.setTimeout(function () {
                this.run();
            }.bind(this), 200);
        }

    };
    SimRunner.prototype.stop = function () {
        this.halt = true;
    };


    SimRunner.prototype.reset = function () {
        this.board.makeRandom()
//        this.halt


    };

    return SimRunner;
})