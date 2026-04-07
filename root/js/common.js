// ==========================
// GLOBAL SAFE INIT
// ==========================
$(function () {

	// ==========================
	// VIDEO PLAY HANDLER (SAFE)
	// ==========================
	const playBtn = document.getElementById('playBtn');
	const thumbnail = document.getElementById('thumbnail');
	const video = document.getElementById('video');

	if (playBtn && thumbnail && video) {
		playBtn.addEventListener('click', () => {
			thumbnail.style.display = 'none';
			playBtn.style.display = 'none';
			video.style.display = 'block';
			video.play();
		});
	}

	// ==========================
	// AOS INIT (SAFE)
	// ==========================
	if (typeof AOS !== "undefined") {
		AOS.init({
			duration: 1000
		});
	}

	// ==========================
	// MENU TOGGLE
	// ==========================
	$(".menuBtn").on("click", function () {
		$(".header__menu__bar").addClass("active");
		$('html').css('overflow-y', 'hidden');
	});

	$(".closeBtn").on("click", function () {
		$(".header__menu__bar").removeClass("active");
		$('html').css('overflow-y', 'auto');
	});

	// ==========================
	// TILE FIX (THROTTLED)
	// ==========================
	const $window = $(window);

	function applyTile() {
		if ($(".service__list-item").length) {
			$(".service__list-item").tile();
		}
		if ($(".service__list__img").length) {
			$(".service__list__img").tile();
		}
	}

	let resizeTimeout;
	$window.on('load resize', function () {
		clearTimeout(resizeTimeout);
		resizeTimeout = setTimeout(applyTile, 150);
	});

});


// ==========================
// HEADER SCROLL STATE (OPTIMIZED)
// ==========================
$(window).on("scroll", function () {
	const scrollTop = $(this).scrollTop();
	$("header").toggleClass("scrolled", scrollTop > 0);
});


// ==========================
// SKILLS PROGRESS (SAFE + OPTIMIZED)
// ==========================
$(function () {

	const $skills = $(".skills");
	if (!$skills.length) return; // 🔥 CRITICAL FIX

	const progressTargets = [75, 90, 65];
	let animated = false;

	function updateProgressBar(id, target, current = 0) {
		const progressBar = document.getElementById(id);
		const counter = document.getElementById("counter" + id.slice(-1));

		if (!progressBar || !counter) return; // 🔥 FIX

		if (current <= target) {
			progressBar.style.width = current + '%';
			counter.innerText = current + '%';

			// Color logic
			if (current >= 90) {
				progressBar.style.backgroundColor = 'rgb(6 164 163)';
			} else if (current >= 75) {
				progressBar.style.backgroundColor = 'rgb(3 91 90)';
			} else {
				progressBar.style.backgroundColor = 'rgb(9 194 193)';
			}

			requestAnimationFrame(() => {
				setTimeout(() => {
					updateProgressBar(id, target, current + 1);
				}, 30);
			});
		}
	}

	// 🔥 Use IntersectionObserver instead of scroll
	const observer = new IntersectionObserver((entries) => {
		entries.forEach(entry => {
			if (entry.isIntersecting && !animated) {
				updateProgressBar('progress1', progressTargets[0]);
				updateProgressBar('progress2', progressTargets[1]);
				updateProgressBar('progress3', progressTargets[2]);
				animated = true;
				observer.disconnect();
			}
		});
	}, {
		threshold: 0.3
	});

	observer.observe($skills[0]);

});


// ==========================
// COUNTER ANIMATION (SAFE)
// ==========================
let hasAnimated = false;

function isInViewport(element) {
	if (!element) return false; // 🔥 FIX

	const rect = element.getBoundingClientRect();
	return rect.top < window.innerHeight && rect.bottom >= 0;
}

function animateCounters() {
	$('.counter').each(function () {
		const $this = $(this);
		const target = parseInt($this.data('target'), 10);

		if (isNaN(target)) return; // 🔥 FIX

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
	const counterSection = document.getElementById('counter-list');

	if (!hasAnimated && isInViewport(counterSection)) {
		hasAnimated = true;
		animateCounters();
	}
});