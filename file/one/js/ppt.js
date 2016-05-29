var data = [{
	img: 1,
	h1: 'creative',
	h2: 'DUET'
}, {
	img: 2,
	h1: 'friendly',
	h2: 'DEVIL'
}, {
	img: 3,
	h1: 'tranqulent',
	h2: 'COMPATRITE'
}, {
	img: 4,
	h1: 'insecure',
	h2: 'HUSSLER'
}, {
	img: 5,
	h1: 'loving',
	h2: 'REBEL'
}, {
	img: 6,
	h1: 'passionate',
	h2: 'SEEKER'
}, {
	img: 7,
	h1: 'crazy',
	h2: 'FRIEND'
}];


var g = function(id) {
	if (id.substr(0, 1) == '.') {
		return document.getElementsByClassName(id.substr(1));
	}
	return document.getElementById(id);
}

function addSliders() {
	var tpl_main = g('template_main').innerHTML.replace(/^\s*/,
		'').replace(/\s*$/, '');
	var tpl_ctrl = g('template_ctrl').innerHTML.replace(/^\s*/,
		'').replace(/\s*$/, '');
	var out_main = [];
	var out_ctrl = [];
	var _html_main = '';
	var _html_ctrl = '';
	for (i in data) {

		_html_main += tpl_main
			.replace(/{{index}}/g, data[i].img)
			.replace(/{{h2}}/g, data[i].h1)
			.replace(/{{h3}}/g, data[i].h2);
		_html_ctrl += tpl_ctrl
			.replace(/{{index}}/g, data[i].img);
	}
	g('template_main').innerHTML = _html_main;
	g('template_ctrl').innerHTML = _html_ctrl;
}

function switchSlider(n) {
	var main = g("main_" + n);
	var ctrl = g("ctrl_" + n);
	var clear_main = g('.main-i');
	var clear_ctrl = g('.ctrl-i');
	for (var i = 0; i < clear_ctrl.length; i++) {
		clear_main[i].className = clear_main[i].className.replace(' main-i_active', '');
		clear_ctrl[i].className = clear_ctrl[i].className.replace(' ctrl-i_active', '');
	}
	main.className += " main-i_active";
	ctrl.className += " ctrl-i_active";
}

window.onload = function() {
	addSliders();
	switchSlider(1);
}
