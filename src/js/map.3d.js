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
		this.planeVertex = 100;
		this.floorHeight = 17;
		this.renderer = this.getRenderer();
		this.camera = this.getCamera();
		this.scene = this.getScene();
		this.plane = this.getPlane();
		this.cubeVertex = this.planeVertex * 0.5;
		this.cube = this.getCube(this.cubeVertex);
		this.cube2 = this.getCube(this.cubeVertex);
		this.cube3 = this.getCube(this.cubeVertex);
		this.cube4 = this.getCube(this.cubeVertex * 0.4, {
			opacity: 0.9,
			color: 'red'
		});
		this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
	};

	Building.prototype = {

		constructor: Building,

		init: function () {
			this.setSize();
			this.addObjects();
			this.setAxisHelper();
			this.setPosiotions();
			this.animate();
			window.t = this;
			window.building = this;
			this.renderer.domElement.addEventListener( 'click', function() {console.log(this)}, false );
		},

		addObjects: function () {
			$('body').append(this.renderer.domElement);
			this.scene.add(this.plane);
			this.scene.add(this.cube);
			this.scene.add(this.cube2);
			this.scene.add(this.cube3);
			this.scene.add(this.cube4);
			new THREE.Stair(this.scene, {
				x: this.cubeVertex / 2,
				z: -this.cubeVertex / 2,
				y: 0,
				height: this.floorHeight - 2
			});
			new THREE.Stair(this.scene, {
				x: -this.cubeVertex / 2,
				z: -this.cubeVertex / 2,
				y:0,
				height: this.floorHeight - 2
			});
			new THREE.Stair(this.scene, {
				x: -this.cubeVertex / 2,
				z: -this.cubeVertex / 2,
				y: this.floorHeight,
				height: this.floorHeight * 2
			});
			new THREE.Stair(this.scene, {
				x: this.cubeVertex / 2,
				z: -this.cubeVertex / 2,
				y: this.floorHeight,
				height: this.floorHeight * 2
			});
		},

		animate: function () {
			this.renderer.render(this.scene, this.camera);
			requestAnimationFrame($.proxy(this.animate, this));
		},

		getCamera: function () {
			return new THREE.PerspectiveCamera(60, this.innerWidth / this.innerHeight, 0.1, 20000 );
		},

		getCube: function (vertex, material) {
			var material = material || {
				color: '#' + Math.floor(Math.random()*16777215).toString(16),
				opacity: 0.5,
				transparent: true
			};
			return new THREE.Mesh(
				new THREE.BoxGeometry(vertex, this.floorHeight, vertex),
				new THREE.LineBasicMaterial(material)
			);
		},

		getPlane: function () {
			return new THREE.Mesh(
				new THREE.PlaneGeometry(this.planeVertex, this.planeVertex, 10, 10),
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

		/*
		 * An axis object to visualize the the 3 axes in a simple way.
		 * The X axis is red. The Y axis is green. The Z axis is blue.
		*/
		setAxisHelper: function () {
			this.scene.add(new THREE.AxisHelper(this.planeVertex));
		},

		setPosiotions: function () {
			this.camera.position.set(0, 0, this.planeVertex * 1.5);
			this.plane.rotation.set(this.getRadians(90), 0, 0);
			this.cube.position.y = this.floorHeight * 0.5;
			this.cube2.position.y = this.floorHeight * 1.5;
			this.cube3.position.y = this.floorHeight * 2.5;
			this.cube4.position.y = this.floorHeight * 2.5;
			this.cube4.position.x = this.cubeVertex / 3;
			this.cube4.position.z = this.cubeVertex / 3.5;
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
