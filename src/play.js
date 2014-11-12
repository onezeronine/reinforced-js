(function () {
    var checkers = new Checkers({});
    var canvas = document.querySelector("#canvas");
    var context = canvas.getContext('2d');
    checkers.initialize();
    checkers.draw(canvas, context);

    checkers.move("red", 1, 2, 0, 3);
    checkers.draw(canvas, context);

    checkers.move("black", 0, 5, 0, 3);
    checkers.draw(canvas, context);

    checkers.move("black", 0, 5, 1, 4);
    checkers.draw(canvas, context);
    
    canvas.addEventListener('click', function(e) {
        var coords = canvas.relMouseCoords(e);
        // console.log(coords.x + ", " + coords.y);
    });
    
    HTMLCanvasElement.prototype.relMouseCoords = function (event){
        var totalOffsetX = 0;
        var totalOffsetY = 0;
        var canvasX = 0;
        var canvasY = 0;
        var currentElement = this;
        
        do {
            totalOffsetX += currentElement.offsetLeft - currentElement.scrollLeft;
            totalOffsetY += currentElement.offsetTop - currentElement.scrollTop;
        } 
        while(currentElement = currentElement.offsetParent)
        
        canvasX = event.pageX - totalOffsetX;
        canvasY = event.pageY - totalOffsetY;
        
        
        return { 
            x: canvasX, 
            y: canvasY 
        }
    }
        
    
    
    

} ());