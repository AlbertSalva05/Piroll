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


$(function(){
	$window = $(window);
	wResize();

	function wResize() {
		$window.on('load scroll resize', function() {
			$(".service__list-item").tile();
			$(".service__list__img").tile();
		});
	}
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
            }, 50); // smoother animation
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
});
