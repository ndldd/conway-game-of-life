//board = new Board(32,44);
//console.log(board);
//
//board.makeRandom()
//console.log(board);


//require.config({
//    paths: {
//        text: 'text.js'
//    }
//    }
//    require(["./app"])
//        ,      /**/
//    function(app) {
        //This function will be called when all the dependencies
        //listed above are loaded. Note that this function could
        //be called before the page is loaded.
        //This callback is optional.
//    app();

//

require.config({
  paths: {
    // Major libraries
//    /*jquery: 'libs/jquery/jquery-min',
//    underscore: 'libs/underscore/underscore-min', // https://github.com/amdjs
//    backbone: 'libs/backbone/backbone-min', // https://github.com/amdjs
//*/
    // Require.js plugins
    text: './text'

  }


})


require([ './app'], function(app){
    app
    app.run();
    conway = app;
    app.displayControllerName();
});
