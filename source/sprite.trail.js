goog.provide('gravity.Trail');

goog.require('lime.Circle');

gravity.Trail = function(highlight) {
    lime.Circle.call(this);

    var WIDTH = 1,
        HEIGHT = 1,
        BORDER = 1;
    
	var
		color = highlight ? '#0F0' : gravity.FOREGROUND;
	
    this.setSize(WIDTH, HEIGHT).setAnchorPoint(.5, .5).setStroke(BORDER, color).setOpacity(0.3);
};
goog.inherits(gravity.Trail, lime.Circle);
