function initMap(info) {
  map = new L.Map('map',{attributionControl: false, zoomControl: false, scrollWheelZoom: false, dragging: false});

  var url = 'https://api.mapbox.com/styles/v1/mapbox/dark-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}'
  var attrib = '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>';
  var osm = new L.TileLayer(url, {
    minZoom: 1,
    maxZoom: 16,
    attribution: attrib,
    accessToken: 'pk.eyJ1IjoicmFwaXJlbnQiLCJhIjoiY2oybXBsc2ZvMDE2YjMycGg4NzNkYXI0OSJ9.xC8TBirQ2os2eQ65hwTCMA'
  });
  var location = new L.LatLng(info.lamp_location[1], info.lamp_location[0])
  map.setView(location, 16);
  osm.addTo(map);
  var icon = L.icon({
    iconUrl: 'dist/img/legend.svg',
    iconSize: [45, 80], // size of the icon
    popupAnchor: [0, -40],
    iconAnchor: [22, 60]
  });
  console.log(info.lamp_location[1])
  var marker = L.marker(location,
    {icon: icon, opacity: 0.9})
    .addTo(map);

  marker.bindPopup('<strong>標號：</strong>' + info.id +
  '<br><strong>座標：</strong>' + info.lamp_location +
  '<br><strong>佈署日期：</strong>' + info.lamp_deployed_data +
  '<br><strong>地區編號：</strong>' + info.place_id, {keepInView: true}).openPopup();
}


