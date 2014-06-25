/* global jQuery, window */
(function ($, parseInt, parseFloat) {
	'use strict';

	/**
     * @param element
     * @constructor
     */
    var MapWidget = function ($formMap) {

    	var endValue = $formMap.find('.js-form-maps-end :selected').val().split(',');
    	this.zoom = parseInt(endValue[2], 10);
    	this.latLng = new google.maps.LatLng(parseFloat(endValue[0], 10), parseFloat(endValue[1], 10));
    	this.$formMap = $formMap;

	    this.map = new google.maps.Map($('#map-canvas')[0], {
			zoom: this.zoom,
			center: this.latLng,
			mapTypeId: google.maps.MapTypeId.SATELLITE
	    });

	    this.setMarker();
	    this.showLine();
	    this.setPolygon();

	    this.directionsDisplay();
	    this.$formMap.find('.js-calc-route').click($.proxy(this.calcRoute, this));
    };

    MapWidget.prototype = {

    	constructor: MapWidget,

    	setMarker: function () {
    		this.marker = new google.maps.Marker({
	            position: this.latLng,
	            map: this.map,
	            animation: google.maps.Animation.DROP,
	        }); 
    	},

	 	showLine: function () {
			var lineSymbol = {
				path: google.maps.SymbolPath.CIRCLE,
				strokeOpacity: 1,
				scale: 4
			};

			// TODO use getCoordinates
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

	   	setPolygon: function () {
	   		var coordinates = $('.js-form-maps-end :selected').attr('data-coords');

	   		this.polygon = new google.maps.Polygon({
				paths: this.getCoordinates(coordinates),
				strokeColor: '#FF0000',
				strokeOpacity: 0.8,
				strokeWeight: 2,
				fillColor: '#FF0000',
				fillOpacity: 0.35
			});

			this.polygon.setMap(this.map);
			google.maps.event.addListener(this.polygon, 'mouseover', $.proxy(this.showPolygonInfo, this));
	   	},

	    getCoordinates: function (coordinates) {
	        var LatLng = google.maps.LatLng;
	        var polygonCoords = [];
	        var coordinates = coordinates.split(',');

	        for(var i = 0; i < coordinates.length; i++) {
	        	polygonCoords.push(new LatLng(coordinates[i], coordinates[i + 1]));
	        	i = i + 1;
	        }

	        return polygonCoords;
	    },

		showPolygonInfo: function (event) {
			var dataPlan = $('.js-form-maps-end :selected').attr('data-plan');
			$('.info-template img').attr('src', '../images/' + dataPlan);
			var infoTemplate = $('.info-template').html();
			var infoWindow = new google.maps.InfoWindow({
				content: infoTemplate
			});
			infoWindow.setPosition(event.latLng);
			infoWindow.open(this.map);
	    },

	    directionsDisplay: function () {
			this.directionsDisplay;
			this.directionsService = new google.maps.DirectionsService();
			this.directionsDisplay = new google.maps.DirectionsRenderer();
			this.directionsDisplay.setMap(this.map);
	    },

		calcRoute: function() {
			this.map.setMapTypeId(google.maps.MapTypeId.ROADMAP);
			var that = this,
				start = this.$formMap.find('#start').val(),
				selectedMode = this.$formMap.find('#mode').val(),
				request = {
					origin: start,
					destination: this.latLng,
					travelMode: google.maps.TravelMode[selectedMode]
				};
			
			this.directionsService.route(request, function(result, status) {
				if (status === google.maps.DirectionsStatus.OK) {
					that.directionsDisplay.setDirections(result);
				}
			});
		}
    };

	var initialize = function ($formMap) {
		var mapWidget = new MapWidget($formMap);
	};

	$(function() {
		var $formMap = $('.js-form-maps');

		initialize($formMap);
		$formMap.find('.js-form-maps-end').change(function () {
			initialize($formMap);
		});
	});

})(jQuery, window.parseInt, window.parseFloat);
