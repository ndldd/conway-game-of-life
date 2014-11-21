define(
    ['./controller',
        './models/counter',
        './views/view',
        './views/canvasview',
        './models/board',
        './models/simrunner',
        'text!./views/canvasviewtemplate.html',
        './conwayapp.constants']
    , function (Controller, Counter, View, CanvasView, Board, SimRunner, canvasViewTemplate, constants) {

        var DEFAULT_SIZE = constants.defaultSize;
        var App = function () {
        };

        App.prototype.displayController = function () {
            var nameTag = 'Controller type: ' + this.controller.name;
            var label = document.getElementById('controller-name');
            label.innerText = nameTag;
        };

        App.prototype.init = function () {
            // create models
            var counter = this.counter = new Counter();
            this._board = new Board(DEFAULT_SIZE, DEFAULT_SIZE, counter);
            var simRunner = new SimRunner(this._board);
            this.view = this.createView(CanvasView);
            this.currentView = 'CanvasView';
            this.controller = new Controller(counter, simRunner, this.view);
            this.bindControls(this.controller);
            this.controller.startSimulation();
        };

        App.prototype.bindControls = function (controller) {
            this.start = controller.startSimulation.bind(controller);
            this.stop = controller.stopSimulation.bind(controller);
            this.reset = controller.resetSimulation.bind(controller);
        };

        App.prototype.switchView = function () {
            this.view.destroy();
            if (this.currentView === 'CanvasView') {
                this.view = this.createView(View);
                this.currentView = 'HtmlView';
            }
            else if (this.currentView === 'HtmlView') {
                this.view = this.createView(CanvasView, canvasViewTemplate);
                this.currentView = 'CanvasView';
            }
            this.controller.setView(this.view);
        };

        App.prototype.run = function () {
            this.init();
        };

        App.prototype.createView = function (ViewConstructor) {
            var newView = new ViewConstructor(this._board, this.counter);
            this.view = newView;
            this.view.subscribe(this._board);
            return newView;
        };

        return App;
    });