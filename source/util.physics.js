goog.provide('util.physics');

goog.require('util.misc');

util.physics.G = 100;
util.physics.M = 100;
util.physics.MAXSPEED = 500;
util.physics.MAXACCEL = 100;

// POSITION
util.physics.pos = function(x, y){
	//
	this.x = x;
	this.y = y;
	
	return this;
}
util.physics.pos.prototype.clone = function() {
	//
	return new util.physics.pos(this.x, this.y);
};

// VECTOR
util.physics.vec = function(dx, dy){
	//
	this.dx = dx;
	this.dy = dy;
	
	return this;
}
util.physics.vec.prototype.clone = function() {
	//
	return new util.physics.vec(this.dx, this.dy);
};
util.physics.vec.prototype.init = function(mag) {
	//
	if (typeof mag === 'undefined') {
		//
		mag = 1;
	}
	
	this.dx = mag;
	this.dy = 0;
	
	return this;
};
util.physics.vec.prototype.add = function(v) {
	//
	this.dx += v.dx;
	this.dy += v.dy;
	
	return this;
};
util.physics.vec.prototype.mag = function() {
	//
	return Math.sqrt(Math.pow(this.dx, 2) + Math.pow(this.dy, 2));
};
util.physics.vec.prototype.angle = function() {
	//
	return util.physics.angle(0, 0, this.dx, this.dy);
};
util.physics.vec.prototype.cx = function() {
	//
	return this.mag() * Math.cos(util.physics.radians(this.angle()));
};
util.physics.vec.prototype.cy = function() {
	//
	return this.mag() * Math.sin(util.physics.radians(this.angle()));
};
util.physics.vec.prototype.inv = function() {
  //
  this.dx = -this.dx;
  this.dy = -this.dy;
  
  return this;
};
util.physics.vec.prototype.scale = function(s) {
	//
	this.dx *= s;
	this.dy *= s;
	
	return this;
};
util.physics.vec.prototype.inc = function(d) {
	//
	return this.scale( (this.mag() + d) / this.mag() );
};
util.physics.vec.prototype.dec = function(d) {
	//
	return this.scale( (this.mag() - d) / this.mag() );
};
util.physics.vec.prototype.rotate = function(angle) {
	//
	var
		dx = this.dx,
		dy = this.dy;
	
	angle = util.physics.radians(angle);
	
	this.dx = dx * Math.cos(angle) + dy * Math.sin(angle);
	this.dy = dy * Math.cos(angle) - dx * Math.sin(angle);
	
	return this;
};

// BODY
util.physics.body = function(pos, vec, mass, speed){
	//
	this.pos = pos;
	this.vec = vec;
	this.mass = mass;
	//this.speed = speed;
	
	this.speed = new util.physics.vec();
	this.speed.init(speed);
	
	return this;
}
util.physics.body.prototype.clone = function() {
	//
	return new util.physics.body(this.pos, this.vec, this.mass, this.speed);
};
util.physics.body.prototype.gravity = function(b) {
	//
	var
		ang = util.physics.angle(this.pos, b.pos),
		mag = util.physics.gravity(this, b);
		
	ang = util.physics.radians(ang);
	
	var
		dx = mag * Math.cos( ang ),
		dy = -mag * Math.sin( ang );
		
	this.vec.add(new util.physics.vec(dx, dy));
	
	return this;
};
util.physics.body.prototype.accelerate = function(acc) {
	//
	var
		ang = util.physics.radians( this.speed.angle() );
	
	var
		dx = acc * Math.cos( ang ),
		dy = -acc * Math.sin( ang );
		
	this.vec.add(new util.physics.vec(dx, dy));
	
	return this;
};
util.physics.body.prototype.decelerate = function(acc) {
	//
	var
		ang = util.physics.radians( this.speed.clone().inv().angle() );
	
	var
		dx = acc * Math.cos( ang ),
		dy = -acc * Math.sin( ang );
		
	this.vec.add(new util.physics.vec(dx, dy));
	
	return this;
};
util.physics.body.prototype.advance = function(dt, limit) {
	//
	dt = dt / 1000;
	
	var
		angle = util.physics.radians( this.vec.angle() ),
		accel = (this.vec.mag() / this.mass) * dt;
	
	//this.speed += accel; //util.misc.bound(accel, -1 * util.physics.MAXACCEL, util.physics.MAXACCEL);
	
	//this.speed = util.misc.bound(this.speed, 0, util.physics.MAXSPEED);
	
	//this.pos.x += this.speed * Math.cos( angle ) * (dt / 1000);
	//this.pos.y -= this.speed * Math.sin( angle ) * (dt / 1000);
	
	var
		dx = accel * Math.cos( angle ) * dt * dt / 2 + this.speed.cx() * dt,
		dy = accel * Math.sin( angle ) * dt * dt / 2 + this.speed.cy() * dt;
		
	dy *= -1;
	
	//console.log(accel + ' * ' + Math.sin( angle ) + ' = ' + (accel * Math.sin( angle ) * dt * dt / 2) + ' / ' + this.speed.cy() + ' / ' + dx + ' / ' + dy);	
	
	/*
	console.log(this.speed.cx() + ' / ' + this.speed.cy());
	console.log(dx + ' / ' + dy);
	console.log((this.speed.cx()*dt) + ' / ' + (this.speed.cy() * dt));
	console.log('---------------');
	*/
	
	this.speed = new util.physics.vec(dx / dt, dy / dt);
	
	if (limit) {
		//
		if (this.speed.mag() > util.physics.MAXSPEED) {
			//
			this.speed.scale(util.physics.MAXSPEED / this.speed.mag());
		}
	}
	
	this.pos.x += this.speed.cx() * dt;
	this.pos.y -= this.speed.cy() * dt;
	
	return this;
};
util.physics.body.prototype.move = function(dd) {
	//
	var
		angle = util.physics.radians( this.vec.angle() );
	
	this.pos.x += dd * Math.cos( angle );
	this.pos.y -= dd * Math.sin( angle );
	
	return this;
};
	
	
// UTILITY FUNCTIONS

util.physics.radians = function(deg){
	//
	return deg * Math.PI / 180;
}
util.physics.degrees = function(rad){
	//
	return rad * 180 / Math.PI;
}


util.physics.gravity = function(b1, b2){
	//
	return util.physics.G * b1.mass * b2.mass / Math.pow(util.physics.distance(b1.pos, b2.pos), 2);
}
util.physics.mass = function(radius){
	//
	return (util.physics.M * Math.PI * Math.pow(radius, 3) * 4 / 3) * gravity.WIDTH / 2000;
}
	
util.physics.distance = function(pos1, pos2, x2, y2){
	//
	var
		x1 = pos1,
		y1 = pos2;
		
	if (typeof x2 === 'undefined') {
		//
		x1 = pos1.x;
		y1 = pos1.y;
		x2 = pos2.x;
		y2 = pos2.y;
	}
	
	return Math.sqrt( Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
}
	
// angle from 0 deg
util.physics.angle = function(pos1, pos2, x2, y2){
	//
	var
		x1 = pos1,
		y1 = pos2;
		
	if (typeof x2 === 'undefined') {
		//
		x1 = pos1.x;
		y1 = pos1.y;
		x2 = pos2.x;
		y2 = pos2.y;
	}
	
	if (x1 == x2 && y1 == y2) {
		//
		return 0;
	}
	
	return 180 - util.physics.degrees( Math.atan2(y1 - y2, x1 - x2) );
	//return Math.PI - Math.atan2(y1 - y2, x1 - x2);
}
	
util.physics.delta = function(rotation, pos1, pos2, x2, y2){
	//
	var
		x1 = pos1,
		y1 = pos2;
		
	if (typeof x2 === 'undefined') {
		//
		x1 = pos1.x;
		y1 = pos1.y;
		x2 = pos2.x;
		y2 = pos2.y;
	}
	
	var
		angle = util.physics.angle(x1, y1, x2, y2);
	
	if (rotation < 0)
		rotation += 360;
		
	var delta = angle - rotation;
	if (Math.abs(delta) > 180) {
		if (delta < 0)
			delta += 360;
		else
			delta -= 360;
	}
	
	return delta;
}