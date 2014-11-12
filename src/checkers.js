var Checkers = function (options) {
    options = options || {};
    this.dimension = 8;
    this.canvas = options.canvas || {};
    this.context = options.context || {};
}

Checkers.prototype = {
    initialize: function () {
        this.blocks = [];
        for (var i = 0; i < this.dimension; ++i) {
            this.blocks.push([]);
            for (var j = 0; j < this.dimension; ++j) {
                if (i % 2 != j % 2 && j <= 2) {
                    this.blocks[i].push({ state: "red" });
                }
                else if (i % 2 != j % 2 && j >= 5) {
                    this.blocks[i].push({ state: "black" });
                }
                else if (i % 2 == j % 2) {
                    this.blocks[i].push({ state: "invalid" });
                }
                else {
                    this.blocks[i].push({ state: "empty" });
                }
            }
        }
    },

    draw: function () {
        var width = this.canvas.width,
            height = this.canvas.height
            context = this.context,
            size = width / this.dimension,
            blks = this.blocks;
        
        context.clearRect(0, 0, width, height);

        for (var row = 0, i = 0; row < width; row += size, ++i) {
            for (var col = 0, j = 0; col < height; col += size, ++j) {
                context.fillStyle = (i % 2 == 0 && j % 2 == 0) || (j % 2 == 1 && i % 2 == 1) ? '#ffcc99' : '#8A5C2E';
                context.fillRect(row, col, size, size);
            }
        }

        var redPiece = new Image();
        redPiece.onload = function () {
            for (var row = 0, i = 0; row < width; row += size, ++i) {
                for (var col = 0, j = 0; col < height; col += size, ++j) {
                    if (blks[i][j].state === 'red') {
                        context.drawImage(redPiece, row + 11, col + 11, size * 0.7, size * 0.7);
                    }
                }
            }
        }
        redPiece.src = "contents/red.gif";

        var blackPiece = new Image();
        blackPiece.onload = function () {
            for (var row = 0, i = 0; row < width; row += size, ++i) {
                for (var col = 0, j = 0; col < height; col += size, ++j) {
                    if (blks[i][j].state === 'black') {
                        context.drawImage(blackPiece, row + 11, col + 11, size * 0.7, size * 0.7)
                    }
                }
            }
        }
        blackPiece.src = "contents/black.gif";
    },
    
    getBlockIndex: function (x, y){
        var size = this.canvas.width / this.dimension;
        var fromX = 0,
            fromY = 0;
        
        for(var i = 0; i < this.dimension; ++i) {
            if((size * i + 1) < x) fromX += 1;    
            if((size * i + 1) < y) fromY += 1;
        }
        
        return { fromX: fromX - 1, fromY: fromY - 1, color: this.blocks[fromX][fromY].state }
    },
    
    select: function (color, fromX, fromY) {
    
    },
    
    move: function (color, fromX, fromY, destX, destY) {
        var isValid = isMoveValid(this.blocks, {
            color: color,
            fromX: fromX,
            fromY: fromY,
            destX: destX,
            destY: destY
        });
        if (isValid) {
            this.blocks[fromX][fromY].state = "empty";
            this.blocks[destX][destY].state = color;
            return true;
        }
        return false;
    }
}

function isMoveValid(blocks, options)
{
    var destColor = blocks[options.destX][options.destY].state;
    var fromColor = blocks[options.fromX][options.fromY].state;
    if (destColor === 'black' || destColor === 'red' || destColor === 'invalid')
        return false;
    if (fromColor != options.color) return false;
    return true;
}
