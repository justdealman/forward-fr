function setImgCover(e) {
	e.each(function() {
		$(this).parent().css({
			'background-image': 'url("'+$(this).attr('src')+'")',
			'background-repeat': 'no-repeat',
			'background-position': 'center center',
			'background-size': 'cover'
		});
	});
}
function setImgContain(e) {
	e.each(function() {
		$(this).parent().css({
			'background-image': 'url("'+$(this).attr('src')+'")',
			'background-repeat': 'no-repeat',
			'background-position': 'center center',
			'background-size': 'contain'
		});
	});
}
function setRatio() {
	$('[data-ratio]').each(function() {
		var t = $(this).find('.scale');
		var r = $(this).attr('data-ratio');
		t.outerHeight(t.outerWidth()*r);
	});
}
$(function() {
	setImgCover($('.img-cover'));
	setImgContain($('.img-contain'));
	var isMobile = false;
	var justSwitched = false;
	function detectDevice() {
		var temp = isMobile;
		if ( Modernizr.mq('(max-width:1199px)') ) {
			isMobile = true;
		} else {
			isMobile = false;
		}
		if ( temp == isMobile ) {
			justSwitched = false;
		} else {
			justSwitched = true;
		}
	}
	
	$('.shops-slider').slick({
		slidesToShow: 4,
		slidesToScroll: 4,
		arrows: true,
		dots: false,
		infinite: true,
		cssEase: 'ease',
		speed: 500,
		responsive: [
			{
				breakpoint: 999,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2,
					adaptiveHeight: true
				}
			}, {
				breakpoint: 639,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1
				}
			}
		]
	});
	$('.collections-slider').slick({
		slidesToShow: 4,
		slidesToScroll: 4,
		arrows: true,
		dots: false,
		infinite: true,
		cssEase: 'ease',
		speed: 500,
		responsive: [
			{
				breakpoint: 999,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2,
				}
			}, {
				breakpoint: 639,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1
				}
			}
		]
	});
	$('.video-slider').slick({
		slidesToShow: 3,
		slidesToScroll: 3,
		arrows: true,
		dots: false,
		infinite: true,
		cssEase: 'ease',
		speed: 500,
		responsive: [
			{
				breakpoint: 999,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2,
				}
			}, {
				breakpoint: 639,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1
				}
			}
		]
	});
	
	setTimeout(function() {
		$('.welcome-animated').addClass('welcome-animated_start')
	}, 300);
	
	function startApp() {
		detectDevice();
		if ( justSwitched ) {
			if ( isMobile ) {
				$('.footer-form__row').each(function() {
					$(this).find('[data-agreement]').detach().insertBefore($(this).find('[data-send]'));
				});
			} else {
				$('.footer-form__row').each(function() {
					$(this).find('[data-agreement]').detach().insertAfter($(this).find('[data-send]'));
				});
			}
		}
		setRatio();
		if ( $('.menu').hasClass('is-opened') ) {
			menuOpen();
		}
	}
	startApp();
	var lastWidth = $(window).width();
	$(window).on('resize', _.debounce(function() {
		if ( $(window).width() != lastWidth ) {
			startApp();
			lastWidth = $(window).width();
		}
	}, 100));
	
	$('.welcome-scroll').on('click', function() {
		$('html, body').stop().animate({
			scrollTop: $('.steps').offset().top
		}, 500);
	});
	
	$(window).on('scroll', function() {
		$('[data-animated]').each(function() {
			var t = $(this);
			if ( $(document).scrollTop() > t.offset().top-$(window).height()/1*1 && !t.hasClass('is-animated') ) {
				if ( !isMobile && $(this).is('[data-delay]') ) {
					var delay = 300+parseInt($(this).attr('data-delay'));
				} else {
					var delay = 300;
				}
				setTimeout(function() {
					t.addClass('is-animated');
				}, delay);
			}
		});
	});
	$(window).trigger('scroll');
	
	$('input[type="checkbox"]').uniform();
	
	$('[data-open]').on('click', function(e) {
		e.preventDefault();
		if ( $('.menu').hasClass('is-opened') ) {
			menuClose();
		}
		$(this).addClass('is-active');
		var t = $('[data-target="'+$(this).attr('data-open')+'"]');
		t.siblings('[data-target]').removeClass('is-opened is-active');
		$('.fade-bg').addClass('is-opened');
		t.addClass('is-opened');
		var h = $(window).scrollTop()+($(window).height()-t.outerHeight())/2;
		if ( !isMobile ) {
			var diff = 30;
		} else {
			var diff = 20;
		}
		if ( h < $(window).scrollTop()+(diff*2) ) {
			h = $(window).scrollTop()+diff;
		}
		t.css({
			'top': h+'px'
		}).addClass('is-active').siblings('[data-target]').removeClass('is-active');
	});
	$('[data-target] .modal--close, .fade-bg').on('click', function(e) {
		e.preventDefault();
		$('[data-target], .fade-bg').removeClass('is-opened');
		$('[data-open]').removeClass('is-active');
		menuClose();
	});

	function menuOpen() {
		setMenuWidth();
		$('.menu, .fade-bg').addClass('is-opened');
	}
	function menuClose() {
		$('.menu, .fade-bg').removeClass('is-opened');
	}

	$('.menu-open').on('click', function() {
		menuOpen();
	});
	$('.menu--close').on('click', function() {
		menuClose();
	});

	$('input, textarea').each(function() {
		$(this).data('holder', $(this).attr('placeholder'));
		$(this).focusin(function() {
			$(this).attr('placeholder', '');
		});
		$(this).focusout(function() {
			$(this).attr('placeholder', $(this).data('holder'));
		});
	});
});