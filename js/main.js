//board = new Board(32,44);
//console.log(board);
//
//board.makeRandom()
//console.log(board);


//require.config({
//    paths: {
//        app: './/app.js'
//    }                ,
//    require(["./app"])
//        ,      /**/
//    function(app) {
        //This function will be called when all the dependencies
        //listed above are loaded. Note that this function could
        //be called before the page is loaded.
        //This callback is optional.
//    app();
// );


require(['./app'], function(app){
    conway = app;
    app.displayControllerName();
});
