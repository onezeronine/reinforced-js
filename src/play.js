(function(){
    var checkers = new Checkers();
    var canvas = document.querySelector("#canvas");
    var context = canvas.getContext('2d');
    checkers.initialize();
    checkers.draw(canvas, context);
}());