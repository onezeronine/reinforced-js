(function() {
    
    var randomInterval = function (min,max)
    {
        return Math.floor(Math.random()*(max-min+1)+min);
    }
    
    //Q-learning algorithm
    //Initialize Q(s,a) arbitrarily
    var dimension = 3;
    var blocks = [];
    for(var i = 0; i < dimension; ++i)
    {
        blocks.push([]);
        for(var j = 0; j < dimension; j++)
        {
            blocks[i][j] = {
                actions: [randomInterval(4,9), randomInterval(3,10), randomInterval(6,8), randomInterval(5,7)],
                reward: -1
            };
        }
    }
    //set reward
    blocks[2][1].reward = 1;
    
    function getValidDirection(state)
    {
        var directions = [];
        if (state.y > 0) directions.push(0);
        if (state.x < dimension - 1) directions.push(1);
        if (state.y < dimension - 1) directions.push(2);
        if (state.x > 0 > 0) directions.push(3);
        return directions;
    }
    
    function getMax(state)
    {
        var actions = blocks[state.x][state.y].actions;
        var directions = getValidDirection(state);
        var max = directions[0];
        for(var i = 1; i < directions.length; ++i)
        {
            if(actions[i] > actions[max])
                max = directions[i];
        }
        return max;
    }
    
    var episodes = 1;
    var steps = 100;
    var discount = 0.33;
    var theta = 0.56;
    for(var i = 0; i < episodes; ++i)
    {
        //initialize s
        var current = { x: 0, y: 0 };
        for(var step = 0; step < steps; ++step)
        {
            var statePrime = current;
            var max = getMax(statePrime);
            
            //take action a, observe r, s'
            if (max == 0) 
                statePrime.y--;
            else if (max == 1) 
                statePrime.x++;
            else if (max == 2) 
                statePrime.y++;
            else if (max == 3) 
                statePrime.x--;
            
            console.log("action taken on " + max.toString());
            
            var qvalueCurrent = blocks[current.x][current.y].actions[max];
            var maxQvaluePrime = blocks[current.x][current.y].actions[getMax(statePrime)];
            var reward = blocks[statePrime.x][statePrime.y].reward;
            
            blocks[current.x][current.y].actions[max] = qvalueCurrent + theta * (reward + discount * maxQvaluePrime - qvalueCurrent);
            
            current = statePrime;
        }
    }
    
    
}());

