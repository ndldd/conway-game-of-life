/**
 * Created by thomas on 07.10.14.
 */


define(['./controller', './canvasController', './models/counter','./views/view' ,'./models/board' , './models/simrunner'], function (Controller, canvasController, Counter, View, Board,SimRunner ) {
//require(['./controller' ], function () {

//    var body = document.getElementsByTagName('body')[0];

//    body.addEventListener("click", function (event) {


//        event.stopPropagation();
//        event.preventDefault();
//        console.log(event);
//
//    }, false);

    var app = {
        switch: function () {

            alert('switch');
            this.controller.stop();
            this.controller = canvasController;
            this.displayControllerName();

        },
        displayControllerName: function () {


            var nameTag = 'Controller type: ' + this.controller.name;
            var label = document.getElementById('controller-name');
//
            label.innerText = nameTag;


        },

        init: function(){
            var counter = new Counter();
            this.board = new Board(100,100, counter);

            var simRunner = new SimRunner(this.board);
            this.view = new View(this.board, counter );
            this.controller = new Controller(counter, simRunner, this.view);
            this.view.subscribe(this.board);

            this.controller.startSimulation();

            this.start = this.controller.startSimulation.bind(this.controller);
            this.stop= this.controller.stopSimulation.bind(this.controller);
            this.reset= this.controller.resetSimulation.bind(this.controller);




//            this.view.displayBoard([[0,1,1],[1,1,1]]);



        },
        run: function () {
            this.init();
//            this.controller.createBoard();
//            this.controller.drawBoard();
//            this.controller.displayCounter();
//            this.controller.removeBoard();
//            this.controller.refresh();


        }
    };


    return app;

});
