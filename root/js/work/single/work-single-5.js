$(document).ready(function(){
	// slider for project__slide area
	$('.project__slider__testimony_area').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplay: true,
		duration: 3000,

		// if custom prevArrow and nextArrow
		prevArrow: '<span class="btn_prev"><img src="/images/box_arrow_left.png" class="slide-arrow prev-arrow"></span>',
		nextArrow: '<span class="btn_next"><img src="/images/box_arrow_right.png" class="slide-arrow next-arrow"></span>'
	});

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
});