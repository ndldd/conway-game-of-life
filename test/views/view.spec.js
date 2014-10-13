define(['js/views/view'], function (View) {

    describe('view', function () {
        var container;
        beforeEach(function () {
//                document.body.innerHTML = window.__html__['test_fixtures/body.html'];
            document.body.innerHTML = window.__html__['index.html'];

            container = document.getElementById('view-container');
            view = new View();

        })
        it('there is a view-container ', function () {
            expect(container).toBeDefined();


        });

        it('adds board', function () {
            var board = document.getElementById('board');
            expect(board).toBeDefined();
        })
        it("contains controls", function () {
            var button = document.getElementsByName("startButton")[0];
            expect(button).toBeDefined();
        })

        it("stop button", function () {
            var btn = document.getElementsByName("stopButton")[0];
            expect(btn).toBeDefined();
        });

        it("continue", function () {
            var btn = document.getElementsByName("continue")[0];
            expect(btn).toBeDefined();
        });

    });


});
