/**
 * Created by thomas on 03.10.14.
 *
 */


var MYAPP = MYAPP || {};


function Board(rows,columns){

    this.rows = rows;
    this.columns = columns;



    this.init = function(rows,columns){

//        rows = []
//        for (var i=0;i<columns; i++){
//
//        }
        this.board = new Array();
        row = new Array(columns);

        var arr,j;
        for (var i=0; i<rows; i++){

            arr = [];
            j = columns;
              while (j--) {
                arr[j] = 0;
              }
            this.board.push(arr);
            }


    };
    this.init(rows,columns);

}

Board.prototype.createEmptyBoard= function() {
    this.board = [];



};
Board.prototype.makeRandom = function(){

    this.board = new Array();
        row = new Array(this.columns);

        var arr,j;
        for (var i=0; i<this.rows; i++){

            arr = [];
            j = this.columns;
              while (j--) {
                arr[j] = Math.floor(Math.random()*2);
              }
            this.board.push(arr);
            }


//    this.board = []
    Math.random()
};

Board.prototype.getBoard= function () {

    return this.board;

}
Board.prototype.logBoard= function () {

//    return this.Board;

}
Board.prototype.calculate = function (x,y) {

    var sum = 0;
    if (x>0){
        console.log('above');
        sum += this.board[x-1][y];
    }
    sum +=this.board[x][y];
    console.log(this.rows);
    console.log(this.board);
    if (x< (this.rows-1))

    {
        console.log('below');
        sum += this.board[x+1][y];
    }
    return sum;
}
a = new Board('thomas');

for (row in a.board) {
//    console.log(a.board[row][2]);
}


Board.prototype.setValue= function(value, x,y){
    this.board[x][y]= value;

}

//var sum = a.calculate(1,2)
//var sum = a.calculate(2,2)
//console.log(sum);