/*!
 * Innovare.Map JavaScript Library v0.1
 * https://github.com/innova-re/map
 *
 * Copyright 2014, Antonio Pierro
 * Dual licensed under the MIT or GPL Version 2 licenses.
 *
 * Date: Mon June 30
 */
/* global window */
(function ($, float, google) {
    'use strict';

    /**
     * @param $mapForm
     * @constructor
     */
    var MapWidget,
        initialize;

    MapWidget = function ($mapForm) {
        this.$selectedMap = $mapForm.find('.map-destination :selected');
        this.latLng = this.getLatLng(this.$selectedMap.attr('map-latLng'));
        this.latLngMarker = this.getLatLng(this.$selectedMap.attr('map-marker'));
        this.zoom = 19;
        this.$mapForm = $mapForm;
        this.map = this.getMap();
        this.dataMarker = this.$selectedMap.attr('map-marker');
        this.dataMarkerImage = 'src/images/university_black.png';
    };

    initialize = function ($formMap) {
        var mapWidget = new MapWidget($formMap);

        mapWidget.init();
    };

    MapWidget.prototype = {

        constructor: MapWidget,

        init: function () {
            this.setStartMarker(this.latLng, 'src/images/letter_a.png');
            this.setMarker(this.latLngMarker, this.dataMarkerImage);
            this.setLine();
            this.setDirectionsOnMap();
            this.$mapForm.show();
            this.$mapForm.find('.map-setRoute').click($.proxy(this.setRoute, this));
            google.maps.event.addListener(this.map, 'zoom_changed', $.proxy(this.toggleMarker, this));
            this.map.panTo(this.latLngMarker);
            this.setInfoWindow(this.$selectedMap.attr('map-help'));
        },

        getCoordinates: function (coordinate) {
            var LatLngCoords = [],
                coordinates = coordinate.split(','),
                i;

            for (i = 0; i < coordinates.length; i = i + 1) {
                LatLngCoords.push(new google.maps.LatLng(coordinates[i], coordinates[i + 1]));
                i = i + 1;
            }

            return LatLngCoords;
        },

        getLatLng: function (latLng) {
            var latLngs = latLng.split(',');

            return new google.maps.LatLng(float(latLngs[0], 10), float(latLngs[1], 10));
        },

        getMap: function () {
            return new google.maps.Map($('.map-canvas').get(0), {
                zoom: this.zoom,
                center: this.latLng,
                mapTypeId: google.maps.MapTypeId.SATELLITE
            });
        },

        getMarkerOptions: function (latLng, icon) {
            return {
                position: latLng,
                map: this.map,
                icon: icon
            };
        },

        getPlan: function () {
            return $('<img>')
                .attr('class', 'poly-info')
                .attr('src', this.$selectedMap.attr('map-plan'))[0];
        },

        getRequest: function () {
            return {
                destination: this.latLng,
                origin: this.$mapForm.find('.map-departure').val(),
                travelMode: google.maps.TravelMode[this.$mapForm.find('.map-mode').val()]
            };
        },

        setDirectionsOnMap: function () {
            this.directionsService = new google.maps.DirectionsService();
            this.directionsRenderer = new google.maps.DirectionsRenderer({
                suppressMarkers: true
            });
            this.directionsRenderer.setMap(this.map);
        },

        setDirections: function (response, status) {
            if (status === google.maps.DirectionsStatus.OK) {
                this.directionsRenderer.setDirections(response);
                this.addMarker(response.routes[0].legs[0].start_location, 'src/images/letter_p.png');
            }
        },

        addMarker: function (pos, icon) {
            return new google.maps.Marker({
                position: pos,
                map: this.map,
                icon: icon
            });
        },

        setInfoWindow: function (content) {
            if (this.infoWindow) {
                this.infoWindow.close();
            }
            this.infoWindow = new google.maps.InfoWindow({
                content: $('<div>').attr('class', 'info-window').html(content)[0]
            });
            this.infoWindow.open(this.map, this.marker);
        },

        setLine: function () {
            var lineSymbol = {
                path: google.maps.SymbolPath.CIRCLE,
                strokeOpacity: 1,
                scale: 3
            };

            return new google.maps.Polyline({
                path: this.getCoordinates(this.$selectedMap.attr('map-walking-path')),
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

        setMarker: function (latLng, icon) {
            this.marker = new google.maps.Marker(this.getMarkerOptions(latLng, icon));
            google.maps.event.addListener(this.marker, 'click', $.proxy(this.setInfoWindow, this, this.getPlan()));
        },

        setStartMarker: function (latLng, icon) {
            this.marker = new google.maps.Marker(this.getMarkerOptions(latLng, icon));
            google.maps.event.addListener(this.marker, 'click', $.proxy(this.setZoom, this, this.marker));
        },

        setRoute: function () {
            this.map.setMapTypeId(google.maps.MapTypeId.ROADMAP);
            this.directionsService.route(this.getRequest(), $.proxy(this.setDirections, this));
        },

        setZoom: function (marker) {
            var infoMarker = new google.maps.InfoWindow({
                content: $('<div>').attr('class', 'info-marker').html(this.$selectedMap.attr('map-street-name'))[0]
            });
            this.map.panTo(this.latLngMarker);
            this.map.setZoom(this.zoom);
            this.map.setMapTypeId(google.maps.MapTypeId.SATELLITE);
            infoMarker.open(this.map, marker);
        },

        toggleMarker: function () {
            if (this.map.zoom < 18) {
                this.marker.setMap(null);
                this.map.setMapTypeId(google.maps.MapTypeId.ROADMAP);
            } else {
                // TODO the map is centered around this.marker!
                this.marker.setMap(this.map);
                this.map.setMapTypeId(google.maps.MapTypeId.SATELLITE);
                this.setInfoWindow(this.$selectedMap.attr('map-help'));
            }
        }
    };

    $(function () {
        var $mapForm = $('.map-form');

        $mapForm.find('.map-destination').change(function () {
            initialize($mapForm);
        });
    });

}(this.jQuery, this.parseFloat, this.google));
