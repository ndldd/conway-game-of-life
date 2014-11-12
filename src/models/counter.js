define(function () {




    var Counter = function () {
        this._counter = 0;
    };

    Counter.prototype.add = function () {

        this._counter += 1;


    };
    Counter.prototype.getCount = function () {

        return this._counter;
    };

    Counter.prototype.reset = function(){
        this._counter =0;
    };

    return Counter;
});
