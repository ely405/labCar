var containerMap = document.getElementById("map");
var inpOrigin = document.getElementById("inp-origin");
var inpDestiny = document.getElementById("inp-destiny");
var btnRoute = document.getElementById("btn-route");
var map;
var marker;
function initMap(){
  (navigator.geolocation)? navigator.geolocation.getCurrentPosition(seePosition): containerMap.innerHTML = "Geolocalización no es soportado por tu navegador";
  autocompleteInput();
  btnRoute.addEventListener("click", showRoute);
}

function seePosition(position){
  var pos= {lat: position.coords.latitude,
            lng: position.coords.longitude
          }
  map = new google.maps.Map(containerMap, {
    center: pos,
    zoom: 16
  });
  marker = new google.maps.Marker({
    position: pos,
    map: map
  });
}

function autocompleteInput(){
  new google.maps.places.Autocomplete(inpOrigin);
  new google.maps.places.Autocomplete(inpDestiny);
}

function showRoute(){
  var directionsService = new google.maps.DirectionsService;
  var directionsDisplay = new google.maps.DirectionsRenderer({map: map});
  console.log(directionsDisplay);
  var request = {
    origin: inpOrigin.value,
    destination: inpDestiny.value,
    travelMode: "DRIVING",
  };
  directionsService.route(request, function(response, status){
    console.log(response);
    if(status === 'OK'){
      directionsDisplay.setDirections(response);
      marker.setMap(null);
      rateForTravel(response);
    }else{
      window.alert("No encontramos una ruta.");
    }
  })
}

function rateForTravel(response){
  var distFromOriginToDest = response.routes[0].legs[0].distance.text.replace('km', '').replace(',', '.');
  var rate = distFromOriginToDest*2;
  var totalRate = document.getElementById("total-rate");
  totalRate.innerHTML = (rate > 5)? "S/. " + parseInt(rate): "S/. 5";
  console.log(distFromOriginToDest);
}
