goog.provide('gravity.HelpScene');

goog.require('lime.Scene');

gravity.HelpScene = function() {
    lime.Scene.call(this);
	
	var W, H, X, Y, F;

    var layer = new lime.Layer().setPosition(0, 0);
	this.domElement.style.cssText = 'background:rgba(255,255,255,.3)';

    
	// DIALOG
	W = gravity.WIDTH * 3/4;
	H = gravity.HEIGHT * 3/4;
	X = gravity.WIDTH * 0.5/4;
	Y = gravity.HEIGHT * 0.75/4;
    var dialog = new lime.RoundedRect().setAnchorPoint(0, 0).setSize(W, H).setPosition(X, Y)
        .setRadius(20).setFill(gravity.BACKGROUND).setStroke(4, gravity.FOREGROUND);
       
	this.W = W;
	this.H = H;
        
    // FUEL
	F = gravity.HEIGHT/30;
	X = F * 1.5;
	Y = F * 1.5;
    var label = new lime.Label().setText('Fuel Gauge').setFontColor(gravity.FOREGROUND).setFontSize(F)
        .setAnchorPoint(0, 0).setPosition(X, Y);
    dialog.appendChild(label);
    
    var arrow = new lime.Polygon().setPoints(F,-2*F, F+5,-2*F, 2*F,1.5*F).setPosition(0,0).setStroke(4, gravity.FOREGROUND);
    dialog.appendChild(arrow);
    
    // MENU
	F = gravity.HEIGHT/30;
	X = this.W * 0.75;
	Y = F * 1.5;
    var label = new lime.Label().setText('Menu').setFontColor(gravity.FOREGROUND).setFontSize(F)
        .setAnchorPoint(0, 0).setPosition(X, Y);
    dialog.appendChild(label);
    
    var arrow = new lime.Polygon().setPoints(this.W-4*F,-1.5*F-5, this.W-4*F+5,-1.5*F-5, this.W*0.85,2*F).setPosition(0,0).setStroke(4, gravity.FOREGROUND);
    dialog.appendChild(arrow);
    
    // HELP
	F = gravity.HEIGHT/30;
	X = this.W * 0.75;
	Y = F * 3;
    var label = new lime.Label().setText('Help').setFontColor(gravity.FOREGROUND).setFontSize(F)
        .setAnchorPoint(0, 0).setPosition(X, Y);
    dialog.appendChild(label);
    
    var arrow = new lime.Polygon().setPoints(this.W-0*F,-1.5*F-5, this.W-0*F+5,-1.5*F-5, this.W*0.85,3.5*F).setPosition(0,0).setStroke(4, gravity.FOREGROUND);
    dialog.appendChild(arrow);
    
    // RESTART
	F = gravity.HEIGHT/30;
	X = this.W * 0.75;
	Y = F * 4.5;
    var label = new lime.Label().setText('Restart').setFontColor(gravity.FOREGROUND).setFontSize(F)
        .setAnchorPoint(0, 0).setPosition(X, Y);
    dialog.appendChild(label);
    
    var arrow = new lime.Polygon().setPoints(this.W+4*F,-1.5*F-5, this.W+4*F+5,-1.5*F-5, this.W*0.85,5*F).setPosition(0,0).setStroke(4, gravity.FOREGROUND);
    dialog.appendChild(arrow);
    
	
    // SHIP
	F = gravity.HEIGHT/30;
	X = F * 1.5;
	Y = F * 4.5;
    var label = new lime.Label().setText('Your Ship').setFontColor(gravity.FOREGROUND).setFontSize(F)
        .setAnchorPoint(0, 0).setPosition(X, Y);
    dialog.appendChild(label);
    
    var ship = new gravity.Ship().setAnchorPoint(0, 0).setPosition(X + 0.5*F, Y + 3*F);
	dialog.appendChild(ship);
	
	// GOODIE
	F = gravity.HEIGHT/30;
	X = F * 8;
	Y = F * 4.5;
    var label = new lime.Label().setText('Resource').setFontColor(gravity.FOREGROUND).setFontSize(F)
        .setAnchorPoint(0, 0).setPosition(X, Y);
    dialog.appendChild(label);
    
    var goodie = new gravity.Goodie().setAnchorPoint(0.5, 0.5).setPosition(X + 1.5*F, Y + 4*F);
	dialog.appendChild(goodie);
    
    // PLANETS
	F = gravity.HEIGHT/30;
	X = F * 15.5;
	Y = F * 4.5;
    var label = new lime.Label().setText('Planet').setFontColor(gravity.FOREGROUND).setFontSize(F)
        .setAnchorPoint(0, 0).setPosition(X, Y);
    dialog.appendChild(label);
    
    var planet = new gravity.Planet(40).setAnchorPoint(0.5, 0.5).setPosition(X + 1.5*F, Y + 4*F);
	dialog.appendChild(planet);
    
    // WORM HOLE
	F = gravity.HEIGHT/30;
	X = F * 22;
	Y = F * 4.5;
    var label = new lime.Label().setText('Worm Hole').setFontColor(gravity.FOREGROUND).setFontSize(F)
        .setAnchorPoint(0, 0).setPosition(X, Y);
    dialog.appendChild(label);
    
    var wormhole = new gravity.Target().setAnchorPoint(0.5, 0.5).setPosition(X + 2*F, Y + 4*F);
	dialog.appendChild(wormhole);
    
	
    // INSTRUCTIONS    
    F = gravity.HEIGHT/25;
	X = F * 1.5;
	Y = F * 1.5;
    
	var label = new lime.Label().setText('1. Touch to launch your ship').setFontColor(gravity.FOREGROUND).setFontSize(F)
        .setAnchorPoint(0, 0).setPosition(X, this.H - F - Y*4);
    dialog.appendChild(label);
    
    var label = new lime.Label().setText('2. Touch again to fire boosters').setFontColor(gravity.FOREGROUND).setFontSize(F)
        .setAnchorPoint(0, 0).setPosition(X, this.H - F - Y*3);
    dialog.appendChild(label);
    
    var label = new lime.Label().setText('3. Collect resources around planets').setFontColor(gravity.FOREGROUND).setFontSize(F)
        .setAnchorPoint(0, 0).setPosition(X, this.H - F - Y*2);
    dialog.appendChild(label);
    
    var label = new lime.Label().setText('4. Navigate your ship to the wormholes').setFontColor(gravity.FOREGROUND).setFontSize(F)
        .setAnchorPoint(0, 0).setPosition(X, this.H - F - Y*1);
    dialog.appendChild(label);
    
    this.appendChild(dialog);
    
    // RESUME
    //goog.events.listen(this, lime.Button.Event.CLICK, function(e) {
	goog.events.listen(this, ['click', 'touchend'], function(e) {
		gravity.director.setPaused( false );
		//gravity.game.paused = false;
		//gravity.director.popScene();
    }, false, this);
};
goog.inherits(gravity.HelpScene, lime.Scene);

//
gravity.OrientationScene = function() {
    lime.Scene.call(this);
	
	var W, H, X, Y, F;

    var layer = new lime.Layer().setPosition(0, 0);
	this.domElement.style.cssText = 'background:rgba(255,255,255,.5)';

    
	// DIALOG
	W = gravity.WIDTH * 8/10;
	H = gravity.HEIGHT * 1/4;
	X = gravity.WIDTH * 1/2;
	Y = gravity.HEIGHT * 1/2;
    var dialog = new lime.RoundedRect().setAnchorPoint(0.5, 0.5).setSize(W, H).setPosition(X, Y)
        .setRadius(20).setFill(gravity.BACKGROUND).setStroke(4, gravity.FOREGROUND);
       
	this.W = W;
	this.H = H;
        
    // FUEL
	F = gravity.HEIGHT/20;
	X = 0;
	Y = this.H/4;
    var label = new lime.Label().setText('Please rotate your device in landscape mode!').setFontColor(gravity.FOREGROUND).setFontSize(F)
        .setAnchorPoint(0.5, 0.5).setPosition(X, Y).setSize(this.W * 2/3, this.H);
    dialog.appendChild(label);
	
	this.appendChild(dialog);
};
goog.inherits(gravity.OrientationScene, lime.Scene);
