// Hide Loader on page ready
document.addEventListener('DOMContentLoaded', () => {
	const loader = document.querySelector('.loader');
	if (loader) loader.style.display = 'none';
});

// Change Navbar Styles On Scroll
window.addEventListener('scroll', () => {
	const nav = document.querySelector('nav');
	if (nav) {
		const scrollPosition = window.scrollY;
		if (scrollPosition > 25) {
			nav.classList.add('window-scroll');
		} else {
			nav.classList.remove('window-scroll');
		}
	}
});

const menu = document.querySelector('.nav__menu');
const openMenuBtn = document.querySelector('#open-menu-btn');
const closeMenuBtn = document.querySelector('#close-menu-btn');

// Show/Hide Nav Menu
openMenuBtn.addEventListener('click', () => {
	menu.style.display = 'flex';
	closeMenuBtn.style.display = 'inline-block';
	openMenuBtn.style.display = 'none';
});

// Close Nav Menu
const closeNav = () => {
	menu.style.display = 'none';
	closeMenuBtn.style.display = 'none';
	openMenuBtn.style.display = 'inline-block';
};
closeMenuBtn.addEventListener('click', closeNav);

// Join Dropdown Menu
const dropdownButton = document.getElementById('join-dropdown-btn');
const dropdownContent = document.querySelector('.join-dropdown-content');
dropdownButton.addEventListener('click', function () {
	dropdownContent.classList.toggle('open');
});

// Floating Nav
$(document).ready(function () {
	$('.fa-bars').click(function () {
		$(this).toggleClass('fa-times');
		$('.navbar').toggleClass('nav-toggle');
	});
	//quick-access button
	$('#hamburger').click(function () {
		$('#hamburger').toggleClass('show');
		$('#overlay').toggleClass('show');
		$('.nav').toggleClass('show');
	});
});

// Smooth Scroll Floating Nav
const navLinks = document.querySelectorAll('.floating-nav a');
const hamburger = document.getElementById('hamburger');
const nav = document.querySelector('.floating-nav');

navLinks.forEach((link) => {
	link.addEventListener('click', (e) => {
		e.preventDefault();
		const targetId = link.getAttribute('href');
		const targetElement = document.querySelector(targetId);
		if (targetElement) {
			const offset = targetElement.getBoundingClientRect().top + window.scrollY;
			window.scrollTo({
				top: offset,
				behavior: 'smooth',
			});
			nav.classList.remove('open');
		}
	});
});








