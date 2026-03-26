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

	$('#loadMoreBtn').on('click', function () {
		const allItems = $('.work__list li');
		const extraItems = allItems.not(':lt(8)'); // anything beyond the first 8
		const isExpanded = $(this).text().toUpperCase() === 'SEE LESS';

		if (!isExpanded) {
			// Expand: show all items
			extraItems.slideDown(300).removeClass('hidden').addClass('visible');
			$(this).text('SEE LESS');
		} else {
			// Collapse: hide items beyond 8
			extraItems.slideUp(300, function () {
			$(this).addClass('hidden').removeClass('visible');
			});
			$(this).text('LOAD MORE WORK');
		}
	});

	// slider for testimony area
	$('.slider__testimony_area').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplay: true,
		dots: true,
		duration: 3000,

		// if custom prevArrow and nextArrow
		prevArrow: '<span class="btn_prev"><img src="images/slick_prev.png" class="slide-arrow prev-arrow"></span>',
		nextArrow: '<span class="btn_next"><img src="images/slick_next.png" class="slide-arrow next-arrow"></span>'
	});

	// slider for logo area
	$('.slider__logo__area').slick({
		slidesToShow: 5,
		slidesToScroll: 1,
		autoplay: true,
		dots: false,
		duration: 1000,
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

$(document).ready(function() {

	// Target percentages
    const progressTargets = [75, 90, 65];
    let animated = false; // prevent multiple triggers

    // Function to update each progress bar
    function updateProgressBar(id, targetPercentage, currentPercentage = 0) {
        const progressBar = document.getElementById(id);
        const counter = document.getElementById("counter" + id.charAt(id.length - 1));

        if (currentPercentage <= targetPercentage) {
            progressBar.style.width = currentPercentage + '%';
            counter.innerText = currentPercentage + '%';

            // Dynamic color
            if (currentPercentage >= 90) {
                progressBar.style.backgroundColor = 'rgb(6 164 163)';
            } else if (currentPercentage >= 75 && currentPercentage <= 89) {
                progressBar.style.backgroundColor = 'rgb(3 91 90)';
            } else {
                progressBar.style.backgroundColor = 'rgb(9 194 193)';
            }

            setTimeout(() => {
                updateProgressBar(id, targetPercentage, currentPercentage + 1);
            }, 40); // smoother animation
        }
    }

    // Function to trigger animation when section enters viewport
    function animateSkills() {
        var skillsTop = $(".skills").offset().top;
        var scrollBottom = $(window).scrollTop() + $(window).height();

        if (!animated && scrollBottom > skillsTop + 100) {
            updateProgressBar('progress1', progressTargets[0]);
            updateProgressBar('progress2', progressTargets[1]);
            updateProgressBar('progress3', progressTargets[2]);
            animated = true; // run once
        }
    }

    // Run on load + scroll
    animateSkills();
    $(window).on("scroll", animateSkills);


	const playBtn = document.getElementById('playBtn');
	const thumbnail = document.getElementById('thumbnail');
	const video = document.getElementById('video');

	playBtn.addEventListener('click', () => {
		thumbnail.style.display = 'none';
		playBtn.style.display = 'none';
		video.style.display = 'block';
		video.play();
	});

	$('.header__menu__list-item').hover(
		function () {
			$(this).find('.header__menu__list-dropdown').stop(true, true).fadeIn(200);
		},
		function () {
			$(this).find('.header__menu__list-dropdown').stop(true, true).fadeOut(200);
		}
	);

	$(document).ready(function() {
		function animateOnScroll() {
			$(".service__list-item").each(function(i) {
				var tileTop = $(this).offset().top;
				var scrollBottom = $(window).scrollTop() + $(window).height();

				if (scrollBottom > tileTop + 60) { // 60px before visible
					$(this).delay(i * 150).queue(function(next) {
						$(this).addClass("in-view");
						next();
					});
				}
			});
		}

		// Run once on load + on scroll
		animateOnScroll();
		$(window).on("scroll", animateOnScroll);
	});
});




