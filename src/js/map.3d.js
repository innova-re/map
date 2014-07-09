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
		this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
	};

	Building.prototype = {

		constructor: Building,

		init: function () {
			this.setSize();
			$('body').append(this.renderer.domElement);
			this.addObjects();
			this.setAxisHelper();
			this.setPosiotions();
			this.animate();
			window.t = this;
		},

		addObjects: function () {
			this.scene.add(this.plane);
			this.scene.add(this.cube);
			this.scene.add(this.cube2);
			this.scene.add(this.cube3);
			this.addStairs(this.cubeVertex);
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
				new THREE.BoxGeometry(vertex, this.floorHeight, vertex),
				new THREE.LineBasicMaterial({
					color: '#' + Math.floor(Math.random()*16777215).toString(16),
					opacity: 0.5,
					transparent:true })
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

		addStairs: function (xPosition, yPosition) {
			// MATERIALS
			var stepMaterialVertical = new THREE.MeshLambertMaterial({color: 0xC0C0C0});
			var stepMaterialHorizontal = new THREE.MeshLambertMaterial({color: 0xC0C0C0});

			var stepWidth = 5;
			var stepSize = 2;
			var stepThickness = 0.5;
			// height from top of one step to bottom of next step up
			var verticalStepHeight = stepSize;
			var horizontalStepDepth = stepSize*2;

			var stepHalfThickness = stepThickness/2;

			// +Y direction is up
			// Define the two pieces of the step, vertical and horizontal
			// THREE.CubeGeometry takes (width, height, depth)
			var stepVertical = new THREE.BoxGeometry(stepWidth, verticalStepHeight, stepThickness);
			var stepHorizontal = new THREE.BoxGeometry(stepWidth, stepThickness, horizontalStepDepth);
			var stepMesh;

			for(var s = 0; s < 7; ++s){
				var y = (verticalStepHeight + stepThickness) * s + verticalStepHeight/2;
				var z = (horizontalStepDepth - stepThickness) * s;
				// Make and position the vertical part of the step
				stepMesh = new THREE.Mesh( stepVertical, stepMaterialVertical );
				// The position is where the center of the block will be put.
				// You can define position as THREE.Vector3(x, y, z) or in the following way:
				stepMesh.position.x = xPosition || 0;            // centered at origin
				stepMesh.position.y = yPosition || y;    // half of height: put it above ground plane
				stepMesh.position.z = z;            // centered at origin
				this.scene.add( stepMesh );

				// Make and position the horizontal part
				stepMesh = new THREE.Mesh( stepHorizontal, stepMaterialHorizontal );
				stepMesh.position.x = xPosition || 0;
				// Push up by half of horizontal step's height, plus vertical step's height
				stepMesh.position.y = yPosition || y + (stepThickness/2 + verticalStepHeight/2);
				// Push step forward by half the depth, minus half the vertical step's thickness
				stepMesh.position.z = z + (horizontalStepDepth/2 - stepThickness/2);
				this.scene.add( stepMesh );
			}
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
