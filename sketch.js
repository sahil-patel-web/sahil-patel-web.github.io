//Main reference : https://p5js.org/examples/simulate-forces.html
let seconds = [];
let minutes = [];
let hours = [];
let sec = 0
let min = 0
let hou = 0
function setup() {
	createCanvas(600,610); // make an HTML canvas element width x height pixels
	frameRate(60); //at 60 seconds, check if boxes need to be emptied


	

	noStroke(); //removes outlines

	sec = second()
	for (var i = 0; i < sec; i++){
		let sec_ball  = new Mover(1, random(20,180), random(10,590));
		append(seconds,sec_ball);
	}
	min = minute()
	for (var i = 0; i < min; i++){
		let min_ball = new Mover(2, random(220,380), random(10,590));
		append(minutes,min_ball);
	}
	hou = hour()
	for (var i = 0; i < hou; i++){
		let hou_ball = new Mover(3, random(420, 580), random(10,590));
		append(hours,hou_ball);
	}

}

function draw() {
	
	background('#F8F8F8');
	fill('#636363');
	rect(199, 0, 1, 600);
	rect(399, 0, 1, 600);


	for ( let i = 0; i <= 51 ; i++){
		noStroke();
		fill( 255 - (i * 5) )
		rect ( (i*11.65) , 600, 11.65,5);
	}

	if(second() != sec){
		sec = second();
		if(sec == 0){
			seconds = [];
		}
		else{
			seconds[seconds.length] = new Mover(1, random(20,180), random(10,590));
		}
	}

	if(minute() != min){
		console.log(minute());
		min = minute();
		if(min == 0){
			minutes = [];
		}
		else{
			minutes[minutes.length] = new Mover(2, random(220,380), random(10,590));
		}
	}
	
	if(hour() != hou){
		hou = hour();
		if (hou == 0){
			hours = [];
		}
		else{
			hours[hours.length] = new Mover(3, random(420, 580), random(10,590));
		}
	}


	for (let i = 0; i < seconds.length; i++) {

		    // // Gravity is scaled by mass here!
			// let gravity = createVector(0, 0.3 * seconds[i].mass);
			// // Apply gravity
			// seconds[i].applyForce(gravity);

	
		// Update and display
		seconds[i].update();
		seconds[i].display();
		seconds[i].checkHit();
	}
	for (let i = 0; i < minutes.length; i++) {

		    // // Gravity is scaled by mass here!
			// let gravity = createVector(0, 0.3 * minutes[i].mass);
			// // Apply gravity
			// minutes[i].applyForce(gravity);

		// Update and display
		minutes[i].update();
		minutes[i].display();
		minutes[i].checkHit();
	}
	for (let i = 0; i < hours.length; i++) {

		    // // Gravity is scaled by mass here!
			// let gravity = createVector(0, 0.5 * hours[i].mass);
			// // Apply gravity
			// hours[i].applyForce(gravity);

		// Update and display
		hours[i].update();
		hours[i].display();
		hours[i].checkHit();
	}
}
function Mover(m, x, y) {
	this.mass = m;
	this.position = createVector(x, y);
	if (m == 1){
		this.velocity = createVector( random(-5,5) , random(-5,5));
	}
	else if (m == 2){
		this.velocity = createVector( random(-3,3) , random(-3,3));
	}
	else {
		this.velocity = createVector( random(-1,1) , random(-1,1));
	}
	
	this.acceleration = createVector(0, 0);
  }
Mover.prototype.update = function() {
	// Velocity changes according to acceleration
	this.velocity.add(this.acceleration);
	// position changes by velocity
	this.position.add(this.velocity);
	// We must clear acceleration each frame
	this.acceleration.mult(0);
  };

Mover.prototype.applyForce = function(force) {
	let f = p5.Vector.div(force, this.mass);
	this.acceleration.add(f);
  };

Mover.prototype.display = function() {
	stroke(0);
	strokeWeight(2);
	if(this.mass <= 1){
		fill( 255 - (seconds.length*4.25) );
		ellipse(this.position.x, this.position.y, this.mass * 16, this.mass * 16);
	}
	else if(this.mass <= 2){
		fill( 255 - (minutes.length*4.25) );
		ellipse(this.position.x, this.position.y, this.mass * 16, this.mass * 16);
	}
	else {
		fill( 255 - (hours.length*10.625) );
		ellipse(this.position.x, this.position.y, this.mass * 16, this.mass * 16);
	}
	
  };

// Bounce off bottom of window
Mover.prototype.checkHit = function() {
	if (this.position.y > (600 - this.mass * 8) ) {
	  // A little dampening when hitting the bottom
	  this.velocity.y *= -1;
	  this.position.y = (600 - this.mass*8);
	}
	else if (this.position.y < (0 + this.mass *8)){
		this.velocity.y *= -1;
		this.position.y = (this.mass*8);
	}
	if (this.mass <= 1){
		if (this.position.x > (200 - this.mass * 8)|| this.position.x <  (0 + this.mass * 8) ){
			this.velocity.x *= -1;
		}


	}
	else if(this.mass <= 2){
		if (this.position.x > (400 - this.mass * 8) || this.position.x <  (200 + this.mass * 8) ){
			this.velocity.x *= -1;
		}


	}
	else {
		if (this.position.x > (600 - this.mass * 8) || this.position.x <  (400 + this.mass * 8) ){
			this.velocity.x *= -1;
		}
	}



  };
