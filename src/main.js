

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


require([ './conwayapp'], function(App){
    conway = new App();
    conway.run();


});
