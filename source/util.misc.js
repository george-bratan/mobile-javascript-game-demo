goog.provide('util.misc');
goog.provide('util.window');


util.misc.bound = function(v, min, max) {
	//
	if (v < min)
		return min;
	
	if (v > max)
		return max;
	
	return v;
}

util.window.size = function(def_w, def_h) {
	//
	var
		win_w = def_w ? def_w : 1024,
		win_h = def_h ? def_h : 768;
		
	if (document.body && document.body.offsetWidth) {
		//
		win_w = document.body.offsetWidth;
		win_h = document.body.offsetHeight;
	}
	if (document.compatMode == 'CSS1Compat' && document.documentElement && document.documentElement.offsetWidth ) {
		//
		win_w = document.documentElement.offsetWidth;
		win_h = document.documentElement.offsetHeight;
	}
	if (window.innerWidth && window.innerHeight) {
		//
		win_w = window.innerWidth;
		win_h = window.innerHeight;
	}
	
	return {
		width: win_w,
		height: win_h
	};
}

