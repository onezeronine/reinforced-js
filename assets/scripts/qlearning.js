$(function(document) {
  var Qlearning = function(dim) {
    this.dimension = dim;
    this.blocks = initialize(this.dimension);
    this.current = { x: randomFloorInterval(0, dim - 1), y: randomFloorInterval(0, dim - 1) };
  };

  Qlearning.prototype.getMax = function(state) {
    var directions = this.getValidDirection(state, this.dimension);
    var max = directions[0];
    var actions = this.blocks[state.x][state.y];
    for(var i = 1; i < directions.length; ++i) {
      var currentDirection = directions[i];
      if(actions.qsa[currentDirection] > actions.qsa[max]) {
        max = currentDirection;
      }
    }
    return max;
  };

  Qlearning.prototype.getValidDirection = function(state, dimension) {
    var directions = [];
    if(state.x > 0) { directions.push(0); } // y === 0 then not north
    if(state.x < dimension - 1) { directions.push(2); }
    if(state.y < dimension - 1) { directions.push(1); }
    if(state.y > 0) { directions.push(3); }

    return directions;
  };

  Qlearning.prototype.getCurrent = function() {
    var result = {
      x: this.current.x,
      y: this.current.y
    };
    return result;
  };

  Qlearning.prototype.setReward = function(x, y) {
    this.blocks[x][y].reward = 1;
  };

  Qlearning.prototype.step = function(step, discount, stepsize) {
    var current = { x: this.current.x, y: this.current.y };
    var max = this.getMax(current);

    var future = { x: current.x, y: current.y };
    if(max === 0) {
      future.x--;
    } else if(max === 1) {
      future.y++;
    } else if(max === 2) {
      future.x++;
    } else if(max === 3) {
      future.y--;
    }

    var qvalueCurrent = this.blocks[current.x][current.y].qsa[max];
    var futureMax = this.getMax(future);
    var maxQvalueFuture = this.blocks[future.x][future.y].qsa[futureMax];
    var reward = this.blocks[future.x][future.y].reward;

    var qsaValue = qvalueCurrent + stepsize * (reward + discount * maxQvalueFuture - qvalueCurrent);
    this.blocks[current.x][current.y].qsa[max] = qsaValue;

    this.current.x = future.x;
    this.current.y = future.y;

    return this.current;
  };

  document.Qlearning = Qlearning;

  function initialize(dimension) {
    var blocks = [];
    var randomInterval = function(min, max) {
      return Math.random() * (max - min + 1) + min;
    };

    for(var i = 0; i < dimension; ++i) {
      blocks.push([]);
      for(var j = 0; j < dimension; ++j) {
        blocks[i].push({
          qsa: [
            randomInterval(0.45, 0.66),
            randomInterval(0.35, 0.7),
            randomInterval(0.4, 0.58),
            randomInterval(0.35, 0.7)
          ],
          reward: 0
        });
      }
    }
    //blocks[2][2].reward = 1;
    return blocks;
  }

  function randomFloorInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
});
