(function () {
    var canvas = document.querySelector("#canvas"),
        context = canvas.getContext('2d'),
        selection = {
            x: -1,
            y: -1,
            color: "none",
            state: "none"
        },
        checkers = new Checkers({
            canvas: canvas,
            context: context
        }),
        history = $("#history");

    checkers.initialize();
    checkers.draw();

    var appendTo = function (index) {
        var text = index.color + ": (" + index.fromX + "," + index.fromY + ")";
        history.append($("<div>").text(text));
    };

    var canvasOnClick = function (e) {
        var coordinates = canvas.relMouseCoords(e);
        var index = checkers.getIndexFromCoordinates(coordinates.x, coordinates.y);
        appendTo(index);
    };
    canvas.addEventListener('click', canvasOnClick);


    function getOffset(evt) {
        var el = evt.target,
          x = 0,
          y = 0;

        while (el && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop)) {
            x += el.offsetLeft - el.scrollLeft;
            y += el.offsetTop - el.scrollTop;
            el = el.offsetParent;
        }

        x = evt.clientX - x;
        y = evt.clientY - y;

        return { x: x, y: y };
    }
    HTMLCanvasElement.prototype.relMouseCoords = getOffset;


} ());