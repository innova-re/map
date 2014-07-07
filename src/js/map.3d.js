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
 * - https://threejsdoc.appspot.com/doc/index.html#CubeGeometry
 */
(function (window, $, THREE, PI, requestAnimationFrame) {
	'use strict';

	var Building = function () {
		this.innerWidth = window.innerWidth;
		this.innerHeight = window.innerHeight;
		this.planeWidth = 100;
		this.planeHeight = 100;
		this.renderer = this.getRenderer();
		this.camera = this.getCamera();
		this.scene = this.getScene();
		this.plane = this.getPlane();
		this.cubeVertex = this.planeHeight * 0.6;
		this.cube = this.getCube(this.cubeVertex);
		this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
	};

	Building.prototype = {

		constructor: Building,

		init: function () {
			this.setSize();
			$('body').append(this.renderer.domElement);
			this.addObjects();
			this.setPosiotions();
			this.animate();
		},

		addObjects: function () {
			this.scene.add(this.plane);
			this.scene.add(this.cube);
		},

		animate: function () {
			this.renderer.render(this.scene, this.camera);
			requestAnimationFrame($.proxy(this.animate, this));
		},

		getCamera: function () {
			return new THREE.PerspectiveCamera(60, this.innerWidth / this.innerHeight, 0.1, 20000 );
		},

		getCube: function (vertex) {
			return new THREE.Mesh(
				new THREE.BoxGeometry(vertex, vertex, vertex),
				new THREE.MeshNormalMaterial({ color: 0x7f7f7f, wireframe: true })
			);
		},

		getPlane: function () {
			return new THREE.Mesh(
				new THREE.PlaneGeometry(this.planeWidth, this.planeHeight, 10, 10),
				new THREE.MeshBasicMaterial({ color: 0x7f7f7f, wireframe: true })
			);
		},

		getRadians: function (degrees) {
			return degrees * PI / 180;
		},

		getRenderer: function () {
			return new THREE.WebGLRenderer({
				shadowMapEnabled: true,
				antialias: true
			});
		},

		getScene: function () {
			return new THREE.Scene();
		},

		setPosiotions: function () {
			this.camera.position.set(0, 0, this.planeHeight * 1.5);
			this.plane.rotation.set(this.getRadians(90), 0, 0);
			this.cube.position.y = this.cubeVertex / 2;
		},

		setSize: function () {
			this.renderer.setSize(this.innerWidth, this.innerHeight);
			this.renderer.setClearColor(0xffffff, 1);
		}
	};

	$(function () {
		var building = new Building();

		building.init();
	});

})(this, this.jQuery, this.THREE, this.Math.PI, this.requestAnimationFrame);
