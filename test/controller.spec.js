




define([ 'js/controller','js/counter'], function (Controller, Counter) {


    describe('Controller', function(){


//        it('has')
        var counter, controller;


        beforeEach(function(){
             document.body.innerHTML = window.__html__['test_fixtures/body.html'];
              counter = new Counter();
          controller = new Controller(counter);
        });
        it('adds counter', function(){


//            console.log(document.body.innerHTML);

            expect(document.getElementById('generationCounter')).toBe(null);
            controller.displayCounter();
             expect(document.getElementById('generationCounter')).not.toBe(null);
        });
    });

});