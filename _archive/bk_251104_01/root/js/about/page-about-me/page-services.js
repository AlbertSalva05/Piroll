// script starts here
$(document).ready(function(){

	// slider for testimony area
	$('.slider__testimony_area').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplay: true,
		dots: true,
		duration: 3000,

		// if custom prevArrow and nextArrow
		prevArrow: '<span class="btn_prev"><img src="/images/slick_prev.png" class="slide-arrow prev-arrow"></span>',
		nextArrow: '<span class="btn_next"><img src="/images/slick_next.png" class="slide-arrow next-arrow"></span>'
	});

	// slider for logo area
	$('.slider__logo__area').slick({
		slidesToShow: 5,
		slidesToScroll: 1,
		autoplay: true,
		dots: false,
		duration: 1000,
		autoplaySpeed: 1,
		speed: 1000,
		infinite: true,
		cssEase: 'linear',
		arrows: false,
		responsive: [
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 5,
					slidesToScroll: 1,
				},
			},
			{
				breakpoint: 767,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					arrows: false,
				},
			}
		]
	});
});