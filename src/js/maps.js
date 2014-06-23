/* global jQuery, window */
(function ($, parseInt, parseFloat) {
	'use strict';

	/**
     * @param element
     * @constructor
     */

    var MapWidget = function ($element) {
    	this.$element = $element;
    	this.contentString = $element.find('.content');

    	this.zoom = parseInt($element.find('input[name="zoom"]').val(), 10);
    	this.lat = parseFloat($element.find('input[name="lat"]').val(), 10);
    	this.lng = parseFloat($element.find('input[name="lng"]').val(), 10);
    	this.latLng = new google.maps.LatLng(this.lat, this.lng);

    	this.mapOptions = {
			zoom: this.zoom,
			center: this.latLng,
			// mapTypeId: google.maps.MapTypeId.SATELLITE
	    };
	    this.map = new google.maps.Map($('#map-canvas')[0], this.mapOptions);

	    $('.js-calc-route').click($.proxy(this.calcRoute, this));

	    // TODO it should work with an array of markers
	    this.setMarker();
	    this.setInfoWindow();
	    this.showLine();
	    this.setPolygon();
	    this.directionsDisplay();
    };

    MapWidget.prototype = {

    	constructor: MapWidget,

    	setMarker: function () {
    		this.marker = new google.maps.Marker({
	            position: this.latLng,
	            map: this.map,
	            animation: google.maps.Animation.DROP,
	            title: 'Universit&agrave; degli Studi di Cagliari'
	        }); 
    	},

    	setInfoWindow: function (event) {
			var contentString = '<div class="content">'+
				'<div id="siteNotice">'+
				'</div>'+
				'<h1 id="firstHeading" class="firstHeading">Universit&agrave; degli Studi di Cagliari</h1>'+
				'<div id="bodyContent">'+
				'<p>Facolt&agrave; di Ingegneria e Architettura, ingresso via Is Maglias.</p>'+
				'<p><a target="_" href="http://facolta.unica.it/ingegneriarchitettura/">Facolt&agrave; di Ingegneria e Architettura </a></p>'+
				'<br><br></div>'+
				'</div>';

			var infowindow = new google.maps.InfoWindow({
				content: contentString
			});

			/* TODO fix the position. It should not be necessary for the marker */
			infowindow.setPosition(this.latLng);

	        google.maps.event.addListener(this.marker, 'click', function() {
				infowindow.open(this.map, this.marker);
			});
    	},

	 	showLine: function () {
			var lineSymbol = {
				path: google.maps.SymbolPath.CIRCLE,
				strokeOpacity: 1,
				scale: 4
			};

			var lineCoordinates = [
				new google.maps.LatLng(39.229689, 9.107713),
				new google.maps.LatLng(39.22981,9.10814),
				new google.maps.LatLng(39.230175,9.108046),
				new google.maps.LatLng(39.230185,9.107969)
			];

			var line = new google.maps.Polyline({
				path: lineCoordinates,
				strokeOpacity: 0,
				strokeColor: '#0066FF',
				icons: [{
					icon: lineSymbol,
					offset: '0',
					repeat: '20px'
				}],
				map: this.map
			});
	    },

	    setPolygon:  function () {
	        // Define the LatLng coordinates for the Blocco Q.
			var triangleCoords = [
				new google.maps.LatLng(39.230515, 9.107900),
				new google.maps.LatLng(39.229865, 9.108101),
				new google.maps.LatLng(39.230101, 9.107380),
				new google.maps.LatLng(39.230515, 9.107900)
			];

			// Construct the polygon.
			this.polygon = new google.maps.Polygon({
				paths: triangleCoords,
				strokeColor: '#FF0000',
				strokeOpacity: 0.8,
				strokeWeight: 2,
				fillColor: '#FF0000',
				fillOpacity: 0.35
			});

			this.polygon.setMap(this.map);

			google.maps.event.addListener(this.polygon, 'click', this.showPolygonInfo);

	    },

		showPolygonInfo: function (event) {

			var contentString = '<b>Blocco Q</b><br>' +
				'<ul>' +
				'<li><a class="test-popup-link" href="../images/ING-bloccoQ.jpg">Primo piano</a></li>' +
				'<li><a class="test-popup-link" href="../images/ING-bloccoQ.jpg">Secondo piano</a></li>' +
				'<li><a class="test-popup-link" href="../images/ING-bloccoQ.jpg">Terzo piano</a></li>' +
				'</ul><br>';

			var infoWindow = new google.maps.InfoWindow({
				content: contentString
			});

			infoWindow.setPosition(event.latLng);

			infoWindow.open(this.map);

			$('.test-popup-link').magnificPopup({
				type: 'image'
			});
	    },

	    directionsDisplay: function () {
			this.directionsDisplay;
			this.directionsService = new google.maps.DirectionsService();
			this.directionsDisplay = new google.maps.DirectionsRenderer();
			this.directionsDisplay.setMap(this.map);
	    },

		calcRoute: function() {
			var start = document.getElementById("start").value;
			var end = document.getElementById("end").value;
			var selectedMode = document.getElementById("mode").value;
			var request = {
				origin:start,
				destination:end,
				travelMode: google.maps.TravelMode[selectedMode]
			};

			var that = this;
			this.directionsService.route(request, function(result, status) {
				if (status === google.maps.DirectionsStatus.OK) {
					that.directionsDisplay.setDirections(result);
				}
			});
		}
    };

	var initialize = function () {
		var $element = $('#map-option') ;
		var mapWidget = new MapWidget($element);
	};

	$(function() {
		initialize();
	});

})(jQuery, window.parseInt, window.parseFloat);
