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

// Sample JSON data
const works = [
    {
		id: 1,
		title: "work 1",
		images: [
			"images/work_img_product_001.jpg",
			"images/work_img_product_002.jpg",
			"images/work_img_product_003.jpg",
			"images/work_img_product_004.jpg"
		],
		subcontent: "This is extra details for product 1 displayed on the right."
	},
	{
		id: 2,
		title: "work 2",
		images: [
			"images/work_img_product_002.jpg",
			"images/work_img_product_003.jpg",
			"images/work_img_product_004.jpg",
			"images/work_img_product_005.jpg"
		],
		subcontent: "This is extra details for product 2 displayed on the right."
	},
    {
		id: 3,
		title: "work 3",
		images: [
			"images/work_img_product_001.jpg",
			"images/work_img_product_002.jpg",
			"images/work_img_product_003.jpg",
			"images/work_img_product_004.jpg"
		],
		subcontent: "This is extra details for product 3 displayed on the right."
	},
	{
		id: 4,
		title: "work 4",
		images: [
			"images/work_img_product_002.jpg",
			"images/work_img_product_003.jpg",
			"images/work_img_product_004.jpg",
			"images/work_img_product_005.jpg"
		],
		subcontent: "This is extra details for product 4 displayed on the right."
	},
	{
		id: 5,
		title: "work 5",
		images: [
			"images/work_img_product_001.jpg",
			"images/work_img_product_002.jpg",
			"images/work_img_product_003.jpg",
			"images/work_img_product_004.jpg"
		],
		subcontent: "This is extra details for product 5 displayed on the right."
	},
	{
		id: 6,
		title: "work 6",
		images: [
			"images/work_img_product_002.jpg",
			"images/work_img_product_003.jpg",
			"images/work_img_product_004.jpg",
			"images/work_img_product_005.jpg"
		],
		subcontent: "This is extra details for product 6 displayed on the right."
	},
    {
		id: 7,
		title: "work 7",
		images: [
			"images/work_img_product_001.jpg",
			"images/work_img_product_002.jpg",
			"images/work_img_product_003.jpg",
			"images/work_img_product_004.jpg"
		],
		subcontent: "This is extra details for product 7 displayed on the right."
	},
	{
		id: 8,
		title: "work 8",
		images: [
			"images/work_img_product_002.jpg",
			"images/work_img_product_003.jpg",
			"images/work_img_product_004.jpg",
			"images/work_img_product_005.jpg"
		],
		subcontent: "This is extra details for product 8 displayed on the right."
	},
	{
		id: 9,
		title: "work 9",
		images: [
			"images/work_img_product_002.jpg",
			"images/work_img_product_003.jpg",
			"images/work_img_product_004.jpg",
			"images/work_img_product_005.jpg"
		],
		subcontent: "This is extra details for product 9 displayed on the right."
	},
	{
		id: 10,
		title: "work 10",
		images: [
			"images/work_img_product_002.jpg",
			"images/work_img_product_003.jpg",
			"images/work_img_product_004.jpg",
			"images/work_img_product_005.jpg"
		],
		subcontent: "This is extra details for product 10 displayed on the right."
	},
	{
		id: 11,
		title: "work 11",
		images: [
			"images/work_img_product_002.jpg",
			"images/work_img_product_003.jpg",
			"images/work_img_product_004.jpg",
			"images/work_img_product_005.jpg"
		],
		subcontent: "This is extra details for product 11 displayed on the right."
	},
	{
		id: 12,
		title: "work 12",
		images: [
			"images/work_img_product_002.jpg",
			"images/work_img_product_003.jpg",
			"images/work_img_product_004.jpg",
			"images/work_img_product_005.jpg"
		],
		subcontent: "This is extra details for product 12 displayed on the right."
	},
	{
		id: 13,
		title: "work 13",
		images: [
			"images/work_img_product_002.jpg",
			"images/work_img_product_003.jpg",
			"images/work_img_product_004.jpg",
			"images/work_img_product_005.jpg"
		],
		subcontent: "This is extra details for product 13 displayed on the right."
	},
	{
		id: 14,
		title: "work 14",
		images: [
			"images/work_img_product_002.jpg",
			"images/work_img_product_003.jpg",
			"images/work_img_product_004.jpg",
			"images/work_img_product_005.jpg"
		],
		subcontent: "This is extra details for product 14 displayed on the right."
	},
	{
		id: 15,
		title: "work 15",
		images: [
			"images/work_img_product_002.jpg",
			"images/work_img_product_003.jpg",
			"images/work_img_product_004.jpg",
			"images/work_img_product_005.jpg"
		],
		subcontent: "This is extra details for product 15 displayed on the right."
	},
	{
		id: 16,
		title: "work 16",
		images: [
			"images/work_img_product_002.jpg",
			"images/work_img_product_003.jpg",
			"images/work_img_product_004.jpg",
			"images/work_img_product_005.jpg"
		],
		subcontent: "This is extra details for product 16 displayed on the right."
	},
	{
		id: 17,
		title: "work 17",
		images: [
			"images/work_img_product_002.jpg",
			"images/work_img_product_003.jpg",
			"images/work_img_product_004.jpg",
			"images/work_img_product_005.jpg"
		],
		subcontent: "This is extra details for product 17 displayed on the right."
	},
	{
		id: 18,
		title: "work 18",
		images: [
			"images/work_img_product_002.jpg",
			"images/work_img_product_003.jpg",
			"images/work_img_product_004.jpg",
			"images/work_img_product_005.jpg"
		],
		subcontent: "This is extra details for product 18 displayed on the right."
	}
];

$(function(){
	// Open modal
	$(".work-item").click(function(){
		const id = $(this).data("id");
		const work = works.find(p => p.id == id);

		if (work) {
			$("#work_modal-ttl").text(work.title);
			$("#work__modal-thumb-desc").text(work.subcontent);

			// Set first image
			$("#main-image").attr("src", work.images[0]);

			// Populate thumbnails
			$("#thumbs").empty();
			$.each(work.images, function(i, img) {
				const $thumb = $("<img>").attr("src", img).attr("data-index", i);
				if(i === 0) $thumb.addClass("active");
					$("#thumbs").append($thumb);
				});

			// Thumbnail click
			$("#thumbs img").click(function(){
			$("#thumbs img").removeClass("active");
			$(this).addClass("active");
			$("#main-image").attr("src", $(this).attr("src"));
				$("#work__modal-thumb-desc").text(work.subcontent + " (Image " + (parseInt($(this).data("index"))+1) + ")");
			});

			$("#work__modal").fadeIn(200).css("display","flex");
		}
	});

	// Close modal
	$("#work__modal-btn-close, #modal-close-x").click(function(){
		$("#work__modal").fadeOut(200);
	});
});


