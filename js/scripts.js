$(document).ready(function() {
	
	/*
	*	INITIATE
	*/
	$("textarea").focus();
	
	var music = $("#music")[0];
	var noise = $("#noise")[0];
	
	var contentLength = $("textarea").val().length;
	var threshold = setThreshold(); 
	setVolumes();
	
	/***********************************************/
	
	// listen for content changes
	$("textarea").keyup(function() {
		contentLength = $("textarea").val().length;
		setVolumes();
	});
	$("textarea").keydown(function() {
		contentLength = $("textarea").val().length;
		setVolumes();
	});
	$("textarea").change(function() {
		contentLength = $("textarea").val().length;
		setVolumes();
	});
	
	// listen for window size changes
	$(window).resize(function() {
		setVolumes();
	});
		
	// limit when amount of content can still just be perceived (~chars per screen size * 10)
	function setThreshold() {
		var fontSize = $("textarea").css("font-size");
		var lineHeight = $("textarea").css("line-height");
		return ( $(window).width() / ( fontSize.replace("px","") / 3 ) ) * ( $(window).height() / lineHeight.replace("px","") ) * 10;
	}

	// set content feedback volumes
	function setVolumes() {
	
		// if no content
		if(contentLength == 0) {
			// no sounds
			music.volume = 0;
			noise.volume = 0;
		}
		// if content
		else {
			
			// set threshold according to current window size
			threshold = setThreshold();
			
			// if up to screen-full of content
			if(contentLength < threshold/10) {
				// slowly introduce nice music
				music.volume = map(contentLength, 0, threshold/10, 0, 1);
				noise.volume = 0;
			}
			// if more content
			else {
				// start making noise and overpower music
				music.volume = map(contentLength, 0, threshold, 1, 0);
				noise.volume = map(contentLength, 0, threshold, 0, 1);
			}
		}
		
	}
	
	// number mapping function
	function map(number, in_min, in_max, out_min, out_max) {
	  return (number - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
	}

});
