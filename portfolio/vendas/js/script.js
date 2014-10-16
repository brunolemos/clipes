$(document).ready(function() {
	onLoad();
	
	$(window).bind("resize", function() {
		onLoad();
	});
});

function onLoad() {
	if(window.matchMedia("(min-width: 768px)").matches) {
		$('.header-nav .nav li a').tooltip({placement: 'bottom'});
	} else {
		$('.header-nav .nav li a').tooltip('destroy');
	}
}