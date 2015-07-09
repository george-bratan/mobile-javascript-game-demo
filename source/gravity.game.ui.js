goog.provide('gravity.GameUI');

goog.require('lime.Button');
goog.require('lime.RoundedRect');
goog.require('lime.Polygon');

gravity.GameButton = function(text) {
    lime.Button.call(this, this.makeState_(false, text), this.makeState_(true, text));
        
    this.setAnchorPoint(0, 0);
};
goog.inherits(gravity.GameButton, lime.Button);

 
gravity.GameButton.prototype.makeState_ = function(up, text) {
    //
	var W, H, F, B, R;
	
	B = 3;
	F = gravity.HEIGHT / 9;
	W = F * 1.1;
	H = F * 1.1;
	R = F/6;
	
	this.W = W;
	this.H = H;
        
    if (up) {
        gravity.swap();
    }    
        
    var state = new lime.RoundedRect().setAnchorPoint(0, 0).setSize(W, H).setRadius(R).setFill(gravity.BACKGROUND);
    
    if (true)
        state.setStroke(B, gravity.FOREGROUND); 
    
	if (text == '&R') {
		//
		state.circ = new lime.Circle().setSize(W*2/3, H*2/3).setAnchorPoint(0.5, 0.5).setPosition(W/2, H/2).setStroke(B*2, gravity.FOREGROUND);
		state.appendChild(state.circ);    
			
		state.clip = new lime.Polygon().setPoints(2*B,W/4,W/2,H/2,2*B,H-2*B).setPosition(0,0).setFill(gravity.BACKGROUND); 
		state.appendChild(state.clip);
		
		state.head = new lime.Polygon().setPoints(H*1.5/10,H*6/10, H*4/10,H*6/10, H*1.5/10,H*8.5/10).setPosition(B,B).setFill(gravity.FOREGROUND).setStroke(B, gravity.FOREGROUND); 
		state.appendChild(state.head);
	}
	else {
		//
		state.label = new lime.Label().setAlign('center').setText(text).setFontColor(gravity.FOREGROUND).setAnchorPoint(0, 0).setFontSize(F).setSize(W, H);
		state.appendChild(state.label);
	}
     
    if (up) {
        gravity.swap();
    }
    
    return state;
};

gravity.GameButton.prototype.autoPos = function(ord_x, ord_y) {
	//
	var
		X = ord_x * this.W * 1.3,
		Y = ord_y * this.H * 1.2 + this.H * 0.2;
	
	if (X < 0)
		X = gravity.WIDTH + X;
	
	if (Y < 0)
		Y = gravity.HEIGHT + Y;
		
		
	this.setPosition(X, Y);
	
	return this;
}

gravity.GameButton.prototype.setText = function(value) {
    //
    this.text_ = value;
    return this;
};

gravity.GameButton.prototype.getText = function() {
    return this.text_;
};


// ***************************************************************************88

gravity.FuelGauge = function() {
    lime.RoundedRect.call(this);

	var W, H, R, B;
	
	W = gravity.WIDTH / 4;
	H = gravity.HEIGHT / 9;
	R = H/10;
	B = 3;
        
    this.setSize(W, H).setRadius(R).setStroke(B, gravity.FOREGROUND);
    this.setAnchorPoint(0, 0);

    H -= 2 * B;
    W -= 2 * B;

    var progress = new lime.RoundedRect().setRadius(B).setSize(W/2, H).setFill('#E01B6A').
        setAnchorPoint(0, 0).setPosition(B, B);
    this.appendChild(progress);

    this.progress = progress;
};
goog.inherits(gravity.FuelGauge, lime.RoundedRect);

gravity.FuelGauge.prototype.setValue = function(value, animate) {
    //
    this.value_ = value;
    
    if (animate)
        this.progress.runAction(new lime.animation.Resize(this.getSize().width * value - 2 * this.getRadius(), this.progress.getSize().height).setDuration(1));
    else
        this.progress.setSize(this.getSize().width * value - 2 * this.getRadius(), this.progress.getSize().height);
    
    return this;
};

gravity.FuelGauge.prototype.getValue = function() {
    return this.value_;
};


