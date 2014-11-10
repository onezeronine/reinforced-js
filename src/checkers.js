var Checkers = function(options) {
    this.dimension = 8;
}

Checkers.prototype = {
    initialize: function () {
        this.blocks = [];

        for (var i = 0; i < this.dimension; ++i) {
            this.blocks.push([]);
            for (var j = 0; j < this.dimension; ++j) {
                this.blocks[i].push({
                    state: "empty"
                });
            }
        }
    },

    draw: function (canvas, context) {
        var size = canvas.width / this.dimension;

        context.clearRect(0, 0, canvas.width, canvas.height);

        for (var row = 0, i = 0; row < canvas.width; row += size, ++i) {
            for (var col = 0, j = 0; col < canvas.width; col += size, ++j) {
                context.fillStyle = (i % 2 == 0 && j % 2 == 0) || (j % 2 == 1 && i % 2 == 1) ? '#ffcc99' : '#8A5C2E';
                context.fillRect(row, col, size, size);
            }
        }

        var blackPiece = new Image();
        blackPiece.onload = function () {
            context.drawImage(blackPiece, 87, 14, 50, 50);
            context.drawImage(blackPiece, 87, 164, 50, 50);
            context.drawImage(blackPiece, 13, 89, 50, 50);
        };
        blackPiece.src = "contents/black.gif";
    }
}
