(function () {
	"use strict";

	var contentString = '<div id="content">'+
		'<div id="siteNotice">'+
		'</div>'+
		'<h1 id="firstHeading" class="firstHeading">Universit&agrave; degli Studi di Cagliari</h1>'+
		'<div id="bodyContent">'+
		'<p>Facolt&agrave; di Ingegneria e Architettura, ingresso via Is Maglias.</p>'+
		'<p><a target="_" href="http://facolta.unica.it/ingegneriarchitettura/">Facolt&agrave; di Ingegneria e Architettura </a></p>'+
		'</div>'+
		'</div>';

	var infowindow = new google.maps.InfoWindow({
		content: contentString
	});

	var map,
		marker,
		bloccoQ,
		triangleCoords;

	var initialize = function () {

        var mapOptions = {
			zoom: 19,
			center: new google.maps.LatLng(39.229689, 9.107713),
			mapTypeId: google.maps.MapTypeId.SATELLITE
        }

        map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

        var myLatLng = new google.maps.LatLng(39.229689, 9.107713);
        
        marker = new google.maps.Marker({
            position: myLatLng,
            map: map,
            animation: google.maps.Animation.DROP,
            title: 'Università degli Studi di Cagliari'
        });

        // Define the LatLng coordinates for the Blocco Q.
		triangleCoords = [
			new google.maps.LatLng(39.230515, 9.107900),
			new google.maps.LatLng(39.229865, 9.108101),
			new google.maps.LatLng(39.230101, 9.107380),
			new google.maps.LatLng(39.230515, 9.107900)
		];

		// Construct the polygon.
		bloccoQ = new google.maps.Polygon({
			paths: triangleCoords,
			strokeColor: '#FF0000',
			strokeOpacity: 0.8,
			strokeWeight: 2,
			fillColor: '#FF0000',
			fillOpacity: 0.35
		});

		bloccoQ.setMap(map);

		google.maps.event.addListener(bloccoQ, 'click', showBloccoQ);

        google.maps.event.addListener(marker, 'click', function() {
			infowindow.open(map, marker);
		});

    }



    var showBloccoQ = function (event) {

		var contentString = '<b>Blocco Q</b><br>' +
			'<a class="test-popup-link" href="../images/ING-bloccoQ.jpg">Terzo piano</a>' +
			'<br><br>';

		var infoWindow = new google.maps.InfoWindow({
			content: contentString
		});

		infoWindow.setPosition(event.latLng);

		infoWindow.open(map);

		$('.test-popup-link').magnificPopup({ 
			type: 'image'
			// other options
		});

    }

	google.maps.event.addDomListener(window, 'load', initialize);

})();
