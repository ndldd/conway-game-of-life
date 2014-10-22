

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
