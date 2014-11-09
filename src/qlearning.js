var Qlearning = function(dim) {  
    this.dimension = dim;
    this.blocks = initialize(this.dimension);
    this.current = { x: randomFloorInterval(0,dim-1), y: randomFloorInterval(0,dim-1) };
    
    function initialize(dimension)
    {
        var blocks = [];
        var randomInterval = function (min,max)
        {
            return Math.random() * (max - min + 1) + min;
        };
        
        for(var i = 0; i < dimension; ++i)
        {
            blocks.push([]);
            for(var j = 0; j < dimension; ++j)
            {
                blocks[i].push({
                    qsa: [randomInterval(0.45,0.66), randomInterval(0.35,0.7), randomInterval(0.4,0.58), randomInterval(0.35,0.7)],
                    reward: 0
                });
            }
        }
        blocks[2][2].reward = 1;
        return blocks;
    };
        
    function randomFloorInterval (min,max)
    {
        return Math.floor(Math.random() * (max - min + 1) + min);
    };     
};

Qlearning.prototype = {
    draw: function(canvas, context) {
        var size = canvas.width / this.dimension;
        
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.strokeStyle = 'black';
        for(var row = 0, i = 0; row < canvas.width; row+=size, ++i)
        {
            var j = 0;
            for(var col = 0, j = 0; col < canvas.width; col+=size, ++j)
            {
                if(this.current.x === i && this.current.y === j)
                {
                    context.fillStyle = 'blue';
                    context.fillRect(row, col, size, size);
                }
                context.fillStyle = 'black';
                //north-south
                context.fillText(sliceQSA(this.blocks, i, j, 0), row+(size/2)-16, col+20);
                context.fillText(sliceQSA(this.blocks, i, j, 2), row+(size/2)-16, col+size-10);
                
                //east-west
                context.fillText(sliceQSA(this.blocks, i, j, 1), row+(size/2)*1.55, col+(size/2));
                context.fillText(sliceQSA(this.blocks, i, j, 3), row+10, col+(size/2));
                
                //reward
                context.fillText(this.blocks[i][j].reward.toString(), row+(size/2), col+(size/2));
                
                
                context.strokeRect(row, col, size, size);
            }
        }
            
        function sliceQSA(blocks, i, j, direction)
        {
            return blocks[i][j].qsa[direction].toString().slice(0,6);
        };
    },
    step: function (steps, discount, stepsize) {    
        var current = { x: this.current.x, y: this.current.y };
        
        for(var step = 0; step < steps; ++step)
        {
            var future = { x: current.x, y: current.y };
            var max = getMax(this.blocks[future.x][future.y], future, this.dimension);
            
            if (max == 0) 
                future.y--;
            else if (max == 1) 
                future.x++;
            else if (max == 2) 
                future.y++;
            else if (max == 3) 
                future.x--;
            
            var qvalueCurrent = this.blocks[current.x][current.y].qsa[max];
            var futureMax = getMax(this.blocks[future.x][future.y], future, this.dimension);
            var maxQvalueFuture = this.blocks[future.x][future.y].qsa[futureMax];
            var reward = this.blocks[future.x][future.y].reward;
            
            var qsaValue = qvalueCurrent + stepsize * (reward + discount * maxQvalueFuture - qvalueCurrent);
            this.blocks[current.x][current.y].qsa[max] = qsaValue;
            
            current.x = future.x;
            current.y = future.y;
        }
        
        this.current.x = current.x;
        this.current.y = current.y;
        
        function getMax(actions, state, dimension)
        {
            var directions = getValidDirection(state, dimension);
            var max = directions[0];
            for(var i = 1; i < directions.length; ++i)
            {
                if(actions.qsa[directions[i]] > actions.qsa[max])
                {
                    max = directions[i];
                }
            }
            return max;
        };
        
        
        function getValidDirection(state, dimension)
        {
            var directions = [];
            if (state.y > 0) directions.push(0);
            if (state.x < dimension - 1) directions.push(1);
            if (state.y < dimension - 1) directions.push(2);
            if (state.x > 0 > 0) directions.push(3);
            return directions;
        };
            
        function randomFloorInterval(min,max)
        {
            return Math.floor(Math.random() * (max - min + 1) + min);
        };
    }
};

