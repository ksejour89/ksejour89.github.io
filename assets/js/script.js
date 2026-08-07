(function () {
	'use strict';

	var navToggle = document.getElementById('navToggle');
	var nav = document.getElementById('nav');

	navToggle.addEventListener('click', function () {
		var isOpen = nav.classList.toggle('open');
		navToggle.setAttribute('aria-expanded', isOpen);
	});

	nav.querySelectorAll('a').forEach(function (link) {
		link.addEventListener('click', function () {
			nav.classList.remove('open');
			navToggle.setAttribute('aria-expanded', false);
		});
	});

	var navLinks = nav.querySelectorAll('a');
	var sections = Array.prototype.map.call(navLinks, function (link) {
		return document.querySelector(link.getAttribute('href'));
	});

	var observer = new IntersectionObserver(function (entries) {
		entries.forEach(function (entry) {
			var link = nav.querySelector('a[href="#' + entry.target.id + '"]');
			if (!link) return;
			if (entry.isIntersecting) {
				navLinks.forEach(function (l) { l.classList.remove('active'); });
				link.classList.add('active');
			}
		});
	}, { rootMargin: '-40% 0px -55% 0px' });

	sections.forEach(function (section) {
		if (section) observer.observe(section);
	});

	document.getElementById('year').textContent = new Date().getFullYear();
})();
