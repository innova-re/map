THREE.Stair = function (scene, geometry) {
    // MATERIALS
    var stepMaterialVertical = new THREE.MeshLambertMaterial({color: 0xC0C0C0});
    var stepMaterialHorizontal = new THREE.MeshLambertMaterial({color: 0xC0C0C0});

    var stepWidth = 5;
    var stepSize = 1;
    var stepThickness = 0.5;
    // height from top of one step to bottom of next step up
    var verticalStepHeight = stepSize;
    var horizontalStepDepth = stepSize*2;
    // height limit before changing the direction of a staircase
    var heightBeforeChangeDirection = geometry.height / 2;

    var stepHalfThickness = stepThickness/2;

    // +Y direction is up
    // Define the two pieces of the step, vertical and horizontal
    // THREE.CubeGeometry takes (width, height, depth)
    var stepVertical = new THREE.BoxGeometry(stepWidth, verticalStepHeight, stepThickness);
    var stepHorizontal = new THREE.BoxGeometry(stepWidth, stepThickness, horizontalStepDepth);
    var stepMesh;
    var y = 0, z = geometry.z || 0 ;

    for (var s = 0; y < geometry.height; ++s) {
        y = (verticalStepHeight + stepThickness) * s + verticalStepHeight / 2 + geometry.y;
        z = (horizontalStepDepth - stepThickness) * s + geometry.z;
        // Make and position the vertical part of the step
        stepMesh = new THREE.Mesh( stepVertical, stepMaterialVertical );
        // The position is where the center of the block will be put.
        // You can define position as THREE.Vector3(x, y, z) or in the following way:
        stepMesh.position.x = geometry.x || 0;            // centered at origin
        stepMesh.position.y = y;    // half of height: put it above ground plane
        stepMesh.position.z = z;            // centered at origin
        scene.add( stepMesh );

        // Make and position the horizontal part
        stepMesh = new THREE.Mesh( stepHorizontal, stepMaterialHorizontal );
        stepMesh.position.x = geometry.x || 0;
        // Push up by half of horizontal step's height, plus vertical step's height
        stepMesh.position.y = (stepThickness/2 + verticalStepHeight/2) + y;
        // Push step forward by half the depth, minus half the vertical step's thickness
        stepMesh.position.z = z + (horizontalStepDepth/2 - stepThickness/2);
        scene.add( stepMesh );
    }
}
