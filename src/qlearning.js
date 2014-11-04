var Agent = function(parameters) 
{
    if(parameters != null)
    {
        this.alpha = parameters.alpha != null ? parameters.alpha : 0; 
        this.gamma = parameters.gamma != null ? parameters.gamma : 0;
    }
    
    
};

var Environment = function(dim) {  
    this.dimension = dim;
    this.blocks = [];
    
    var Block = function(qvalue, reward) {
        this.qvalue = qvalue;
        this.reward = reward;
    };
    
    var initializeDimensions = function (blocks, dimension)
    {
        for(var i = 0; i < dimension; ++i)
        {
            blocks.push([]);
            for(var j = 0; j < dimension; ++j)
            {
                //0 = north, 1 = south, 2 = east, 3 = west
                var directions = [0, 1, 2, 3];
                var reward = 0;
                blocks[i].push(new Block(directions, reward));
            }
        }
    };
    
    initializeDimensions(this.blocks, this.dimension);
};

Environment.prototype.draw = function(canvas, context) {
    var size = canvas.width / this.dimension;
    
    context.strokeStyle = 'black';
    for(var row = 0, i = 0; row < canvas.width; row+=size, ++i)
    {
        var j = 0;
        for(var col = 0, j = 0; col < canvas.width; col+=size, ++j)
        {
            for(var dir = 0; dir < 4; ++dir)
            {
                var q = this.blocks[i][j].qvalue[dir];
                // context.fillText(qvdir, row / dir, col / dir, size, size);
            }
            context.strokeRect(row, col, size, size);
        }
    }
};

Environment.prototype.train = function (agent) {
    this.agent = agent;
};


