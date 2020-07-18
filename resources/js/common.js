$(window).on('load', function() {

	$(".loader_inner").fadeOut();
	$(".loader").delay(400).fadeOut("slow");

	// $(".top_text h1").animated("fadeInDown", "fadeOutUp");
	// $(".top_text p").animated("fadeInUp", "fadeOutDown");

});

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

		// SVG width & height
		var block = $('#services'),
			height = block.height(),
			winwidth = $(window).width();
		block.find('svg polygon').attr('points', '0,0 '+ (winwidth / 2)+','+ height+' '+winwidth+', 0');

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
		});
	});

	function isInViewport(node) {
	var rect = node.getBoundingClientRect()
	return (
		(rect.height > 0 || rect.width > 0) &&
		rect.bottom >= 0 &&
		rect.right >= 0 &&
		rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
		rect.left <= (window.innerWidth || document.documentElement.clientWidth)
		)
	}

	// MODALS
		

	$('.modal-link').on('click', function(){
		th    = $(this),
		id    = th.attr('href'),
		title = th.find('h4').text();

		servArray = th.data('serv'),
		servArrayOut = servArray.split(',');

		$(id).find('h2').text(title);
		$('.services-modal__item').remove();

		$.each(servArrayOut, function(k, v){

			out = '<div class="services-modal__item">'+ v +'</div>';
			$(id).find('.services-modal__list').append(out);
		}); 

		$.magnificPopup.open({
			items: {
				src: id,
				type: 'inline',
				fixedContentPos: true,
				preloader: false,
			}
		});

		return false;
	});



}); //Document.ready end
