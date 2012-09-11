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
		maxElements = 20,

		// create new element every at a specified interval
		intervalId = setInterval(
			function () {
				pos = getPos();
				
				frag = document.createElement('div');
				frag.className = "firefly";
				frag.id = "firefly" + i;
				frag.style.backgroundColor = 'hsl(' + Math.ceil((Math.random()*360)) + ', 100%, 50%)';
				frag.style.top = pos.top;
				frag.style.left = pos.left;
				document.body.appendChild(frag);
				i++;

				// stop once we added a certain number of fireflies
				if (i == maxElements) {
					clearInterval(intervalId);
				}
				
			}, 
			creationInterval
		);

	$('body').on('webkitAnimationIteration mozAnimationEnd msAnimationEnd oAnimationEnd animationiteration', '.firefly', function(e) {
		if (!e.originalEvent || e.originalEvent.animationName != 'bump' ) {
			return;
		}

		// move at each iteration
		var newPos = getPos('mouse'),
			newHue = Math.ceil((Math.random()*360)),
			newStyle = this.style;   

		newStyle.left = newPos.left;
		newStyle.top = newPos.top;
		newStyle.backgroundColor = 'hsl(' + newHue + ', 100%, 50%)';
		newStyle.boxShadow = 'hsl(' + newHue + ', 100%, 50%) 0 0 80px';

		this.style = newStyle;
	});

	$(document).on('mousemove mouseleave', function(e) {
		mousePos.left = e.pageX;
		mousePos.top = e.pageY;
	}); 

	// adjust maxWidth and maxHeight on resize
	$(window).on('resize', function() {
		maxHeight = window.innerHeight;
		maxWidth = window.innerWidth;
	});

}());