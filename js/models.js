/**
 * Created by thomas on 03.10.14.
 */
var MYAPP = MYAPP || {};


function Board (firstName){
    this.rows =3;
    //private
    this.board = [[0,0,1],[0,0,1],[0,0,1]];

}

Board.prototype.sayHello = function() {

};

Board.prototype.getBoard = function () {

    return this.board;

}
Board.prototype.logBoard= function () {

//    return this.board;

}
Board.prototype.calculate = function (x,y) {

    var sum = 0
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


var sum = a.calculate(1,2)
var sum = a.calculate(2,2)
console.log(sum);