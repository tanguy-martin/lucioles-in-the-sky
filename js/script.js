(function () {
	var frag,
		i = 0,
		maxHeight = window.innerHeight,
		maxWidth = window.innerWidth,
		mousePos = {},
		/**
		 * Return a random position for the elements, within the screen.
		 * 
		 * @return {Object}
		**/
		getPos = function (type) {

			var type = type || 'random';

			if (type == 'mouse' 
				&& mousePos.left > 60 
				&& mousePos.left < maxWidth - 60 
				&& mousePos.top > 80 
				&& mousePos.top < maxHeight - 80) {

				return {
					left: mousePos.left + 'px',
					top: mousePos.top + 'px'
				};

			} else {

				return {
					left: (Math.random() * (maxWidth - 60)) + 'px',
					top: (Math.random() * (maxHeight - 80)) + 'px'
				};
			}
		},
		pos,
		creationInterval = 100,
		maxElements = 30;

	// create new element every at a specified interval
	var intervalId = setInterval(function () {
		pos = getPos();
		
		frag = document.createElement('div');
		frag.className = "enigma";
		frag.id = "enigma" + i;
		frag.style.backgroundColor = 'hsl(' + Math.ceil((Math.random()*360)) + ', 100%, 50%)';
		frag.style.top = pos.top;
		frag.style.left = pos.left;
		document.body.appendChild(frag);
		i++;

		if (i == maxElements) {
			clearInterval(intervalId);
		}
		
	}, creationInterval),
		/**
		 * Just a simple jQuery cache, 
		 * the cache id is the id attribute of the DOM element
		 *
		**/
		_$ = (function () {

			var arr = {};

			return function (el) {
				if (!arr[el.id]) {
					arr[el.id] = $(el);
				}
				return arr[el.id];
			};

		}());

	$('body').on('webkitAnimationIteration mozAnimationEnd msAnimationEnd oAnimationEnd animationiteration', '.enigma', function(e) {
		// move at each iteration
		var newPos = getPos('mouse');
		_$(this).css({
			left: newPos.left,
			top: newPos.top,
			backgroundColor: 'hsl(' + Math.ceil((Math.random()*360)) + ', 100%, 50%)'
		});
	});
	$(document).on('mousemove', function(e) {
	    mousePos.left = e.pageX;
	    mousePos.top = e.pageY;
	}); 
	(function(window) {
		// adjust maxWidth and maxHeight on resize
		$(window).on('resize', function() {
			maxHeight = window.innerHeight;
			maxWidth = window.innerWidth;
		});
	}(window));	

}());