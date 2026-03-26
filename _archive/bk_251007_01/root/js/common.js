// script starts here
$(document).ready(function(){

	// initialization of aos animation
	AOS.init({
		// uncomment this part if you want to the animation to occur once
		// once: true,
		duration: 1000
	});

	// Counter animation
	let hasAnimated = false;

    function isInViewport(element) {
		const rect = element.getBoundingClientRect();
		return (
			rect.top < window.innerHeight &&
			rect.bottom >= 0
		);
    }

    function animateCounters() {
		$('.counter').each(function () {
			const $this = $(this);
			const target = parseInt($this.data('target'));
			let count = Math.floor(target / 2);
			const duration = 1500;
			const stepTime = 15;
			const steps = Math.ceil(duration / stepTime);
			const increment = Math.ceil((target - count) / steps);

			function updateCounter() {
				count += increment;
				if (count >= target) {
					$this.text(target);
				} else {
					$this.text(count);
					setTimeout(updateCounter, stepTime);
				}
			}

			updateCounter();
		});
    }

    $(window).on('scroll load', function () {
		if (!hasAnimated && isInViewport(document.getElementById('counter-list'))) {
			hasAnimated = true;
			animateCounters();
		}
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