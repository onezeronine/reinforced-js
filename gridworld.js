(function() {
    var canvas = document.querySelector("#canvas");
    var context = canvas.getContext('2d');
    var env = new Environment(3, 0.41, 0.34);
    
    var go = document.querySelector("#go");
    env.draw(canvas,context);
    go.onclick = function()
    {    
        env.draw(canvas,context);
        env.step(1);
    };
    
    
}());

