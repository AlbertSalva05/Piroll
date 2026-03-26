// script starts here
$(document).ready(function(){

	$('#loadMoreBtn').on('click', function () {
		const allItems = $('.work__list li');
		const extraItems = allItems.not(':lt(8)'); // anything beyond the first 8
		const isExpanded = $(this).text().toUpperCase() === 'SEE LESS';

		if (!isExpanded) {
			// Expand: show all items
			extraItems.slideDown(300).removeClass('hidden').addClass('visible');
			$(this).text('SEE LESS');

			// force all items into flex layout
			allItems.addClass('force-flex');
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
		autoplaySpeed: 1, // Very low for continuous effect
		speed: 1000, // Adjust for desired continuous scroll speed
		infinite: true,
		cssEase: 'linear', // Ensure smooth, linear movement
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

$(document).ready(function() {

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

let slideshowInterval; // 👈 store interval globally

// Open modal
$(".work-item").click(function(){
	const id = $(this).data("id");
	const work = works.find(p => p.id == id);
	const clickedImgSrc = $(this).find("img").attr("src"); // 👈 get clicked image src

	if (work) {
		// Set title + description (once only)
		$("#work_modal-ttl").text(work.title);
		$("#work__modal-thumb-desc").html(
		work.description
			.replace(/\n\n/g, "<br><br>")
			.replace(/\n/g, "<br>")
		);

		// Find index of clicked image in work.images
		let clickedIndex = work.images.indexOf(clickedImgSrc);
		if (clickedIndex === -1) clickedIndex = 0;

		// Set large image based on clicked image
		$("#main-image").attr("src", work.images[clickedIndex]);

		// Populate thumbnails
		$("#thumbs").empty();
		$.each(work.images, function(i, img){
		const $thumb = $("<img>")
			.attr("src", img)
			.attr("data-index", i);
		if(i === clickedIndex) $thumb.addClass("active");
			$("#thumbs").append($thumb);
		});

		// Thumbnail click (only changes image, not description)
		$("#thumbs img").click(function(){
		$("#thumbs img").removeClass("active");
		$(this).addClass("active");
		$("#main-image").attr("src", $(this).attr("src"));
			clickedIndex = $(this).data("index"); // update index to sync slideshow
		});

		// Show modal
		$("#work__modal").fadeIn(200).css("display","flex");

		// Start slideshow effect
		clearInterval(slideshowInterval);
		slideshowInterval = setInterval(function(){
			clickedIndex = (clickedIndex + 1) % work.images.length;
			$("#thumbs img").removeClass("active").eq(clickedIndex).addClass("active");

			$("#main-image").fadeOut(200, function(){
				$(this).attr("src", work.images[clickedIndex]).fadeIn(200);
			});
		}, 2000); // Change every 2s
	}
});

// Close modal
$("#work__modal-btn-close, #modal-close-x").click(function(){
	$("#work__modal").fadeOut(200);
	clearInterval(slideshowInterval); // 👈 stop slideshow when closing
});

document.getElementById("sendBtn").addEventListener("click", function(e) {
    e.preventDefault(); // prevent anchor default action

    let isValid = true;
    let messages = [];

    // Collect form values
    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let title = document.getElementById("title").value.trim();
    let comment = document.getElementById("comment").value.trim();

    // Name validation
    if (name === "") {
        messages.push("Name is required.");
        isValid = false;
    }

    // Email validation
    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email === "") {
        messages.push("Email is required.");
        isValid = false;
    } else if (!emailPattern.test(email)) {
        messages.push("Please enter a valid email address.");
        isValid = false;
    }

    // Title validation
    if (title === "") {
        messages.push("Title is required.");
        isValid = false;
    }

    // Comment validation
    if (comment === "") {
        messages.push("Comment is required.");
        isValid = false;
    }

    // Show errors or proceed
    if (!isValid) {
        alert(messages.join("\n"));
    } else {
        alert("Form submitted successfully!");
        document.getElementById("projectForm").submit(); // ✅ submit form
    }
});