goog.provide('gravity.EndScene');

goog.require('gravity.MenuButton');

goog.require('lime.Scene');
//goog.require('lime.RoundedRect');
//goog.require('lime.Label');
goog.require('lime.Layer');

gravity.EndScene = function() {
    lime.Scene.call(this);
	
	var W, H, X, Y, F;
	
    var layer = new lime.Layer().setPosition(0, 0);
	this.domElement.style.cssText = 'background:rgba(255,255,255,.3)';
    
    // DIALOG
	W = gravity.HEIGHT * 3/3;
	H = gravity.HEIGHT * 2/3;
	X = gravity.WIDTH/2;
	Y = (gravity.HEIGHT-H)/2;
    var dialog = new lime.RoundedRect().setRadius(20).setSize(W, H)
		.setAnchorPoint(.5, 0).setPosition(X, Y)
		.setStroke(3, gravity.FOREGROUND).setFill(gravity.BACKGROUND);
	this.appendChild(dialog);
	
	this.W = W;
	this.H = H;
	
	// TITLE
	F = gravity.HEIGHT / 10;
	X = 0;
	Y = F;
	var title = new lime.Label().setText('Level complete!').setFontColor(gravity.FOREGROUND).setFontSize(F).setPosition(X, Y);
	dialog.appendChild(title);
	
	// BUTTON RELOAD/NEXT
	W = this.W * 7/10;
	H = W / 4;
	X = 0;
	Y = this.H * 1.4/3;
	var btn = new gravity.MenuButton().setText('Next Level').setSize(W, H).setPosition(X, Y);
	dialog.appendChild(btn);

	if (gravity.game.points <= 0) {
		title.setText('Your ship crashed!');
		btn.setText('Try Again');
	}
	else if (gravity.game.level == gravity.levels.length-1) {
		title.setText('Your finished!');
		btn.setText('Restart');
	}
	
	goog.events.listen(btn, lime.Button.Event.CLICK, function() {
		gravity.director.setPaused( false );
		gravity.loadGame(gravity.game.points ? parseInt(gravity.game.level)+1 : gravity.game.level);
	}, false, this);


	// BUTTON MENU
	W = this.W * 7/10;
	H = W / 4;
	X = 0;
	Y = this.H * 2.4/3;
	var btn = new gravity.MenuButton().setText('Main Menu').setSize(W, H).setPosition(X, Y);
	dialog.appendChild(btn);
	
	//goog.events.listen(btn, lime.Button.Event.CLICK, function() {
	goog.events.listen(btn, ['click', 'touchend'], function() {
		gravity.director.setPaused( false );
		gravity.loadMenu(true);
	});
};
goog.inherits(gravity.EndScene, lime.Scene);

