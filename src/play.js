(function () {
    var canvas = document.querySelector("#canvas"),
        context = canvas.getContext('2d'),
        track = {
            x: -1,
            y: -1,
            color: "none",
            selected: false
        },
        checkers = new Checkers({
            canvas: canvas,
            context: context
        }),
        history = $("#history");

    checkers.initialize();
    checkers.draw();

    var appendTo = function (index) {
        var text = track.color + ": (" + index.fromX + "," + index.fromY + ") to (" +
                    track.x + "," + track.y + ")";
        history.append($("<div>").text(text));
    };

    var canvasOnClick = function (e) {
        var coordinates = canvas.relMouseCoords(e);
        var index = checkers.getIndexFromCoordinates(coordinates.x, coordinates.y);

        if (track.selected) {
            appendTo(index);

            checkers.move(track.color, track.x, track.y, index.fromX, index.fromY);
            checkers.draw();

            track.x = -1;
            track.y = -1;
            track.color = "none";
            track.selected = false;
        }
        else if (!track.selected) {
            track.x = index.fromX;
            track.y = index.fromY;
            track.color = index.color;
            track.selected = true;
        }


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