goog.provide('gravity.MenuScene');
goog.provide('gravity.MenuButton');

goog.require('lime.Scene');
goog.require('lime.Sprite');

goog.require('lime.Layer');
goog.require('lime.GlossyButton');
//goog.require('lime.RoundedRect');
//goog.require('lime.Label');

goog.require('util.storage');

goog.require('gravity.BuyScene');

/**
 * Glossy button. Rounded button with some predefined style.
 * Use lime.Button for lower level control.
 * @param {string} txt Text shown on the button.
 * @constructor
 * @extends lime.Button
 */
gravity.MenuButton = function(txt) {
	//
    lime.GlossyButton.call(this, txt);

    this.borderWidth = 4;
    this.setColor('#000');
};
goog.inherits(gravity.MenuButton, lime.GlossyButton);

/**
 * Make state for a button.
 * @private
 * @return {lime.RoundedRect} state.
 */
gravity.MenuButton.prototype.makeState_ = function(txt) {
	//
	var W, H, F, R;
	
	F = gravity.HEIGHT / 10;
	W = gravity.HEIGHT * 8/10;
	H = F;
	R = F/6;
	
    var state = new lime.RoundedRect().setFill('#fff').setRadius(R);
    state.inner = new lime.RoundedRect().setRadius(R);
    state.label = new lime.Label().setAlign('center').setFontColor('#eef').setFontSize(F).setSize(W, H);
	state.lock = new lime.Sprite().setSize(H, H).setFill('assets/lock.png');
	
	state.appendChild(state.inner);
	
	if (txt == '&L') {
		state.inner.appendChild(state.lock);	
	}
	else {
		state.inner.appendChild(state.label);
	}
	
    return state;
};

/**
 * Set button base color
 * @param {mixed} clr New base color.
 * @return {lime.GlossyButton} object itself.
 */
gravity.MenuButton.prototype.setColor = function(clr) {
	//
    clr = lime.fill.parse(clr);
    goog.array.forEach([this.upstate, this.downstate], function(s) {
        var c = s == this.downstate ? clr.clone().addBrightness(.1) : clr;
        //s.setFill(c);
        var c2 = c.clone().addBrightness(.3);
        var grad = new lime.fill.LinearGradient().setDirection(0, 0, 0, 1);
        grad.addColorStop(0, c2);
        grad.addColorStop(.45, c);
        grad.addColorStop(.55, c);
        grad.addColorStop(1, c2);
        s.inner.setFill(grad);
    },this);
	
    return this;
};


// ************************************************************************************


// MENU SCENE
gravity.MenuScene = function() {
    //
    lime.Scene.call(this);
	
    // MAIN SCREEN
    this.layer = new lime.Layer();
    this.appendChild(this.layer);

	var W, H, X, Y, F;
	
    this.ui = {};
    
	// LOGO 1
	W = ((gravity.WIDTH - gravity.HEIGHT) / 2);
	H = W * 134 / 193;
	X = W / 2;
	Y = gravity.HEIGHT / 3;
    this.ui.logo1 = new lime.Sprite().setFill('assets/shuttle.png').setPosition(X, Y).setSize(W * 8/10, H * 8/10).setRotation(45);
    this.layer.appendChild(this.ui.logo1);
	
	// LOGO 2
	W = ((gravity.WIDTH - gravity.HEIGHT) / 3);
	H = W;
	X = gravity.WIDTH - ((gravity.WIDTH - gravity.HEIGHT) / 2)/2;
	Y = gravity.HEIGHT / 3;
    this.ui.logo2 = new lime.Sprite().setFill('assets/planet.png').setPosition(X, Y).setSize(W * 8/10, H * 8/10).setRotation(45);
    this.layer.appendChild(this.ui.logo2);
	
	if (gravity.debug) {
		//
		goog.events.listen(this.ui.logo1, ['mouseup', 'touchend'], function() {
			//
			util.storage.clear();
			
			gravity.loadMenu();
		});
		
		goog.events.listen(this.ui.logo2, ['mouseup', 'touchend'], function() {
			//
			for (i in gravity.levels)
				util.storage.set('level.' + parseInt(i) + '.points', 1);
				
			util.storage.set('gravity.pack.paid', 1);
			
			gravity.loadMenu();
		});
	}
	
	/*
	var loop = new lime.animation.Loop(
		new lime.animation.RotateBy(45).setEasing(lime.animation.getEasingFunction(0,0,0,0)).setDuration(1) //.enableOptimizations()
	);
	this.ui.logo2.runAction(loop);
	*/
	
    //var contents = new lime.Layer().setPosition(0,0);
    //layer.appendChild(contents);

	// PLAY BUTTON
	W = gravity.HEIGHT * 8/10;
	H = W / 3;
	X = gravity.WIDTH / 2;
	Y = (gravity.HEIGHT - gravity.HEIGHT*2/3) / 2 + gravity.HEIGHT * 0/3 + (gravity.HEIGHT / 3) / 2;
    this.ui.play = new gravity.MenuButton('PLAY NOW').setPosition(X, Y).setSize(W, H);
    this.layer.appendChild(this.ui.play);
    goog.events.listen(this.ui.play, lime.Button.Event.CLICK, function() {
        //
        gravity.loadGame();
    });

    // LEVELS BUTTON
	W = gravity.HEIGHT * 8/10;
	H = W / 3;
	X = gravity.WIDTH / 2;
	Y = (gravity.HEIGHT - gravity.HEIGHT*2/3) / 2 + gravity.HEIGHT * 1/3 + (gravity.HEIGHT / 3) / 2;
    this.ui.levels = new gravity.MenuButton('LEVELS').setPosition(X, Y).setSize(W, H);
    this.layer.appendChild(this.ui.levels);
    goog.events.listen(this.ui.levels, lime.Button.Event.CLICK, function() {
        this.select(true);
    }, false, this);

    
    // LEVELS SCREEN
    this.levels = new lime.Layer().setPosition(0, gravity.HEIGHT);
    this.layer.appendChild(this.levels);

		
	var r, c, p = [], s = 0;
	F = gravity.HEIGHT / 10;
	W = gravity.WIDTH/4;
	H = (gravity.HEIGHT/2) / 2;
	for (i in gravity.levels) {
		//
		if (i == 0) {
			p.push( gravity.levels[i].galaxy );
		}
		else {
			if (gravity.levels[i].galaxy != gravity.levels[i-1].galaxy) {
				p.push( gravity.levels[i].galaxy );
				s = i;
			}
		}
		
		r = Math.floor((i - s) / 4);
		c = i - s - r * 4;
		
		X  = gravity.WIDTH/2 - 2*W + c*W;
		X += W/2 + (p.length-1)*gravity.WIDTH;		
		Y  = gravity.HEIGHT*1/3 + r*H;
			
		var num = parseInt(i) + 1;	
		
		var btn;
		if (gravity.levels[i].playable(i)) {
			btn = new gravity.MenuButton('' + num);
		}
		else {
			btn = new gravity.MenuButton('&L');
		}
		btn.setSize(W * 8/10, H * 8/10).setPosition(X, Y);
		this.levels.appendChild(btn);
		
		var num = parseInt(i) - 1;	
		var available = (parseInt(i) == 0) ? true : util.storage.get('level.' + num + '.points');
		
		if (available && gravity.levels[i].playable(i)) {
			//
			goog.events.listen(btn, lime.Button.Event.CLICK, function() {
				gravity.loadGame(this);
			}, false, i);
				
			var stars = (gravity.levels[i].goodies.length + gravity.levels[i].planets.length / 0.75) * gravity.goodie / 3;
			stars = Math.floor( util.storage.get('level.' + parseInt(i) + '.points') / stars );
			stars = util.misc.bound(stars, 0, 3);
				
			for (j = 0; j < stars; j++) {
				//
				var star = new lime.Sprite().setSize(H * 8/50, H * 8/50).setPosition(W * 8/20 - W * 8/100, H * 8/20 - (j+1.2) * W * 8/100).setFill('assets/star.png');
				btn.appendChild(star);
			}
		}
		else {
			//
			if (!gravity.levels[i].playable(i)) {
				//
				goog.events.listen(btn, lime.Button.Event.CLICK, function() {
					//
					gravity.director.pauseClassFactory = gravity.BuyScene;
					gravity.director.setPaused( true );
					
					lime.updateDirtyObjects();
				}, false, this);
			}
			
			if (!gravity.levels[i].playable(i) || !available) {
				//
				btn.setColor('#AAA');
			}
		}
	}
	
	for (i = 0; i < p.length; i++) {
		for (j = 0; j < p.length; j++) {
			//
			X = i*gravity.WIDTH + (j+0.5) * ((gravity.WIDTH/p.length) * 8/10) + (j*2+1)*(gravity.WIDTH/p.length) * 1/10;
			Y = gravity.HEIGHT * 1/10;
			var btn = new gravity.MenuButton('' + p[j]).setSize((gravity.WIDTH/p.length) * 8/10, H * 6/10).setPosition(X, Y);
			this.levels.appendChild(btn);
			
			goog.events.listen(btn, lime.Button.Event.CLICK, function() {
				//
				gravity.menu.layer.runAction(new lime.animation.MoveTo((this-1)*-1*gravity.WIDTH, -1*gravity.HEIGHT).enableOptimizations());
			}, false, j+1);
		}
	}

    // BACK BUTTON
	for (i = 0; i < p.length; i++) {
		//
		W = gravity.HEIGHT * 8/10;
		H = W / 4;
		X = i*gravity.WIDTH + gravity.WIDTH / 2;
		Y = gravity.HEIGHT * 2/3 + (gravity.HEIGHT / 3) / 2;
		var btn = new gravity.MenuButton('Back to Menu').setPosition(X, Y).setSize(W, H);
		this.levels.appendChild(btn);
		
		goog.events.listen(btn, lime.Button.Event.CLICK, function() {
			this.menu(true);
		}, false, this);
	}	
};
goog.inherits(gravity.MenuScene, lime.Scene);

gravity.MenuScene.prototype.menu = function(animate) {
    //
    if (animate)
        this.layer.runAction(new lime.animation.MoveTo(0, 0).enableOptimizations());
    else    
        this.layer.setPosition(0, 0);
};

gravity.MenuScene.prototype.select = function(animate) {
    //
    if (animate)
        this.layer.runAction(new lime.animation.MoveTo(0, -1 * gravity.HEIGHT).enableOptimizations());
    else
        this.layer.setPosition(0, -1 * gravity.HEIGHT);
};
