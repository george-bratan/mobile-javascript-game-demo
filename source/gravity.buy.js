goog.provide('gravity.BuyScene');

//goog.require('gravity.MenuButton');

goog.require('lime.Scene');
//goog.require('lime.RoundedRect');
//goog.require('lime.Label');
goog.require('lime.Layer');

gravity.BuyScene = function() {
    lime.Scene.call(this);
	
	var W, H, X, Y, F;
	
    var layer = new lime.Layer().setPosition(0, 0);
	this.domElement.style.cssText = 'background:rgba(255,255,255,.5)';
    
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
	
	dialog.ui = {};
	
	// TITLE
	F = gravity.HEIGHT / 10;
	W = this.W * 9.2/10;
	H = W / 4;
	X = 0;
	Y = F*1.5;
	dialog.ui.title = new lime.Label().setText('Retrieving product details ...')
		.setFontColor(gravity.FOREGROUND).setFontSize(F/1.5).setPosition(X, Y).setSize(W, H);
	dialog.appendChild(dialog.ui.title);
	
	// BUTTON BUY
	W = this.W * 7/10;
	H = W / 4;
	X = 0;
	Y = this.H * 1.4/3;
	dialog.ui.buy = new gravity.MenuButton().setText('...').setSize(W, H).setPosition(X, Y);
	dialog.appendChild(dialog.ui.buy);

	// BUTTON BACK
	W = this.W * 7/10;
	H = W / 4;
	X = 0;
	Y = this.H * 2.4/3;
	dialog.ui.back = new gravity.MenuButton().setText('Cancel').setSize(W, H).setPosition(X, Y);
	dialog.appendChild(dialog.ui.back);
	
	goog.events.listen(dialog.ui.back, ['click', 'touchend'], function() {
		//
		gravity.director.setPaused( false );
		//
	});
	
	this.dialog = dialog;
	
	// SETUP PURCHASE DELEGATES
	delegate_purchase(
		gravity.appid,
		function(pid, title, description, price) {
			//
			var dialog = gravity.director.pauseScene.dialog;
		   
			if (!dialog) 
				return;
		   
			dialog.ui.title.setText('If you enjoyed the game please support the developers!')
			dialog.ui.buy.setText('Buy for ' + price + '');
			lime.updateDirtyObjects();
		   
			goog.events.listen(dialog.ui.buy, lime.Button.Event.CLICK, function() {
				//
				gravity.purchase();
				gravity.director.setPaused( false );
				//
			}, false, this);
		},
		function(pid) {
			//
			var dialog = gravity.director.pauseScene.dialog;
		   
			if (!dialog) 
				return;
		   
			dialog.ui.title.setText('Cannot fetch product information.');
			lime.updateDirtyObjects();
		}
	);
};
goog.inherits(gravity.BuyScene, lime.Scene);

