var qLearning = function(dim) {
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
        //blocks[2][2].reward = 1;
        return blocks;
    };

    function randomFloorInterval (min,max)
    {
        return Math.floor(Math.random() * (max - min + 1) + min);
    };
};

qLearning.prototype = {
    getMax: function (actions, state, dimension)
    {
            var directions = this.getValidDirection(state, dimension);
            var max = directions[0];
            for(var i = 1; i < directions.length; ++i)
            {
                if(actions.qsa[directions[i]] > actions.qsa[max])
                {
                    max = directions[i];
                }
            }
            return max;
    },

    getValidDirection: function (state, dimension)
    {
        var directions = [];
        if (state.y > 0) directions.push(0);
        if (state.x < dimension - 1) directions.push(1);
        if (state.y < dimension - 1) directions.push(2);
        if (state.x > 0 > 0) directions.push(3);
        return directions;
    },

    getCurrent: function(){
        var result = {
            x: this.current.x,
            y: this.current.y
        };
        return result;
    },

    setReward: function(x, y){
        this.blocks[x][y].reward = 1;
    },

    step: function (steps, discount, stepsize) {
        var current = { x: this.current.x, y: this.current.y };

        for(var step = 0; step < steps; ++step)
        {
            var future = { x: current.x, y: current.y };
            var max = this.getMax(this.blocks[future.x][future.y], future, this.dimension);

            if (max == 0)
                future.y--;
            else if (max == 1)
                future.x++;
            else if (max == 2)
                future.y++;
            else if (max == 3)
                future.x--;

            var qvalueCurrent = this.blocks[current.x][current.y].qsa[max];
            var futureMax = this.getMax(this.blocks[future.x][future.y], future, this.dimension);
            var maxQvalueFuture = this.blocks[future.x][future.y].qsa[futureMax];
            var reward = this.blocks[future.x][future.y].reward;

            var qsaValue = qvalueCurrent + stepsize * (reward + discount * maxQvalueFuture - qvalueCurrent);
            this.blocks[current.x][current.y].qsa[max] = qsaValue;

            current.x = future.x;
            current.y = future.y;
        }

        this.current.x = current.x;
        this.current.y = current.y;

        return this.current;
    }

};

module.exports = function(dim){
    return new qLearning(dim);
}
