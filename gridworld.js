(function() {
    var agent = new Agent({
        alpha: 0.5,
        gamma: 0.34
    });
    var grid = new Environment(3);
    grid.train(agent);
    
    var canvas = document.querySelector("#canvas");
    var context = canvas.getContext('2d');
    
    grid.draw(canvas, context);
}());

