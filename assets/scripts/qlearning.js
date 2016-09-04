$(function(document) {
  var Qlearning = function(dim) {
    this.dimension = dim;
    this.blocks = initialize(this.dimension);
    this.current = { x: randomFloorInterval(0, dim - 1), y: randomFloorInterval(0, dim - 1) };
  };

  Qlearning.prototype.getMax = function(actions, state) {
    var directions = this.getValidDirection(state, this.dimension);
    var max = directions[0];
    for(var i = 1; i < directions.length; ++i) {
      if(actions.qsa[directions[i]] > actions.qsa[max]) {
        max = directions[i];
      }
    }
    return max;
  };

  Qlearning.prototype.getValidDirection = function(state, dimension) {
    var directions = [];
    if(state.y > 0) { directions.push(0); }
    if(state.x < dimension - 1) { directions.push(2); }
    if(state.y < dimension - 1) { directions.push(1); }
    if(state.x > 0) { directions.push(3); }
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
    var max = this.getMax(this.blocks[current.x][current.y], current);

    var future = { x: current.x, y: current.y };
    if(max === 0) {
      future.y--;
    } else if(max === 1) {
      future.x++;
    } else if(max === 2) {
      future.y++;
    } else if(max === 3) {
      future.x--;
    }

    var qvalueCurrent = this.blocks[current.x][current.y].qsa[max];
    var futureMax = this.getMax(this.blocks[future.x][future.y], future);
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
