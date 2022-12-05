import * as d3 from 'd3v4'
import * as noUiSlider from 'nouislider'
import './nouislider.css';

export default function timGraph() {
  var perpValue = document.getElementById("perpVal");
  var perpSlider = document.getElementById("perpSlider");
  noUiSlider.create(perpSlider, {
    start: [30],
    connect: true,
    range: {
      'min': 10,
      'max': 30
    },
    step: 20
  });

  var lambda1Value = document.getElementById("lambda1Val");
  var lambda2Value = document.getElementById("lambda2Val");
  var lambdaSlider = document.getElementById("lambdaSlider");
  noUiSlider.create(lambdaSlider, {
    start: [0, 85],
    connect: true,
    range: {
      'min': 0,
      'max': 85
    },
    step: 1,
    margin: 1
  });

  var chartDiv = document.getElementById("chart");
  var strokeWidth = 1;
  var margin = {top: 10, right: 10, bottom: 10, left: 10};
  var width = chartDiv.clientWidth - margin.left - margin.right;
  var height = chartDiv.clientHeight - margin.top - margin.bottom;
  var x = d3.scaleLinear().range([0, width - margin.right]).domain([-100,100]);
  var y = d3.scaleLinear().range([0, height]).domain([100,-100]);

  var colorScale = d3.scaleOrdinal()
    .domain(['astrocytes','endothelial-mural','interneurons','microglia','oligodendrocytes','pyramidal CA1','pyramidal SS'])
    .range(['#66c2a5','#fc8d62','#8da0cb','#e78ac3','#a6d854','#ffd92f','#e5c494'])

  /*
  function randomCoords(length, max) {
      return Array.apply(null, Array(length)).map(function(item, index){
        return {x: Math.floor(Math.random() * max),
          y:Math.floor(Math.random() * max)};
    });
  }
  */
  var svg = d3.select("#chart").append("svg")
    .attr("width", width + margin.right + margin.left)
    .attr("height", height + margin.top + margin.bottom )
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

  d3.text('https://s3.amazonaws.com/randomly-static/randomly-mouse-cortex-pos/classes.txt', function(error,text){
    if (error) throw error;

    var colors =  d3.tsvParseRows(text);

    function update(data, index){
      var elem = svg.selectAll("circle")
          .data(data)

      elem.attr("class", "update")
      .transition()
      .duration(200)
        //.ease(d3.easeElastic.period(0.4))
        //.delay(function(d,i) {return i})
        .attr("cx", function(d) { return x(d[0]); })
        .attr("cy", function(d) { return y(d[1]); })

      elem.enter().append("circle")
        .attr("r", "0px")
        .attr("fill","dodgerblue")
        .attr("cx", function(d) { return x(d[0]); })
        .attr("cy", function(d) { return y(d[1]); })
        .attr('fill', function(d,i){
          //console.log(colors[i][0])
          return colorScale(colors[i][0])
        })
        .transition()
          .duration(1500)
          .attr("r", "2px")
    }

    //perp update
    perpSlider.noUiSlider.on('slide', function(){
      //console.log('update perp')
      perplexity = Math.trunc(perpSlider.noUiSlider.get())
      perpValue.innerHTML = perplexity;
      d3.text("https://s3.amazonaws.com/randomly-static/randomly-mouse-cortex-pos/mouse_cortex_" + lambda_1 + "_" + lambda_2 + "_" + perplexity + ".txt", function(error,text){
        if (error) throw error;
  
        var data = d3.tsvParseRows(text)
        update(data)
      });
    });
    //lambda update
    lambdaSlider.noUiSlider.on('set', function(){
      //console.log('update lambda')
      lambda_1 = Math.trunc(lambdaSlider.noUiSlider.get()[0])
      lambda_2 = Math.trunc(lambdaSlider.noUiSlider.get()[1])
      lambda1Value.innerHTML = lambda_1;
      lambda2Value.innerHTML = lambda_2;
      d3.text("https://s3.amazonaws.com/randomly-static/randomly-mouse-cortex-pos/mouse_cortex_" + lambda_1 + "_" + lambda_2 + "_" + perplexity + ".txt", function(error,text){
        if (error) throw error;

        var data = d3.tsvParseRows(text)
        update(data)
      });
    });

    //initial load
    var perplexity = 30;
    var lambda_1 = 0;
    var lambda_2 = 85;

    perpValue.innerHTML = perplexity;
    lambda1Value.innerHTML = lambda_1;
    lambda2Value.innerHTML = lambda_2;
    d3.text("https://s3.amazonaws.com/randomly-static/randomly-mouse-cortex-pos/mouse_cortex_" + lambda_1 + "_" + lambda_2 + "_" + perplexity + ".txt", function(error,text){
      if (error) throw error;

      var data = d3.tsvParseRows(text)
      update(data)
    });
  })
  
  var interval_l1, interval_l2;

  window.demo_l1 = function() {
    var i = 1;
    if(window.interval_l1){
      window.interval_l1.stop();
    }
    if(window.interval_l2){
      window.interval_l2.stop();
    }
    lambdaSlider.noUiSlider.set([80,85]);
    window.interval_l1 = d3.interval(function(elapsed) {
      if (elapsed > 25500) {
        window.stop(); // <== !!!
        return;
      }
      lambdaSlider.noUiSlider.set([80-i*5,null]);
      i++;
    }, 1500);
  }

  window.demo_l2 = function() {
    var i = 1;
    if(window.interval_l1){
      window.interval_l1.stop();
    }
    if(window.interval_l2){
      window.interval_l2.stop();
    }

    lambdaSlider.noUiSlider.set([0,85]);
    window.interval_l2 = d3.interval(function(elapsed) {
      if (elapsed > 25500) {
        window.stop(); // <== !!!
        return;
      }
      lambdaSlider.noUiSlider.set([null,85-(i*5)]);
      i++;
    }, 1500);
  }

  window.interval_stop = function() {
    if(window.interval_l1){
      window.interval_l1.stop();
    }
    if(window.interval_l2){
      window.interval_l2.stop();
    }
  }
}

