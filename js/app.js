/**
 * Created by thomas on 07.10.14.
 */


define(['./controller', './canvasController'], function (Controller, canvasController) {
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
    var controller = app.controller = new Controller();


    controller.createBoard();
    controller.drawBoard();
    controller.removeBoard();

//    setInterval(function () {

    controller.refresh();


    return app;
//    controller.stop();
//    }, 20);
});
