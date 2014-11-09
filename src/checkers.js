var Checkers = function(options) {
    this.dimension = 8;
}

Checkers.prototype = {
    initialize: function() {
        var blocks = [];
        
        for(var i = 0; i < this.dimension; ++i)
        {
            blocks.push([]);
            for(var j = 0; j < this.dimension; ++j)
            {
                blocks[i].push({
                    state: "empty"
                });
            }
        }
    },
    draw: function(canvas, context) {
        var size = canvas.width / this.dimension;
        
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.strokeStyle = 'black';
        for(var row = 0, i = 0; row < canvas.width; row+=size, ++i)
        {
            var j = 0;
            for(var col = 0, j = 0; col < canvas.width; col+=size, ++j)
            {
                context.strokeRect(row, col, size, size);
            }
        }
    }
}
