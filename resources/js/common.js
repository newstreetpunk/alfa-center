jQuery(function($) {
	
	var h_hght = 30;
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
				'background-color': '#000'
			});
		}
	});

});
