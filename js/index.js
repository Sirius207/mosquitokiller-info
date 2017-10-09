(function() {
  var argv = location.search;
  args = argv.split('?')[1]
  console.log(args)
  API = 'http://140.116.249.228:3000/apis/counts?formatBy=hour&lampID=' + args;
  heatmapChart(datasets[0]);
  var d = null;
  $.get('./test.json', function(data) {
    var json = [];
    var day = 1;
    for(var key in data){
      for(var i = 1; i < 25; i++) {
        if(!data[key].hasOwnProperty(i)) {
          json.push({
            'value': 0,
            'date': key,
            'day': +day,
            'hour': +i
          })
        }
        else {
          json.push({
            'value': +data[key][i]['sum'],
            'date': key,
            'day': +day,
            'hour': +i
          })
        }
      }
      day++;
    }
    heatmapChart(json)
    console.log(json)
  });
})();
