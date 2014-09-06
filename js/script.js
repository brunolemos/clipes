var sections 		= [];
var currentSection 	= 0;
var documentHeight 	= 800;

window.onload 		= onLoad;
window.onresize 	= onResize;
// window.onscroll 	= onScroll;

function onLoad() {
	sections = document.querySelectorAll("body > section");
	onResize();
}

function onResize() {
	documentHeight = document.documentElement.clientHeight;

	if(sections.length >= 1) sections[0].style.height = 1.0 * documentHeight + "px";
	if(sections.length >  1) {
		document.body.style.paddingTop 		= 1.2 * documentHeight + "px";
		document.body.style.paddingBottom 	= 1.2 * documentHeight + "px";
	}

	for(var i = 1; i < sections.length; i++) 
		sections[i].style.height = 1.2 * documentHeight + "px";
}

// function onScroll() {
// 	var scroll 		= document.documentElement.scrollTop;
// 	var newSection 	= Math.floor(scroll / documentHeight);

// 	if(newSection != currentSection) {
// 		var next = newSection > currentSection ? newSection+1 : newSection-1;
// 		changeSection(newSection, next);
// 	}
// }

// function changeSection(current, next) {
// 	return false;
// 	var old_previous 	= document.querySelector('body > section.previous');
// 	var old_next 		= document.querySelector('body > section.next');
// 	var old_current 	= document.querySelector('body > section.current');

// 	if(old_next) 		old_next.classList.remove('next');
// 	if(old_previous) 	old_previous.classList.remove('previous');
// 	if(old_current) 	old_current.classList.remove('current');
// 	if(old_current) 	old_current.classList.add('previous');
	
// 	if(current >= 0 && current < sections.length) {
// 		sections[current].classList.add('current');
// 		// sections[current].style.top 		= (documentHeight * current) + "px";
// 		// sections[currentSection].style.top 	= 0;
// 		document.body.style.paddingTop 		= (documentHeight * current) + "px";

// 		currentSection = current;
// 	}

// 	if(next != current && next >= 0 && next < sections.length) {
// 		sections[next].classList.add('next');
// 	}
// }