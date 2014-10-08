/**
 * Created by thomas on 07.10.14.
 */


define(['./controller', './canvasController', './counter'], function (Controller, canvasController, Counter) {
//require(['./controller' ], function () {

    var body = document.getElementsByTagName('body')[0];

    body.addEventListener("click", function (event) {

        // event here

        event.stopPropagation();
        event.preventDefault();
        console.log(event);
//        event.cancel();
//        event.stopPropagation();
//        return false;
    }, false);

    var app = {
        switch: function () {

            alert('switch');
            this.controller.stop();
            this.controller = canvasController;
            this.displayControllerName();

        },
        displayControllerName: function () {

//            var nameTag = document.createElement('p');
            var nameTag = 'Controller type: ' + this.controller.name;
            var label = document.getElementById('controller-name');

            label.innerText = nameTag;
        }

    };

    var counter = new Counter();
    var controller = app.controller = new Controller(counter);


    controller.createBoard();
    controller.drawBoard();
    controller.displayCounter();
    controller.removeBoard();

//    setInterval(function () {

    controller.refresh();


    return app;
//    controller.stop();
//    }, 20);
});
