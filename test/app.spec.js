define(['js/app'], function (app) {

    beforeEach(function () {
        document.body.innerHTML = window.__html__['index.html'];

    });
    describe('app', function () {


        describe('building object graph', function () {

            beforeEach(function () {

            })
            it('init', function () {

                app.init();
                expect(app.view).toBeDefined();
                expect(app.controller).toBeDefined();
            });

            it(' ', function () {


            });

        })
    });


});