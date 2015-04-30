var qlearning = require('../src/qlearning');
var agent = qlearning(5);

agent.setReward(3, 2);
var current = agent.getCurrent();
console.log("initial state: (%d,%d)", current.x, current.y);

var num = 100;

for(var i = 0; i < num; ++i){
    var curr = agent.getCurrent();
    var next = agent.step(1, 0.5, 0.4);
    console.log("from: (%d,%d) to: (%d,%d)", curr.x, curr.y, next.x, next.y);
}
