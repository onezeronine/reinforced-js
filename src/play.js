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

} ());