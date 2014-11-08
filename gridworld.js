(function() {
    var stepsDOM = document.querySelector("#steps"); 
    var discountDOM = document.querySelector("#discount");
    var stepsizeDOM = document.querySelector("#stepsize");
    
    stepsDOM.value = 5;
    discountDOM.value = 0.5;
    stepsize.value = 0.4;
    
    var canvas = document.querySelector("#canvas");
    var context = canvas.getContext('2d');
    var env = new Environment(3);
    
    var go = document.querySelector("#go");
    env.draw(canvas,context);
    
    go.onclick = function()
    {    
        var steps = parseInt(stepsDOM.value);
        var discount = parseFloat(discountDOM.value);
        var stepsize = parseFloat(stepsizeDOM.value);
    
        env.draw(canvas,context);
        env.step(steps, discount, stepsize);
    };
    
    
}());

