goog.provide('gravity.Smoke');

goog.require('lime.Circle');

gravity.Smoke = function() {
    lime.Circle.call(this);

    var WIDTH = 10,
        HEIGHT = 10,
        BORDER = 2,
        SPEED = 20;
    
    this.setSize(WIDTH, HEIGHT).setAnchorPoint(.5, .5); //.setStroke(BORDER, gravity.FOREGROUND);
	this.setFill('assets/smoke.png');
    
	var anim = new lime.animation.FadeTo(0).setDuration(.25);
    this.runAction( anim );
    
    goog.events.listen(anim, lime.animation.Event.STOP, function() {
		this.getParent().removeChild(this);
	}, false, this);
};
goog.inherits(gravity.Smoke, lime.Circle);
