var containerMap = document.getElementById("map");
function initMap(){
  (navigator.geolocation)? navigator.geolocation.getCurrentPosition(seePosition): containerMap.innerHTML = "Geolocalización no es soportado por tu navegador";
}

function seePosition(position){
  var pos= {lat: position.coords.latitude,
            lng: position.coords.longitude
          }
  var map = new google.maps.Map(containerMap, {
    center: pos,
    zoom: 16
  });
  var marker = new google.maps.Marker({
    position: pos,
    map: map
  })
}
