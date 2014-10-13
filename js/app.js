/**
 * Created by thomas on 07.10.14.
 */


define(['./controller', './canvasController', './counter'], function (Controller, canvasController, Counter) {
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
            this.controller = new Controller(counter);
            this.view = {};


        },
        run: function () {
            this.init();
            this.controller.createBoard();
            this.controller.drawBoard();
            this.controller.displayCounter();
            this.controller.removeBoard();
            this.controller.refresh();


        }
    };


    return app;

});
