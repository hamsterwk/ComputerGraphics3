
var gl;
var points;

window.onload = function init()
{
    var canvas = document.getElementById( "gl-canvas" );
    
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    
    var vertices = new Float32Array([1, 0, 0, 1, 0, 0]);
	  var ANGLE = 90.0;

	  // Create a rotation matrix
	  var radian = Math.PI * ANGLE / 180.0; // Convert to radians
	  var cosB = Math.cos(radian), sinB = Math.sin(radian);
    //  Configure WebGL
	  var xformMatrix = new Float32Array([
		 cosB, sinB, 0.0, 0.0,
		-sinB, cosB, 0.0, 0.0,
		  0.0,  0.0, 1.0, 0.0,
		  0.0,  0.0, 0.0, 1.0
	  ]);

	  gl.uniformMatrix4fv(lookAt(vec3(),vec3(),vec3()), false, xformMatrix);
    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 1.0, 1.0, 1.0, 1.0 );
    
    //  Load shaders and initialize attribute buffers
    
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );
    
    // Load the data into the GPU
    
    var bufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
    gl.bufferData( gl.ARRAY_BUFFER,vertices, gl.STATIC_DRAW );

    // Associate out shader variables with our data buffer
    
    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

    render();
};


function render() {
    gl.clear( gl.COLOR_BUFFER_BIT );
    gl.drawArrays( gl.TRIANGLES, 0, 3 );
}
