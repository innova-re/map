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
		this.setCubePosition(this.cube, 0);

		// Animation variables
		this.angularSpeed = 0.1;
		this.lastTime = 0;
	};

	Building.prototype = {

		constructor: Building,

		init: function () {
			this.setSize();
			this.setCameraPosition();
			$('body').append(this.renderer.domElement);
			this.scene.add(this.cube);
			this.scene.add(this.plane);
			this.serLight();
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
				new THREE.CubeGeometry(120, 120, 100, 0, 2, 3),
				new THREE.MeshLambertMaterial({
					wireframe: true,
					wireframeLinewidth: 10
				})
			);
		},

		serLight: function () {
			var light = new THREE.DirectionalLight('white');
			light.position.set(0, -200, 280).normalize();
			this.scene.add(light);
		},

		getPlane: function () {
			return new THREE.Mesh(
				new THREE.PlaneGeometry(300, 300, 20, 20),
				new THREE.MeshBasicMaterial({ color: 0x7f7f7f, wireframe: true })
			);
		},

		getRenderer: function () {
			return new THREE.WebGLRenderer({
				shadowMapEnabled: true
			});
		},

		getScene: function () {
			return new THREE.Scene();
		},

		setCameraPosition: function () {
			this.camera.position.y = -200;
			this.camera.position.z = 280;
			this.camera.rotation.x = 30 * (PI / 180);
		},

		setCubePosition: function (cube, zPosition) {
			cube.position.z = zPosition;
		},

		setSize: function () {
			this.renderer.setSize(this.innerWidth, this.innerHeight);
			this.renderer.setClearColor(0xffffff, 1);
		}
	}

	$(function () {
		var building = new Building();

		building.init();
	});

})(window, window.jQuery, window.THREE, window.Math.PI, window.requestAnimationFrame);
