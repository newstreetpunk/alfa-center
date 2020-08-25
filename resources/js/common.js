jQuery(function($) {

	//E-mail Ajax Send
	$("form").submit(function() { //Change

		Data = new Date();
		Year = Data.getFullYear();
		Month = Data.getMonth() + 1;
		Day = Data.getDate();
		Hour = Data.getHours();
		Min = Data.getMinutes();
		Sec = Data.getSeconds();

		if (Month < 10) {
			Month = '0'+Month;
		}else{
			Month = Month;
		}

		var th = $(this);
		var date = th.find('#date');
		date.val(Day +'.'+ Month +'.'+ Year +' '+ Hour +':'+ Min +':'+ Sec);
		var btnSubmit = th.find('input[type="submit"]');
		btnSubmit.attr("disabled", true);
		var url = window.location.href;
		var replUrl = url.replace('?', '&');
		$.ajax({
			type: "POST",
			url: "/mail.php", //Change
			data: th.serialize() +'&referer=' + replUrl
		}).done(function( data ) {
			// console.log( "success data:", data );
			setTimeout(function() {
				$.magnificPopup.close();
				if(data == 'OK'){
					th.trigger("reset");
					swal({
						title: "Спасибо!",
						text: "Ваше сообщение успешно отправлено. В скором времени мы с Вами свяжемся.",
						icon: "success",
						button: false,
                		timer: 3000
					});
				}else{
					swal({
						title: "Ошибка :(",
						text: "Что-то пошло не так. Перезагрузите страницу и попробуйте снова.",
						icon: "error",
						button: false,
                		timer: 3000
					});
				}
				btnSubmit.removeAttr("disabled");
			}, 1000);
		}).fail(function() {
			setTimeout(function() {
				$.magnificPopup.close();
				swal({
					title: "Ошибка :(",
					text: "Что-то пошло не так. Перезагрузите страницу и попробуйте снова.",
					icon: "error",
					button: false,
                	timer: 3000
				});
				btnSubmit.removeAttr("disabled");
			}, 1000);
		});
		return false;
	});

	$('h1').animated('fadeInDown', 'fadeInDown');

	$('.banner__subtitle, section h2, .services-block, .callback-section, section .sect-subtitle, .btn-wrap, .brands')
	.animated('fadeInUp', 'fadeInUp');

	$('.header__phone, .banner__discount-list, .advantages-item:nth-child(odd)')
	.animated('fadeInLeft', 'fadeInLeft');

	$('.header__address, .banner__form, .advantages-item:nth-child(even)')
	.animated('fadeInRight', 'fadeInRight');


	$('.reviews__block').slick({
		infinite: true,
		slidesToShow: 3,
		slidesToScroll: 1,
		dots: true,
		arrows: false,
		adaptiveHeight: true,
		responsive: [
		{
			breakpoint: 992,
			settings: {
				slidesToShow: 2,
			}
		},
		{
			breakpoint: 768,
			settings: {
				slidesToShow: 1,
			}
		},
		]
	});


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
			elem.css({
				'top': h_mrg,
				'background-color': '#222'
			});
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

	// SVG width & height
	function svgDetect(){

		var block = $('#services'),
			height = block.height(),
			winwidth = $(window).width();
		block.find('svg polygon').attr('points', '0,0 '+ (winwidth / 2)+','+ height+' '+winwidth+', 0');

	}svgDetect();

	function servScroll(){
		if ( $(window).width() < 768 ) {
			$('html, body').animate({
				scrollTop: $(".sub-services").offset().top - 80  // класс объекта к которому приезжаем
			}, 600);
		}
	}

	$(window).resize(function(){
		customResize();
		svgDetect();
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
	
	// Услуги 

	$('.services-item').on('click', function(){

		th           = $(this),
		dir          = th.attr('href'),
		servArray    = th.data('serv'),
		servArrayOut = servArray.split(','),
		elem         = $('.sub-services');

		// itemPos(th, elem);

		if ( th.hasClass('active') ) {
			th.removeClass('active');
			$('.sub-services').slideUp();
			$('.sub-services__item').remove();
		}else{
			$(this).closest('.services').find('.loader').show();
			$('.services-item').removeClass('active');

			setTimeout(function(){
				$('.sub-services__item').remove();

				$.each(servArrayOut, function(k, v){

					out = '\
					<div class="sub-services__item">\
					<div class="sub-services__item--img lazyload" style="background-image: url(img/ajax-loader.gif);" data-src-background="img/'+ dir +'/'+ k +'.jpg"></div>\
					<div class="sub-services__item--info">\
					<h5>'+ v +'</h5>\
					<a href="#services_modal" class="btn modal-link" onclick="modalServ(this); return false;">Узнать цену</a>\
					</div>\
					</div>\
					';
					$('.sub-services').append(out);

				});

				$('.sub-services').slideDown();
				$('.sub-services__item').animated('fadeInUp', 'fadeInUp');
				$('.lazyload').lazyload();
				servScroll();
				$('.services .loader').hide();
				th.addClass('active');

			}, 1000)
		}

		return false;

	});

	// MODALS

	$('.modal-link').click(function(){

		let id = $(this).attr('href');

		$.magnificPopup.open({

			items: {
				src: id,
				type: 'inline',
				fixedContentPos: true,
				modal: true,
				preloader: false
			}
		});

		return false;

	});

	$('a[href="#privacy-policy"]').on('click', function(){

		$('.overlay').show();
		$('.privacy-wrap').show();
		$('html').css({
			'margin-right': '17px',
			'overflow': 'hidden'
		});

		return false;
	});

	$('.overlay, .privacy-close').on('click', function(){
		$('.overlay').hide();
		$('.privacy-wrap').hide();
		$('html').removeAttr('style');
	});

	// LazyLoad

	$('.lazyload').lazyload();

	setTimeout(function(){
		$('.scrollto--arrow').css('opacity', 1);
	}, 1000)

}); //Document.ready end
