define(['js/counter'], function (Counter) {

//    console.log(counter);

    describe('counter', function () {

        var newCounter;
        beforeEach(function(){
            newCounter = new Counter();
        });
        it('returns zero', function () {
            expect(newCounter.get()).toBe(0);
        });


        it('adds', function(){
            newCounter.add();
            expect(newCounter.get()).toBe(1);
            newCounter.add();
            expect(newCounter.get()).toBe(2);
        });

        it('instances do not share value', function(){
            second = new Counter();
            newCounter.add()
            expect(second.get()).toBe(0);
            second.add();
            expect(second.get()).toBe(1);
            expect(newCounter.get()).toBe(1);

        });

        it('resets', function(){
            newCounter.add();
            newCounter.reset();
            expect(newCounter.get()).toBe(0);
        })

    });


});