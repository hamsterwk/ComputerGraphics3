"use strict";

var canvas;
var gl;
var points = []; 
var renderDepth;
var angle;
var renderType;
var vertices;
var viewMatrix;
var Xdegree,Ydegree,Zdegree;
window.onload = function init()
{
	canvas = document.getElementById( "gl-canvas" );

	gl = WebGLUtils.setupWebGL( canvas );
	if ( !gl ) { alert( "WebGL isn't available" ); }

	Init();
   
	//deal
	deal(vertices[0],vertices[1],vertices[2],vertices[3],1);


	gl.viewport( 0, 0, canvas.width, canvas.height );
	gl.clearColor( 0.0, 0.0, 0.0, 1.0 );
	
	
	
	var program = initShaders( gl, "vertex-shader", "fragment-shader" );
	gl.useProgram( program );

	viewMatrix = gl.getUniformLocation(program,"viewMatrix");
	
	gl.clear( gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT );
	
	var bufferId = gl.createBuffer();
	gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
	gl.bufferData( gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW );


	var vPosition = gl.getAttribLocation( program, "vPosition" );
	gl.vertexAttribPointer( vPosition, 3, gl.FLOAT, false, 0, 0 );
	gl.enableVertexAttribArray( vPosition );

	render();
};

function Init(){
	gl.enable(gl.DEPTH_TEST)
	vertices = [
		vec3(-0.5,-0.5,-0.5),
		vec3( 0.5,-0.5,-0.5),
		vec3( 0.0, 0.5, 0.0),
		vec3( 0.0,-0.5, 0.5),
	]; 
	
	renderDepth=document.getElementById("depth").value;;
}


function drawTriangle(a,b,c){
	points.push(a,b,c);
}


function deal(a,b,c,d,depth){
	if(depth==renderDepth){
		drawTriangle(a,c,b);
		drawTriangle(a,c,d);
		drawTriangle(a,b,d);
		drawTriangle(b,c,d);
		
		return;
	}
	var ab=mix(a,b,0.5);
	var ac=mix(a,c,0.5);
	var ad=mix(a,d,0.5);
	var bc=mix(b,c,0.5);
	var bd=mix(b,d,0.5);
	var cd=mix(c,d,0.5);
	deal(a,ab,ac,ad,depth+1);
	deal(ab,b,bc,bd,depth+1);
	deal(ac,bc,c,cd,depth+1);
	deal(ad,bd,cd,d,depth+1);
}


function render() {
	Xdegree=document.getElementById( "Xdegree" ).value;
	Ydegree=document.getElementById( "Ydegree" ).value;
	Zdegree=document.getElementById( "Zdegree" ).value;
	gl.clear( gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT );
	gl.clearColor( 0.0, 0.0, 0.0, 1.0 );
	var vmat = mult(mult(rotateX(Xdegree),rotateY(Ydegree)),rotateZ(Zdegree) );
	gl.uniformMatrix4fv(viewMatrix,false,flatten(vmat));
	gl.drawArrays( gl.TRIANGLES, 0, points.length );
}
