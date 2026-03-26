// script starts here
$(document).ready(function(){

	// initialization of aos animation
	AOS.init({
		// uncomment this part if you want to the animation to occur once
		// once: true,
		duration: 1000
	});

	// trigger of menu button
	$(".menuBtn").on("click", function() {
		$(".header__menu__bar").addClass("active");
		$('html').css('overflow-y', 'hidden');
	});

	// trigger close button
	$(".closeBtn").on("click", function() {
		$(".header__menu__bar").removeClass("active");
		$('html').css('overflow-y', 'auto');
	});
});


$(window).on("scroll", function() {
	if ($(this).scrollTop() > 0) {
		$("header").addClass("scrolled");
	} else {
		$("header").removeClass("scrolled");
	}
});