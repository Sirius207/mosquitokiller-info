function initMap() {
  map = new L.Map('map',{attributionControl: false, zoomControl: false, scrollWheelZoom: false, dragging: false});

  var url = 'https://api.mapbox.com/styles/v1/mapbox/dark-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}'
  var attrib = '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>';
  var osm = new L.TileLayer(url, {
    minZoom: 1,
    maxZoom: 16,
    attribution: attrib,
    accessToken: 'pk.eyJ1IjoicmFwaXJlbnQiLCJhIjoiY2oybXBsc2ZvMDE2YjMycGg4NzNkYXI0OSJ9.xC8TBirQ2os2eQ65hwTCMA'
  });
  map.setView(new L.LatLng(22.9971, 120.1926), 16);
  osm.addTo(map);
  var icon = L.icon({
    iconUrl: 'dist/img/legend2.svg',
    iconSize: [45, 80], // size of the icon
    popupAnchor: [0, -40],
    iconAnchor: [22, 60]
  });
  var marker = L.marker([
    22.9971, 120.1926],
    {icon: icon, opacity: 0.9})
    .addTo(map);

  marker.bindPopup('', {keepInView: true}).openPopup();
}
