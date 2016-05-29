
$(function() {
	var index = window.location.href.split('/').length - 1;
	var href = window.location.href.split('/')[index];
	$(".nav_con li a[href='" + href + "']").addClass('on');

	var lineWidth = $('.nav_con li a.on').outerWidth();
	var lineLeft = $('.nav_con li a.on').position().left;
	$('.line').css({
		width: lineWidth,
		left: lineLeft
	});

	$('.nav_con li').hover(function() {
		var lineWidth = $(this).outerWidth();
		var lineLeft = $(this).position().left;
		$('.line').stop().animate({
			width: lineWidth,
			left: lineLeft
		}, {
			duration: 1500,
			easing: 'easeOutElastic'
		});
	}, function() {
		$('.line').stop().animate({
			width: lineWidth,
			left: lineLeft
		}, {
			duration: 1500,
			easing: 'easeOutElastic'
		});
	});
})