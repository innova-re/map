/* global jQuery, window */
(function ($, float) {
	'use strict';

	/**
     * @param $formMap
     * @constructor
     */
    var MapWidget = function ($mapForm) {

    	this.$selectedMap = $mapForm.find('.map-destination :selected');
    	var latLng = this.$selectedMap.attr('data-latLng').split(',');
    	this.latLng = new google.maps.LatLng(float(latLng[0], 10), float(latLng[1], 10));
    	this.zoom = 19;
    	this.$mapForm = $mapForm;
	    this.map = this.getMap();

	    this.setMarker();
	    this.setLine();
	    this.setPolygon();
	    this.setDirectionsOnMap();
	    this.$mapForm.show();
	    this.$mapForm.find('.map-setRoute').click($.proxy(this.setRoute, this));
    };

    MapWidget.prototype = {

    	constructor: MapWidget,

    	getMap: function () {
    		return new google.maps.Map($('.map-canvas')[0], {
				zoom: this.zoom,
				center: this.latLng,
				mapTypeId: google.maps.MapTypeId.SATELLITE
		    });
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

	    getPlan: function () {
	    	return $('<img>')
				.attr('class', 'poly-info')
				.attr('src', this.$selectedMap.attr('data-plan'))[0];
	    },

	    getRequest: function () {
	    	return {
	    		destination: this.latLng,
	    		origin: this.$mapForm.find('.map-departure').val(),
	    		travelMode: google.maps.TravelMode[this.$mapForm.find('.map-mode').val()]
	    	}
	    },

	   	setPolygon: function () {
	   		this.polygon = new google.maps.Polygon({
				paths: this.getCoordinates(this.$selectedMap.attr('data-coords')),
				strokeColor: '#FF0000',
				strokeOpacity: 0.8,
				strokeWeight: 2,
				fillColor: '#FF0000',
				fillOpacity: 0.35
			});

			this.polygon.setMap(this.map);
			google.maps.event.addListener(this.polygon, 'click', $.proxy(this.setPolygonInfo, this));
	   	},

	    setDirectionsOnMap: function () {
			this.directionsService = new google.maps.DirectionsService();
			this.directionsRenderer = new google.maps.DirectionsRenderer();
			this.directionsRenderer.setMap(this.map);
	    },

	    setDirections: function (result, status) {
			if (status === google.maps.DirectionsStatus.OK) {
				this.directionsRenderer.setDirections(result);
			} 	
	    },

	 	setLine: function () {
			var lineSymbol = {
				path: google.maps.SymbolPath.CIRCLE,
				strokeOpacity: 1,
				scale: 4
			};

			new google.maps.Polyline({
				path: this.getCoordinates(this.$selectedMap.attr('data-walking-path')),
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

    	setMarker: function () {
    		this.marker = new google.maps.Marker({
	            position: this.latLng,
	            map: this.map,
	            animation: google.maps.Animation.DROP,
	        }); 
    	},

		setPolygonInfo: function () {			
			new google.maps.InfoWindow({
				content: this.getPlan()
			}).open(this.map, this.marker);
	    },

		setRoute: function() {
			this.map.setMapTypeId(google.maps.MapTypeId.ROADMAP);
			this.directionsService.route(this.getRequest(), $.proxy(this.setDirections, this));
		}
    };

	var initialize = function ($formMap) {
		var mapWidget = new MapWidget($formMap);
	};

	$(function() {
		var $mapForm = $('.map-form');

		initialize($mapForm);
		$mapForm.find('.map-destination').change(function () {
			initialize($mapForm);
		});
	});

})(jQuery, window.parseFloat);
