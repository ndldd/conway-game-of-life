define(['text!views/viewtemplate.html'], function (template) {
    var View = function () {
//        template = require(['text!./viewtemplate.html']);
        console.log(template);
        var container = document.getElementById('view-container');

//        containter.appendChild(startButton);

//
//        stopButton.name = 'stopButton';
//
//        var containter = document.getElementById('view-container');
//        containter.appendChild(stopButton);


        var buttons = ['startButton', 'stopButton', 'continue'];

        buttons.forEach(function (button) {

            var newButton = document.createElement('button');

            newButton.name = button;

            container.appendChild(newButton);

        });


    };
    return View;

});