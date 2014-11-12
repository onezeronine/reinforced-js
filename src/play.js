(function () {
    var canvas = document.querySelector("#canvas");
    var context = canvas.getContext('2d');
    var player = {
        x: -1,
        y: -1,
        color: "none",
        state: "none"
    };
    
    var checkers = new Checkers({
        canvas: canvas,
        context: context
    });
    
    checkers.initialize();
    checkers.draw();
    
    canvas.addEventListener('click', function(e) {
        var coordinates = canvas.relMouseCoords(e);
        var index = checkers.getBlockIndex(coordinates.x, coordinates.y);
        if(player.state === "none"){
            player.x = index.fromX;
            player.y = index.fromY;
            player.color = index.color;
            player.state = "selected"; 
            console.log(player.x + ", " + player.y + " = " + index.fromX + ", " + index.fromY);
        }
        else if(player.state === "selected"){
            checkers.move(player.color, player.x, player.y, index.fromX, index.fromY);
            checkers.draw();
            player.x = -1;
            player.y = -1;
            player.color = "none";
            player.state = "none";
        }
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