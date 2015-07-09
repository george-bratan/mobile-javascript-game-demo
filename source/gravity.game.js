goog.provide('gravity.GameScene');

goog.require('lime.Layer');
goog.require('lime.Scene');
goog.require('lime.animation.Loop');
goog.require('lime.animation.Spawn');
goog.require('lime.animation.FadeTo');
goog.require('lime.animation.Resize');
goog.require('lime.animation.RotateBy');

goog.require('gravity.GameUI');
goog.require('gravity.HelpScene');
goog.require('gravity.EndScene');

goog.require('gravity.Ship');
goog.require('gravity.Smoke');
goog.require('gravity.Trail');
goog.require('gravity.Planet');
goog.require('gravity.Goodie');
goog.require('gravity.Target');
goog.require('gravity.Explosion');

goog.require('util.physics');
goog.require('util.storage');

// SETTINGS
gravity.goodie = 100;

/**
 * @constructor
 * @extends lime.Scene
 */
gravity.GameScene = function(level) {
    //
	lime.Scene.call(this);

    this.level = level;
	this.points = 0;
	
	// BACKGROUND
	this.back = new lime.Sprite() //.setFill('assets/stars.6.png') //.setStroke(4, '#FFF')
		.setSize(gravity.WIDTH, gravity.HEIGHT).setAnchorPoint(0, 0).setPosition(0, 0);
	//this.back.domElement.style.cssText = 'background:url(assets/stars.png) repeat';		
    this.appendChild(this.back);
	
	// FOREGROUND
    this.layer = new lime.Layer();
    this.appendChild(this.layer);
    //this.layer.setOpacity(0);
	
	// UI
	this.ui = {};
	this.createUI();
	
	// PLANETS
	this.objects = {planets:[], goodies:[], trail:[]};
	this.createObjects();
	this.createShip();
	
	this.start();
};
goog.inherits(gravity.GameScene, lime.Scene);

gravity.GameScene.prototype.createShip = function() {
    
	this.objects.ship = new gravity.Ship();
	
	this.objects.ship.body = new util.physics.body(
		new util.physics.pos(gravity.WIDTH / 20, gravity.HEIGHT / 2),
		new util.physics.vec(0, 0),
		1,
		0
	);
	
	this.objects.ship.setPosition(this.objects.ship.body.pos);
	this.objects.ship.setRotation(this.objects.ship.body.vec.angle());
	
	this.layer.appendChild(this.objects.ship);
};

gravity.GameScene.prototype.createTrail = function(trail) {
	//
	if (!trail.length)
		return;
	
	for (i in trail) {
		//
		this.layer.appendChild(trail[i]);
	}
}

gravity.GameScene.prototype.createObjects = function() {
	//
	level = gravity.levels[this.level];
	
	var planet;
	
	for (i in level.planets) {
		//
		planet = new gravity.Planet(level.planets[i].r);
		
		planet.body = new util.physics.body(
			new util.physics.pos(level.planets[i].x, level.planets[i].y),
			new util.physics.vec(0, 0),
			util.physics.mass(level.planets[i].r),
			0
		);
		
		planet.setPosition( planet.body.pos );
		
		this.objects.planets.push(planet);
		this.layer.appendChild(planet);
	}
	
	for (i in level.goodies) {
		//
		goodie = new gravity.Goodie();
		
		goodie.body = new util.physics.body(
			new util.physics.pos(level.goodies[i].x, level.goodies[i].y),
			new util.physics.vec(0, 0),
			1,
			0
		);
		goodie.used = false;
		
		goodie.setPosition( goodie.body.pos );
		
		this.objects.goodies.push(goodie);
		this.layer.appendChild(goodie);
	}
	
	// WORM HOLE
	this.objects.target = new gravity.Target();
	
	this.objects.target.body = new util.physics.body(
		new util.physics.pos(level.target.x, level.target.y),
		new util.physics.vec(0, 0),
		1,
		0
	);
	
	this.objects.target.setPosition(this.objects.target.body.pos); 
	this.objects.target.setRotation( Math.floor(Math.random() * 360) );
	
	this.layer.appendChild( this.objects.target );
}

gravity.GameScene.prototype.createUI = function() {
	//
	var level = gravity.levels[this.level];
	
	var X, Y;
	
	// FUEL GAUGE
	X = (gravity.HEIGHT / 10) * 1.1 * 0.2;
	Y = X
    this.ui.fuel = new gravity.FuelGauge().setValue(level.fuel, true).setPosition(X, Y);
    this.layer.appendChild(this.ui.fuel);
	
	
	// RESTART BUTTON
	this.ui.restart = new gravity.GameButton('&R').autoPos(-1, 0); //setPosition(gravity.WIDTH - 20 - 60, 20);
    this.appendChild(this.ui.restart);
	goog.events.listen(this.ui.restart, ['mousedown', 'touchstart', 'keydown'], function(e) {
		e.event.stopPropagation();
    });
	goog.events.listen(this.ui.restart, lime.Button.Event.CLICK, function(e) {
		this.stop();
		gravity.loadGame( this.level );
    }, false, this);
	
	
	// HELP BUTTON
	this.ui.help = new gravity.GameButton('?').autoPos(-2, 0); //.setPosition(gravity.WIDTH - 20 - 60 - 60, 20);
    this.appendChild(this.ui.help);
	goog.events.listen(this.ui.help, ['mousedown', 'touchstart', 'keydown'], function(e) {
		e.event.stopPropagation();
    });
	goog.events.listen(this.ui.help, lime.Button.Event.CLICK, function(e) {
		//
		//this.paused = true;
		//gravity.director.pushScene(new gravity.HelpScene());
		
		gravity.director.pauseClassFactory = gravity.HelpScene;
		gravity.director.setPaused( true );
		
		lime.updateDirtyObjects();
		
    }, false, this);
	
	
	// MENU BUTTON
	this.ui.menu = new gravity.GameButton('#').autoPos(-3, 0); //.setPosition(gravity.WIDTH - 20 - 60 - 60 - 60, 20);
    this.appendChild(this.ui.menu);
	goog.events.listen(this.ui.menu, ['mousedown', 'touchstart', 'keydown'], function(e) {
		e.event.stopPropagation();
    });
	goog.events.listen(this.ui.menu, lime.Button.Event.CLICK, function(e) {
		this.stop();
		gravity.loadMenu(true);
    }, false, this);

	// POINTS
	var F = gravity.HEIGHT / 10;
	this.ui.points = new lime.Label().setText(this.points).setPosition(gravity.WIDTH/2, 20).setAnchorPoint(.5, 0).setFontColor(gravity.FOREGROUND).setFontSize(F);
	this.appendChild(this.ui.points);
}

gravity.GameScene.prototype.start = function() {
	//
    //this.layer.runAction(new lime.animation.FadeTo(1));
    
	goog.events.listen(this, ['mousedown', 'touchstart', 'keydown'],
         this.downHandler_, false, this);
	
	goog.events.listen(this, ['mousemove', 'touchmove'],
         this.moveHandler_, false, this);

	this.isdown = false;
	this.started = false;
	this.done = false;
	this.paused = false;
	
	lime.scheduleManager.schedule(this.move_, this);
};

gravity.GameScene.prototype.stop = function() {
	//
	goog.events.unlisten(this, ['mousedown', 'touchstart', 'keydown'],
		this.downHandler_, false, this);
	
	lime.scheduleManager.unschedule(this.move_, this);
};

gravity.GameScene.prototype.showEndDialog = function(win) {
	//
	this.stop();
	
	this.done = true;
	
	//lime.animation.actionManager.stopAll();
	gravity.director.pauseClassFactory = gravity.EndScene;
	gravity.director.setPaused( true );
		
	lime.updateDirtyObjects();
};

gravity.GameScene.prototype.move_ = function( dt ) {
	//
	if (!this.started || this.paused || this.done)
		return;
	
	this.points += 1;
	this.ui.points.setText(this.points);
	
	
	// GRAVITY
	//var angle = this.objects.ship.body.vec.angle();
	this.objects.ship.body.vec.init();
	this.objects.ship.body.vec.rotate( this.objects.ship.getRotation() );
	
	for (i in this.objects.planets) {
		//
		this.objects.ship.body.gravity(this.objects.planets[i].body);
	}
	
	
	// ACCELERATE
	if (this.isdown && this.ui.fuel.getValue() > 0) {
		// accelerate
		if (this.objects.ship.body.speed.mag() < util.physics.MAXSPEED * 1.5) {
			//
			this.objects.ship.body.accelerate(util.physics.G * util.physics.MAXSPEED);
			
			console.log('inc:' + this.objects.ship.body.vec.angle() + ', ' + this.objects.ship.body.vec.mag() + ', ' + this.objects.ship.body.speed.mag());
		}	
	}
	else if (!this.isdown || this.ui.fuel.getValue() <= 0){
		// decelerate below maxspeed
		if (this.objects.ship.body.speed.mag() > util.physics.MAXSPEED) {
			//
			this.objects.ship.body.decelerate(50 * util.physics.MAXSPEED);
			
			console.log('dec:' + this.objects.ship.body.vec.angle() + ', ' + this.objects.ship.body.vec.mag() + ', ' + this.objects.ship.body.speed.mag());
		}	
	}
	else {
		console.log('eq: ' + this.objects.ship.body.vec.angle() + ', ' + this.objects.ship.body.vec.mag() + ', ' + this.objects.ship.body.speed.mag());
	}	
	
	
	// ADVANCE
	this.objects.ship.body.advance(dt);
	
	this.objects.ship.setPosition( this.objects.ship.body.pos );
	this.objects.ship.setRotation( this.objects.ship.body.speed.angle() );
	
	
	// ADD SMOKE
	//if (false)
	if (this.isdown && this.ui.fuel.getValue() > 0) {
		//
		//if (!this.objects.smoke) {
		
		var
			smoke = true;
			
		if (this.objects.smoke) {
			//
			if (util.physics.distance(this.objects.smoke.body.pos, this.objects.ship.body.pos) < this.objects.ship.W/2 + 10) {
				//
				smoke = false;
			}
		}
		
		if (smoke) {
			var
				smoke = new gravity.Smoke();
			
			smoke.body = new util.physics.body(
				this.objects.ship.body.pos.clone(),
				this.objects.ship.body.speed.clone().inv(),
				0,
				0
			);
			
			smoke.body.move(this.objects.ship.W/2);
			smoke.setPosition(smoke.body.pos);
						
			this.objects.smoke = smoke;
			this.layer.appendChild(smoke);
			this.ui.fuel.setValue( this.ui.fuel.getValue() - 0.01 );
		}
		
		//if (util.physics.distance(this.objects.smoke.body.pos, this.objects.ship.body.pos) > 30) {
		if (false) {
			//
			var
				smoke = new gravity.Smoke();
			
			var
				angle = util.physics.angle(this.objects.smoke.body.pos, this.objects.ship.body.pos);
			
			smoke.body = new util.physics.body(
				this.objects.smoke.body.pos.clone(),
				new util.physics.vec(0, 0),
				0,
				0
			);
			
			smoke.body.vec.init();
			smoke.body.vec.rotate(angle);
			smoke.body.move(15);
			
			smoke.setPosition(smoke.body.pos);
						
			this.objects.smoke = smoke;
			this.layer.appendChild(smoke);
			this.ui.fuel.setValue( this.ui.fuel.getValue() - 0.01 );
		}
	}
	
	// ADD TRAIL
	if (gravity.settings.trail) {
		//
		var
			trail = new gravity.Trail(this.isdown);
		
		trail.body = new util.physics.body(
			this.objects.ship.body.pos.clone(),
			this.objects.ship.body.vec.clone().inv(),
			0,
			0
		);
		
		trail.body.move(20);
		trail.setPosition(trail.body.pos);
					
		this.objects.trail.push(trail);
		this.layer.appendChild(trail);
	}
	
	// CHECK IF WON
	if (util.physics.distance(this.objects.ship.body.pos, this.objects.target.body.pos) < this.objects.target.W/2) {
		//
		util.storage.set('level.' + this.level + '.points', this.points);
		//console.log('level.' + this.level + '.points' + ' = ' + util.storage.get('level.' + this.level + '.points'));
		
		this.done = true;
		this.objects.ship.Warp(this.objects.target.body.pos);
		
		lime.scheduleManager.callAfter(function(){
			this.showEndDialog(true);
		}, this, 1000);
		
		return;
	}
	
	if (this.objects.ship.body.pos.x < -100 || this.objects.ship.body.pos.y < -100 ||
			this.objects.ship.body.pos.x > gravity.WIDTH + 100 || this.objects.ship.body.pos.y > gravity.HEIGHT + 100) {
		//
		this.done = true;
		this.objects.ship.Explode();
		this.points = 0;
		
		this.showEndDialog(false);
		
		return;
	}
	
	// CHECK IF LOST
	for (i in this.objects.planets) {
		//
		if (util.physics.distance(this.objects.ship.body.pos, this.objects.planets[i].body.pos) < this.objects.planets[i].R + 10) {
			//
			this.done = true;
			this.objects.ship.Explode();
			this.points = 0;
			
			lime.scheduleManager.callAfter(function(){
				this.showEndDialog(false);
			}, this, 1000);
			
			return;
		}
	}
	
	// CHECK FOR GOODIES
	for (i in this.objects.goodies) {
		//
		if (!this.objects.goodies[i].used) {
			//
			if (util.physics.distance(this.objects.ship.body.pos, this.objects.goodies[i].body.pos) < this.objects.goodies[0].W*1.5) {
				//
				this.objects.goodies[i].Warp().Explode();
				this.objects.goodies[i].used = true;
				this.points += gravity.goodie;
			}
		}
	}
}

gravity.GameScene.prototype.downHandler_ = function(e) {
    //
	if (e.type == 'keydown' && e.event.keyCode != 90) {
        return;
    }
	
	if (!this.started && e.position) {
		//
		var
			angle = util.physics.angle(this.objects.ship.body.pos, e.position);
			
		this.objects.ship.body.speed.init(util.physics.MAXSPEED);
		//this.objects.ship.body.speed.init(100000);
		this.objects.ship.body.speed.rotate( angle );
		
		this.objects.ship.body.vec.init();
		this.objects.ship.body.vec.rotate( angle );
		
		this.objects.ship.setRotation( this.objects.ship.body.vec.angle() );
		
		this.started = true;
	}
	
	this.isdown = true;
	
    e.swallow(['mousemove', 'touchmove'], this.moveHandler_);
    e.swallow(['mouseup', 'touchend', 'touchcancel', 'keyup'], this.upHandler_);
};

gravity.GameScene.prototype.moveHandler_ = function(e) {
	//
	return;
	
    if (!this.isdown) {
        return;
    }
	
	if (e.position) {
		//
	}
};

gravity.GameScene.prototype.upHandler_ = function(e) {
    //
	if (e.type == 'keyup' && e.event.keyCode != 90) {
        return;
    }

	this.objects.smoke = null;
	
    this.isdown = false;
};
