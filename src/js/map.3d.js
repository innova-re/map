/*!
 * Innovare.Map.Main JavaScript Library v0.1
 * https://github.com/innova-re/map
 *
 * Copyright 2014, Antonio Pierro
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * References:
 * - https://www.youtube.com/playlist?list=PLcUid3OP_4OVX8zp-ZTcyOsp6C9CJCqd0
 * - http://www.html5canvastutorials.com/labs/html5-canvas-interactive-building-map/
 * - http://mrdoob.com/projects/voxels/#A/
 */

(function (window, $, THREE, PI, requestAnimationFrame) {
	'use strict';

	var Building = function () {

		this.innerWidth = window.innerWidth;
		this.innerHeight = window.innerHeight;
		this.renderer = this.getRenderer();
		this.camera = this.getCamera();
		this.scene = this.getScene();
		this.plane = this.getPlane();
		this.cube = this.getCube();

		// Animation variables
		this.angularSpeed = 0.2;
		this.lastTime = 0;
	};

	Building.prototype = {

		constructor: Building,

		init: function () {
			this.setSize();
			this.setCameraPosition();
			this.setCubePosition();
			$('body').append(this.renderer.domElement);
			this.scene.add(this.cube);
			this.scene.add(this.plane);
			this.animate();
		},

		animate: function () {
			var time = (new Date()).getTime();
			var timeDiff = time - this.lastTime;
			var angularChange = this.angularSpeed * timeDiff * 2 * PI / 1000;

			this.cube.rotation.z += angularChange;
			this.lastTime = time;
			this.renderer.render(this.scene, this.camera);

			requestAnimationFrame($.proxy(this.animate, this));
		},

		getCamera: function () {
			return new THREE.PerspectiveCamera(45, this.innerWidth / this.innerHeight, 1, 1000 );
		},

		getCube: function () {
			return new THREE.Mesh(
				new THREE.CubeGeometry(120, 120, 60)
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
			this.camera.position.z = 300;
			this.camera.rotation.x = 30 * (PI / 180);
		},

		setCubePosition: function () {
			this.cube.position.z = 10;
			this.cube.rotation.z = 45 * (PI / 180);
		},

		setSize: function () {
			this.renderer.setSize(this.innerWidth, this.innerHeight);
		}
	}

	$(function () {
		var building = new Building();

		building.init();
	});

})(window, window.jQuery, window.THREE, window.Math.PI, window.requestAnimationFrame);
