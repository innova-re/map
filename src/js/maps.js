/* global jQuery, window */
(function ($, parseInt, parseFloat) {
	'use strict';

	/**
     * @param $formMap
     * @constructor
     */
    var MapWidget = function ($formMap) {

    	this.$selectedMap = $formMap.find('.js-form-maps-end :selected');
    	var endValue = this.$selectedMap.val().split(',');
    	this.zoom = parseInt(endValue[2], 10);
    	this.latLng = new google.maps.LatLng(parseFloat(endValue[0], 10), parseFloat(endValue[1], 10));
    	this.$formMap = $formMap;
	    this.map = this.getMap();

	    this.setMarker();
	    this.setLine();
	    this.setPolygon();
	    this.setDirectionsOnMap();
	    this.$formMap.show();
	    this.$formMap.find('.js-calc-route').click($.proxy(this.setRoute, this));
    };

    MapWidget.prototype = {

    	constructor: MapWidget,

    	getMap: function () {
    		return new google.maps.Map($('#map-canvas')[0], {
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
	    		origin: this.$formMap.find('#start').val(),
	    		travelMode: google.maps.TravelMode[this.$formMap.find('#mode').val()]
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
		var $formMap = $('.js-form-maps');

		initialize($formMap);
		$formMap.find('.js-form-maps-end').change(function () {
			initialize($formMap);
		});
	});

})(jQuery, window.parseInt, window.parseFloat);
