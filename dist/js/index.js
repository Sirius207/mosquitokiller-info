!function(){initMap();var a=location.search;args=a.split("?")[1],console.log(args),API="http://140.116.249.228:3000/apis/counts?formatBy=hour&lampID="+args,$.get("/test.json",function(a){var r=[],t=[],o=1;for(var s in a){for(var u=1;u<25;u++)a[s].hasOwnProperty(u)?r.push({value:+a[s][u].sum,date:s,day:+o,hour:+u}):r.push({value:0,date:s,day:+o,hour:+u});o++,t.push(s)}drawDayLable(t),heatmapChart(r)})}();