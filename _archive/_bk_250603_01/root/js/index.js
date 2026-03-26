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
	});
});


$(document).ready(function() {
	// Define the target progress percentages
	const progressTargets = [75, 90, 65];

	// Function to update progress bar with a smooth transition
	function updateProgressBar(id, targetPercentage, currentPercentage = 0) {
		const progressBar = document.getElementById(id);
		const counter = document.getElementById("counter" + id.charAt(id.length - 1));
		console.log(id.charAt(id.length - 1));
		if (currentPercentage <= targetPercentage) {
			// Increment progress
			progressBar.style.width = currentPercentage + '%';

			// Update the counter text
            counter.innerText = currentPercentage + '%';

			// Set the color based on progress
			if (currentPercentage >= 90) {
				progressBar.style.backgroundColor = 'rgb(6 164 163)';
			} else if (currentPercentage >= 75 && currentPercentage <= 89) {
				progressBar.style.backgroundColor = ' rgb(3 91 90)';
			} else {
				progressBar.style.backgroundColor = 'rgb(9 194 193)';
			}

			// Call the function recursively with a delay to simulate progress
			setTimeout(() => {
				updateProgressBar(id, targetPercentage, currentPercentage + 1);
			}, 30); // Delay of 50ms for smooth transition
		}
	}

	// Start the progress for each task
	updateProgressBar('progress1', progressTargets[0]);
	updateProgressBar('progress2', progressTargets[1]);
	updateProgressBar('progress3', progressTargets[2]);

	const playBtn = document.getElementById('playBtn');
	const thumbnail = document.getElementById('thumbnail');
	const video = document.getElementById('video');

	playBtn.addEventListener('click', () => {
		thumbnail.style.display = 'none';
		playBtn.style.display = 'none';
		video.style.display = 'block';
		video.play();
	});
});




