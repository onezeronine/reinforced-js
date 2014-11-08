(function() {
    //Q-learning algorithm
    //Initialize Q(s,a) arbitrarily
    var dimension = 3;
    var blocks = [];
    var episodes = 50;
    var steps = 10;
    var discount = 0.401;
    var theta = 0.24;
    var actionList = document.querySelector('#actions');
    var canvas = document.querySelector("#canvas");
    var context = canvas.getContext('2d');
    var size = canvas.width / dimension;
    
    for(var i = 0; i < dimension; ++i)
    {
        blocks.push([]);
        for(var j = 0; j < dimension; j++)
        {
            blocks[i][j] = {
                actions: [randomInterval(0.45,0.66), randomInterval(0.35,0.7), randomInterval(0.4,0.58), randomInterval(0.35,0.7)],
                reward: 0
            };
        }
    }
    
    //set reward
    blocks[2][2].reward = 1;
    
    for(var i = 0; i < episodes; ++i)
    {
        //initialize s
        var current = { x: randomFloorInterval(0,2), y: randomFloorInterval(0,2) };
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
            
            //print
            var span = document.createElement('div');
            span.innerText = (step+1).toString() + ": " + getCurrentStateText(current) + " " + getDirectionText(max);
            actionList.appendChild(span);
            
            var qvalueCurrent = blocks[current.x][current.y].actions[max];
            var maxQvaluePrime = blocks[current.x][current.y].actions[getMax(statePrime)];
            var reward = blocks[statePrime.x][statePrime.y].reward;
            
            blocks[current.x][current.y].actions[max] = qvalueCurrent + theta * (reward + discount * maxQvaluePrime - qvalueCurrent);
            
            current = statePrime;
        }
    }
    
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
    
    
    function getCurrentStateText(state)
    {
        return "Current state: (" + state.x + "," + state.y + ")";    
    }
    
    function getDirectionText(direction)
    {
        if(direction == 0)
            return "north";
        else if(direction == 1)
            return "east";
        else if(direction == 2)
            return "south";
        else if (direction == 3)
            return "west";
        return "none";
    }
    
    context.strokeStyle = 'black';
    for(var row = 0, i = 0; row < canvas.width; row+=size, ++i)
    {
        var j = 0;
        for(var col = 0, j = 0; col < canvas.width; col+=size, ++j)
        {
            //north-south
            context.fillText(sliceQSA(i,j,0), row+(size/2)-16, col+20);
            context.fillText(sliceQSA(i,j,2), row+(size/2)-16, col+size-10);
            
            //east-west
            context.fillText(sliceQSA(i,j,1), row+(size/2)*1.55, col+(size/2));
            context.fillText(sliceQSA(i,j,3), row+10, col+(size/2));
            
            //reward
            context.fillText(blocks[i][j].reward.toString(), row+(size/2), col+(size/2));
            
            context.strokeRect(row, col, size, size);
        }
    }
    
    function sliceQSA(i, j, direction)
    {
        return blocks[i][j].actions[direction].toString().slice(0,6);
    }
    
    function randomFloorInterval(min,max)
    {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
    
    function randomInterval(min,max)
    {
        return Math.random() * (max - min + 1) + min;
    }
    
}());

