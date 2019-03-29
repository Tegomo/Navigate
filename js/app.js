var sampleApp = angular.module('sampleApp', []);
sampleApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider
		.when('/',
			{ templateUrl: 'templates/index.html',
				controller: 'IndexController' })

      .when('/itineraire',
		  { templateUrl: 'templates/itineraire.html',
			controller: 'ItineraireController' })

      .otherwise({ redirectTo: '/' });
}]);

sampleApp.controller('IndexController', function($scope) {

    var map = L.map('map').fitWorld();
	map.locate({setView: true, maxZoom: 16});

	L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
		attribution: '&copy; <a href="https://team-solutions.org/">Team @ Solutions</a> 2019'
	}).addTo(map);


	function onLocationFound(e) {

		L.marker(e.latlng).addTo(map)
			.bindPopup("Votre position actuelle").openPopup();
		depart.latitude = e.latlng.lat;
		depart.longitude = e.latlng.lng;

		destination.latitude = parseFloat(document.getElementById("latitudeDest").value) ;
		destination.longitude = parseFloat(document.getElementById("longitudeDest").value) ;

		console.log(depart);
		console.log(destination);
	}

	map.on('locationfound', onLocationFound);

	function onLocationError(e) {
		alert(e.message);
	}
});


sampleApp.controller('ItineraireController', function($scope) {

	var map = L.map('map').setView([0, 0], 2);
	L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
		attribution: '&copy; <a href="https://team-solutions.org/">Team @ Solutions</a> 2019'
	}).addTo(map);


	L.Routing.control({
		waypoints: [
			L.latLng(depart.latitude, depart.longitude ),
			L.latLng(4.0566999,9.7288999 )
		],
		routeWhileDragging: true,
		geocoder: L.Control.Geocoder.nominatim()
	}).addTo(map);

});