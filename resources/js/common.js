jQuery(function($) {

	function customResize(){
		if ( $(window).width() > 992 ) {
			h_hght = 30;
			$('#header').css({
				'top': h_hght,
				'background-color': 'transparent'
			});
		}else{
			h_hght = 0;
		}
		// липкая шапка + background
		var h_mrg = 0;
		var elem = $('#header');
		var top = $(this).scrollTop();

		if(top > h_hght){
			elem.css('top', h_mrg);
		}           

		$(window).scroll(function(){
			top = $(this).scrollTop();

			if (top+h_mrg < h_hght) {
				elem.css({
					'top': h_hght-top,
					'background-color': 'transparent'
				});
			} else {
				elem.css({
					'top': h_mrg,
					'background-color': '#222'
				});
			}
		});
	}customResize();

	$(window).resize(function(){
		customResize();
	});
	

	// 

	// Populate images from data attributes.
	var scrolled = $(window).scrollTop()
	$('.parallax').each(function(index) {
		var imageSrc = $(this).data('image-src')
		var imageHeight = $(this).data('height')
		$(this).css('background-image','url(' + imageSrc + ')')
		$(this).css('height', imageHeight)

	  // Adjust the background position.
	  var initY = $(this).offset().top
	  var height = $(this).height()
	  var diff = scrolled - initY
	  var ratio = Math.round((diff / height) * 100)
	  $(this).css('background-position','center ' + parseInt(-(ratio * 1.1)) + 'px')
	})

  // Attach scroll event to window. Calculate the scroll ratio of each element
  // and change the image position with that ratio.
  // https://codepen.io/lemagus/pen/RWxEYz
  $(window).scroll(function() {
	var scrolled = $(window).scrollTop()
	$('.parallax').each(function(index, element) {
		var initY = $(this).offset().top
		var height = $(this).height()
		var endY  = initY + $(this).height()

	  // Check if the element is in the viewport.
	  var visible = isInViewport(this)
	  if(visible) {
		var diff = scrolled - initY
		var ratio = Math.round((diff / height) * 100)
		$(this).css('background-position','center ' + parseInt(-(ratio * 1.1)) + 'px')
	  }
  })
  })

});

// Check if the element is in the viewport.
// http://www.hnldesign.nl/work/code/check-if-element-is-visible/
function isInViewport(node) {
  // Am I visible? Height and Width are not explicitly necessary in visibility
  // detection, the bottom, right, top and left are the essential checks. If an
  // image is 0x0, it is technically not visible, so it should not be marked as
  // such. That is why either width or height have to be > 0.
  var rect = node.getBoundingClientRect()
  return (
	(rect.height > 0 || rect.width > 0) &&
	rect.bottom >= 0 &&
	rect.right >= 0 &&
	rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
	rect.left <= (window.innerWidth || document.documentElement.clientWidth)
  )
}
