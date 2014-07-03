/*!
 * Innovare.Map.Main JavaScript Library v0.1
 * https://github.com/innova-re/map
 *
 * Copyright 2014, Antonio Pierro
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * references: https://www.youtube.com/playlist?list=PLcUid3OP_4OVX8zp-ZTcyOsp6C9CJCqd0
 * http://www.html5canvastutorials.com/labs/html5-canvas-interactive-building-map/
 */

(function (window, $, THREE) {
	'use strict';

	var Building = function () {

		this.innerWidth = window.innerWidth;
		this.innerHeight = window.innerHeight;
		this.renderer = this.getRenderer();
		this.camera = this.getCamera();
		this.scene = this.getScene();
		this.plane = this.getPlane();
		this.cube = this.getCube();
	};

	Building.prototype = {

		constructor: Building,

		init: function () {
			this.setSize();
			this.setCameraPosition();
			this.setCubePosition();
			window.document.body.appendChild(this.renderer.domElement);
			this.scene.add(this.cube);
			this.scene.add(this.plane);
			this.renderer.render(this.scene, this.camera);
		},

		getCamera: function () {
			return new THREE.PerspectiveCamera(45, this.innerWidth / this.innerHeight, 1, 1000 );
		},

		getCube: function () {
			return new THREE.Mesh(
				new THREE.CubeGeometry(120, 120, 120)
			);
		},

		getPlane: function () {
			return new THREE.Mesh(
				new THREE.PlaneGeometry(300, 300, 40, 40),
				new THREE.MeshBasicMaterial({ color: 0x7f7f7f, wireframe: true })
			);
		},

		getRenderer: function () {
			return new THREE.WebGLRenderer();
		},

		getScene: function () {
			return new THREE.Scene();
		},

		setCameraPosition: function () {
			this.camera.position.y = -200;
			this.camera.position.z = 400;
			this.camera.rotation.x = .40;
		},

		setCubePosition: function () {
			this.cube.position.z = 10;
			this.cube.rotation.z = .75;
		},

		setSize: function () {
			this.renderer.setSize(this.innerWidth, this.innerHeight);
		}
	}

	$(function () {
		var building = new Building();

		building.init();
	});

})(window, window.jQuery, window.THREE);
