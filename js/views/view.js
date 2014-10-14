define(['text!./viewtemplate.html'], function (template) {
    console.log('-----------');
    console.log(template);
    var View = function () {
//        template = require(['text!./jsviewtemplate.html']);
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