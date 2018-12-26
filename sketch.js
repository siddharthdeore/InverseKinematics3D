var center ={'x':0,'y':0};
var ls=[];

let x=200,y=100,z=50; // target cordinates
let dx=2; 
let dy=3; 
let dz=4; 
let rotx,roty,rotz; // 3d rotation to target
let animateFlag=true;

function setup() {
	createCanvas(windowWidth, windowHeight,WEBGL);
	noStroke();

	ls.push(new Link(0,0,0,1,5)); // first small ball link
	for (var i = 0; i < 8; i++) {
		ls.push(new Link(0,0,0,50+i*1.5,3+i/2)); // add sample links
	}
}
function draw() {
	ambientLight(50, 50, 50);
	pointLight(255, 255, 255, 250, 250, 250);

	orbitControl();
	background(0);
	noStroke();
	showAxis(0.5);
	noFill();

	stroke(255,120);
	box(500,500,500);
	if(animateFlag){ x+=dx; y+=dy; z+=dz;}

	dy+=0.2;

	if(abs(x)>250){
		dx*=-1;
	}
	if(abs(y)>250){
		dy*=-1;
	}
	if(abs(z)>250){
		dz*=-1;
	}

	push();
	translate(x,y,z);
	fill(0,0,255)
	specularMaterial(0,255,0);
	noStroke();
	sphere(10); //Target
	pop();


	ls[0].dragXYZ(x,y,z);
	for (var i = 1; i < ls.length; i++) {
		ls[i].dragXYZ(ls[i-1].x, ls[i-1].y, ls[i-1].z);
	}
	ls[ls.length-1].dragBackXYZ(0,0,0);
	for (var i = ls.length - 2; i >= 0; i--) {
		ls[i].dragBackXYZ(ls[i+1].bx, ls[i+1].by, ls[i+1].bz);
	}
	for (var i = ls.length - 1; i >= 0; i--) {
		ls[i].show();
	}
}
function addLink(len) {
	ls.push(new Link(0,0,0,len,len*0.05))
}
function removeLink(){
	if(ls.length>1)
		ls.pop();
}
function setX(argument) {x=round(argument);}
function setY(argument) {y=round(argument);}
function setZ(argument) {z=round(argument);}
function setAnimateFlag(argument) {animateFlag=argument;}

//Link Class
function Link(x,y,z,length,dia) {
	this.x=x;this.y=y;this.z=z;this.length=length;
	this.bx=0;
	this.by=0;
	this.bz=0;
	this.dia=dia;
}
Link.prototype.dragXYZ = function(xx,yy,zz) {
	this.bx=xx;
	this.by=yy;
	this.bz=zz;
	// computed rotation angles psi and theta between two points
	let rotation = getDirection(this.bx,this.by,this.bz,this.x,this.y,this.z);
	//Components of rotation matrix
	// Constraints

	r11=cos(rotation.z)*cos(rotation.y);
	r21=(sin(rotation.z)*cos(rotation.y));
	r31=(-sin(rotation.y));
	this.x=this.bx + this.length*r11;
	this.y=this.by + this.length*r21;
	this.z=this.bz + this.length*r31;
};
Link.prototype.dragBackXYZ = function(xx,yy,zz) {
	this.x=xx;
	this.y=yy;
	this.z=zz;
	// computed rotation angles psi and theta between two points
	let rotation = getDirection(this.bx,this.by,this.bz,this.x,this.y,this.z);
	//Components of rotation matrix
	r11=cos(rotation.z)*cos(rotation.y);
	r21=(sin(rotation.z)*cos(rotation.y));
	r31=(-sin(rotation.y));
	this.bx=this.x-this.length*r11;
	this.by=this.y-this.length*r21;
	this.bz=this.z-this.length*r31;
};
Link.prototype.show = function() {
	rotation = getDirection(this.bx,this.by,this.bz,this.x,this.y,this.z);
	push();
		//Move ploter to links location
		translate(this.x,this.y,this.z);
		noStroke();
		fill(0,255,255)
		specularMaterial(180,180,180);
		sphere(this.dia*1.3); // plot first sphere of link 
		push();
			// rotation
			rotateZ(rotation.z); // rotate by psi
			rotateY(rotation.y); // rotate by theta
			let l = this.length;
			specularMaterial(255,255,128);
			// translate(rotation.r-l*1.5,0,0); box(l,5,5);
			// translate link half of its length from center
			translate(rotation.r-l*1.5,0,0); 
			// Rotate Link by 90 degress to align cylender axis
			rotateZ(PI/2);
			specularMaterial(210,210,220);
			cylinder(this.dia,l);
			//showAxis(1);
		//
		pop();
	//
	pop();
};
function getDirection(x1,y1,z1,x2,y2,z2) {
	let dx=x2-x1; // x distance
	let dy=y2-y1; // y distance
	let dz=z2-z1; // z distance
	let len = sqrt(dx*dx + dy*dy + dz*dz); // resultant length
	let rotx = 0;
	let roty = 0;
	let rotz = Math.atan2( dy, dx );
	if(dx>=0) {
		roty = -Math.atan2(dz*Math.cos(rotz),dx); // avoid numerical sigularity
	}
	else {
		roty = Math.atan2(dz*Math.cos(rotz),-dx);
	}


	let rotation= {'x':rotx,'y':roty,'z':rotz,'r':len};
	return rotation;
}
// Axis
function showAxis(scale) {
	push();
	translate(scale*50,0,0);
	fill(255,0,0);
	box(scale*100,1,1);
	pop();
	push();
	translate(0,-scale*50,0);
	fill(0,255,0);
	box(1,scale*100,1);
	pop();
	push();
	fill(0,0,255);
	translate(0,0,scale*50);
	box(1,1,scale*100);
	pop();
}
