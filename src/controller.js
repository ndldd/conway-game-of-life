define(['./models/board' ], function (Board) {

    var Controller = function (counter, simRunner, view) {
        if (view) {
            this.view = view;
            this.displayCounter();
        }
        this.timeouts = [];
        if (counter != null) {
            this.generationCounter = counter;
        }
        this.name = 'classic / No Canvas';
        if (simRunner) {
            this.simRunner = simRunner;
        }
    };

    Controller.prototype.setView = function (view) {
        this.view = view;
        this.view.draw();
    };

    Controller.prototype.startSimulation = function () {
        this.simRunner.start();
    };

    Controller.prototype.resetSimulation = function () {
        this.simRunner.reset();
    };

    Controller.prototype.displayCounter = function () {
        this.view.addCounter();
    };

    Controller.prototype.stopSimulation = function () {
        this.simRunner.stop();
    };

    return Controller;
});

