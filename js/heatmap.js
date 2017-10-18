var margin = { top: 30, right: 0, bottom: 0, left: 100 },
width = $('#heatmap').width() - margin.left - margin.right,
height = 700 - margin.top - margin.bottom,
textSize = 60;
gridSize = Math.floor( height  / 25),
legendElementWidth = gridSize*2,
times = ['02:00', '04:00', '06:00', '08:00', '10:00', '12:00', '14:00', '16:00',
         '18:00', '20:00', '22:00', '24:00']
opacityRange = [0.50, 1];
colorInterpolate = d3.interpolateRgb;

var color = d3.scale.linear()
            .range(['#367F7E', '#83FFE4'])
            .interpolate(colorInterpolate)

var opacity = d3.scale.linear()
                .range(opacityRange);

var svg = d3.select('#heatmap').append('svg')
  .attr('width', width + margin.left + margin.right)
  .attr('height', height + margin.top + margin.bottom)
  .append('g')
  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

var timeLabels = svg.selectAll('.timeLabel')
  .data(times)
  .enter().append('text')
    .text(function(d) { return d; })
    .attr('y', 0)
    .attr('x', function(d, i) { return i * textSize + 24; })
    .style('text-anchor', 'middle')
    .attr('transform', 'translate(' + textSize + ', 0)')
    .attr('class', function(d, i) { return ((i >= 7 && i <= 16) ? 'timeLabel mono axis axis-worktime' : 'timeLabel mono axis'); })

var heatmapChart = function(data) {
  var colorScale = color
      .domain([0, d3.max(data, function (d) { return d.value; })])

  var opacityScale = opacity
      .domain([1, d3.max(data, function (d) { return d.value; })])

  var cards = svg.selectAll('.hour')
      .data(data, function(d) {return d.day+':'+d.hour;});

  cards.append('title');

  cards.enter().append('rect')
      .attr('x', function(d) { return +(d.hour / 2) * textSize; })
      .attr('y', function(d) { return (d.day - 1) * gridSize + 12; })
      .attr('class', 'hour bordered')
      .attr('width', textSize)
      .attr('height', gridSize)
      .style('fill', color[0]);

  cards.transition().duration(1000)
      .style('fill', function(d) { return colorScale(d.value); })
      .style('fill-opacity', function (d) { return opacityScale(d.value)});

  cards.exit().remove();
};

var drawDayLable = function(array) {
  var dayLabels = svg.selectAll('.dayLabel')
                    .data(array)
                    .enter().append('text')
                      .text(function (d) { return d; })
                      .attr('x', 0)
                      .attr('y', function(d,i) {return i* gridSize + 12; })
                      .style('text-anchor', 'end')
                      .attr('transform', 'translate(50, ' + gridSize / 1.5 + ')')
                      .attr('class', function (d, i) {
                        return ((i >= 0 && i <= 4) ? 'dayLabel mono axis axis-workweek' : 'dayLabel mono axis');
                      });
}

// heatmapChart(datasets[0]);
