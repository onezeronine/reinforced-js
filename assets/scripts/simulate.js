$(function(document) {
  var agent = null;
  var rewardPosition = {};

  $('#display').on('submit', function(e) {
    e.preventDefault();
    var form = $(this);
    var dim = Number.parseInt(form.find('#dimension').val());

    rewardPosition = {
      x: Number.parseInt(form.find('#x').val()),
      y: Number.parseInt(form.find('#y').val())
    };

    if(!dim) { return; }

    agent = new document.Qlearning(dim);
    agent.setReward(rewardPosition.x || 0, rewardPosition.y || 0);
    $('#run').show();
    renderGrid(agent, rewardPosition);
  });

  function renderGrid(agent, rewardPosition) {
    var board = $('.grid');
    board.find('div').remove();
    for(var i = 0; i < agent.dimension; ++i) {
      var row = $('<div class="row">');
      for(var j = 0; j < agent.dimension; ++j) {
        var col = renderInnerColumn(agent.blocks[i][j].qsa);
        if(rewardPosition.x === i && rewardPosition.y === j) {
          col.css('background-color', '#FFE0B2');
        }
        var currentPosition = agent.getCurrent();
        if(currentPosition.x === i && currentPosition.y === j) {
          col.css('background-color', '#C5E1A5');
        }
        row.append(col);
      }
      board.append(row);
    }
  }

  function renderInnerColumn(qsa) {
    var col = $('<div class="column">');
    var north = $('<div class="row">');
    north.append(renderDirections(1, qsa[0]));

    var mid = $('<div class="row">');
    mid.append(renderDirections(2, qsa[1]));
    mid.append(renderDirections(2, qsa[3]));

    var south = $('<div class="row">');
    south.append(renderDirections(1, qsa[2]));

    return col.append(north).append(mid).append(south);
  }

  function renderDirections(index, value) {
    var nv = $('<div class="inner-col-' + index + '">');
    nv.text(parseFloat(Math.round(value * 10000) / 10000).toFixed(4));
    return nv;
  }

  $('#run').on('submit', function(e) {
    e.preventDefault();
    var form = $(this);
    var steps = Number.parseInt(form.find('#step').val());
    var discount = Number.parseInt(form.find('#discount').val());
    var alpha = Number.parseInt(form.find('#alpha').val());
    for(var i = 0; i < steps; ++i) {
      agent.step(1, discount, alpha);
    }

    renderGrid(agent, rewardPosition);
  });

});
