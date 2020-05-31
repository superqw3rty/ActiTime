'use strict';

/// Header menu
const burger = document.querySelector('.header__menu-burger');
const nav = document.querySelector('.header__menu-wrapper');
const dropdownBtn = document.querySelector('.header__nav-link--dropdown');
const dropdown = document.querySelector('.header__dropdown');
const dropdownArrow = document.querySelector('.header__nav-link-arrow');

function smoothHeight(el) {
	let elHeight = el.scrollHeight;
	if (!el.style.height) {
		el.style.height = el.scrollHeight + 'px';
		if (el === dropdown) {
			let navHeight = nav.scrollHeight + elHeight ;
			nav.style.height = navHeight + 'px'
		}
	}
	else {
		el.style.height = '';
		if (el === dropdown) {			
			let navHeight = nav.scrollHeight ;
			nav.style.height = navHeight - elHeight + 'px'
		}
	}
}




burger.addEventListener('click', function() {
	if(document.documentElement.clientWidth < 1300 ) {
		let classCheck = this.getAttribute('class'); // IE11 не работает с svg.classList

		if (classCheck.indexOf('header__menu-burger--opened') < 0) {
			this.setAttribute('class', classCheck + ' header__menu-burger--opened')
			if (!!window.MSInputMethodContext && !!document.documentMode) {
				document.querySelector('.header__menu-burger--norm').style.display = 'none';
				document.querySelector('.header__menu-burger--cross').style.display = 'block';
			}
		}
		else {
			this.setAttribute('class', 'header__menu-burger' )
			if (!!window.MSInputMethodContext && !!document.documentMode) {
				document.querySelector('.header__menu-burger--norm').style.display = 'block';
				document.querySelector('.header__menu-burger--cross').style.display = 'none';
			}
		}
		smoothHeight(nav)
	}
	
})


document.addEventListener('click', function(e) {
	if(document.documentElement.clientWidth < 1300 ) {
		if (e.target === dropdownBtn || e.target === dropdownArrow) {
			let arrowClasses = dropdownArrow.getAttribute('class');
			console.log(arrowClasses)
			if (!dropdown.classList.contains('header__dropdown--opened')) {
				dropdown.classList.add('header__dropdown--opened');
				dropdownArrow.setAttribute('class', arrowClasses + ' header__nav-link-arrow--opened');

			}
			else {
				dropdown.classList.remove('header__dropdown--opened');
				dropdownArrow.setAttribute('class', 'header__nav-link-arrow')
			}
			smoothHeight(dropdown)
		}
	}
})

dropdownArrow.addEventListener('mouseover', function() {
	dropdownBtn.style.color = '#9C69E2';	
})

dropdownArrow.addEventListener('mouseout', function() {
	dropdownBtn.style.color = '';	
})



//SLIDER

let slider = document.querySelector('.features__slider-items-wrapper');
let sliderItems = document.querySelectorAll('.features__slider-item');
let sliderControls = document.querySelectorAll('.features__slider-control-item');

let sliderWidth = slider.scrollWidth;

for (var i = 0; i < sliderItems.length; i++) {

	if (sliderControls[i].dataset.show != 'hidden') {

		sliderControls[i].addEventListener('click', function(i) {

			var item = this.dataset.number;		
				
			if (!!window.MSInputMethodContext && !!document.documentMode){
				sliderWidth = slider.scrollWidth;
			}

			let sliderStep = (-sliderWidth / sliderItems.length) * item;

		 		for (var j = 0; j < sliderItems.length; j++) {
				sliderItems[j].style.transform = 'translateX(' +  sliderStep + 'px)';
				sliderControls[j].classList.remove('features__slider-control-item--active');
			}
			this.classList.add('features__slider-control-item--active');
		})
	}
}

if (document.documentElement.clientWidth >= 1300) {
	sliderControls[3].dataset.show = 'hidden'
	sliderControls[1].dataset.show = 'hidden'
}
else {
		sliderControls[3].dataset.show = ''
		sliderControls[1].dataset.show = ''
}

window.addEventListener("resize", function(){
	if(document.documentElement.clientWidth >= 1300 ){
		sliderControls[3].dataset.show = 'hidden'
		sliderControls[1].dataset.show = 'hidden'
	}
	else {
		sliderControls[3].dataset.show = ''
		sliderControls[1].dataset.show = ''
	}
});

