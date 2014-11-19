
# Conway's Game of Life in HTML5/JavasScript


In this simulation living cells are represented as black tiles on a white board.   
The survival of a cell depends only on its number of live neighbour cells in the current generation.
When the board is updated the survival for each cell is calculated and the next Generation of cells is created. 
 [details on the rules ] (http://en.wikipedia.org/wiki/Conway%27s_Game_of_Life).
 
 
## About this demo project:

The MVC pattern was used to decouple the application modules. 
test-driven development and of a framework that provides dependency injection like AngularJS.
In this implementation you can switch between a "classic HTMLView" (which uses Div elements) and a "CanvasView" which uses the HTML5 canvas element to represent the cells.



### View classes: CanvasView and HtmlView:
* CanvasView is a subclass of the HtmlView and has the same API as its parent. 
* The view classes have their own templates and handle all the DOM manipulations
* The CanvasView class overrides only the methods for drawing the board.
* thew View instances observe the models and reflect their changes. 
 
    
### Model classes and their responsibilities:
* the model classes are decoupled from the view: When switching the view the model instances are not affected
* board: Wraps a two dimensional array that represents the current generation in the conway world, calculates the next Generation
* simRunner: times the generations 
* counter: Counts the Generations


### Controller:
* acts as a mediator; handles commands from the views (button presses) and configures simRunner

### App Class:
* Acts as a builder that instantiates the classes and connects them.

* RequireJS is used to modularize and namespace the app and to load the dependencies.
* the Jasmine test framework is used together with the karma-test runner for unit testing


# Runnnig the code locally  (requires nodejs installed)

* clone the project then use:


    npm install

 

* under Linux you can then start a development web server with                                                         



    npm start
    
        OR
 
    nodejs node_modules/http-server/bin/http-server
 
        
# Running the tests
 (requires chrome to be installed)
      
      
    npm test
    
        OR       
    
    nodejs node_modules/karma/bin/karma start
        
        

    


