// $(document).ready(function() {
// 	$(".tab__navigation-pane").click(function() {
// 		//remove active classes
// 		$(".tab__navigation-pane, .tab__block-content").removeClass("active");

// 		 //add to clicked tab
// 		$(this).addClass("active");
// 		$($(this).data("target")).addClass("active");
// 	});
// });


$(document).ready(function() {
	$(".tab__navigation-pane").click(function() {
		// remove active and show classes
		$(".tab__navigation-pane, .tab__block-content").removeClass("active show");

		// activate clicked tab
		$(this).addClass("active");

		let target = $(this).data("target");
		$(target).addClass("active");

		// delay adding the "show" class for fade effect
		setTimeout(function() {
			$(target).addClass("show");
		}, 50); // slight delay to trigger transition
	});
});