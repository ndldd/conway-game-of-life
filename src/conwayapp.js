define(
    ['./controller',
        './models/counter',
        './views/view',
        './views/canvasview' ,
        './models/board' ,
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

            // create Models
            var counter = this.counter = new Counter();
            this.board = new Board(DEFAULT_SIZE, DEFAULT_SIZE, counter);
            var simRunner = new SimRunner(this.board);


            this.view = this.createView(CanvasView);
            this.currentView = 'CanvasView';

//            this.view = this.createView(View);
//            this.currentView = 'HtmlView';


            this.controller = new Controller(counter, simRunner, this.view);
            this.bindControls(this.controller);

            this.controller.startSimulation();

        };
        App.prototype.bindControls = function (controller) {
            this.start = controller.startSimulation.bind(controller);
            this.stop = controller.stopSimulation.bind(controller);
            this.reset = controller.resetSimulation.bind(controller);
        }


        App.prototype.switchView = function () {

            var newView;
            this.view.destroy();

            if (this.currentView === 'CanvasView') {
//            console.log('creating: html');

                this.view = this.createView(View);
                this.currentView = 'HtmlView';

            }
            else if (this.currentView === 'HtmlView') {
//            console.log('creating: html');
                this.view = this.createView(CanvasView, canvasViewTemplate);
                this.currentView = 'CanvasView';

            }
            this.controller.setView(this.view);


        };
        App.prototype.run = function () {
            this.init();

        };

        App.prototype.createView = function (ViewConstructor, board, counter) {

            var newView = new ViewConstructor(this.board, this.counter);

            this.view = newView;
            this.view.subscribe(this.board);

            return    newView;


        };


        return App;

    });
