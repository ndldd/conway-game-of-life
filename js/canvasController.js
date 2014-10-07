/**
 * Created by thomas on 07.10.14.
 */


define(['./board', './controller'], function (Board) {

    // wann als factory wann als instance?

    var controller = {
        name: 'Canvas',
        stop: function () {
            alert('stop');

        },
        continue: function () {
            alert('canvas continue');

        }
    };


    return controller;
});