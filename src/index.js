import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);

const documentBody = document.getElementsByTagName('BODY');
const timelineWrapper = document.querySelector('.tl175-wrapper');
const timelineWindow = document.querySelector('.tl175-window');
const timeline = document.querySelector('.tl175-container');
const tlNav = document.querySelector('.tl175-tlNav');
const navigationLinks = Array.from(document.querySelectorAll('.tl175-tlNav-link'));
const timelineNavTrig = document.querySelector('.tl175-tlNav-trigger');
const timelineNavClose = document.querySelector('.tl175-tlNav-close');
const featuredVideo = document.getElementById('tl175-heroVideo');
const timelineEntry = Array.from(document.querySelectorAll('.tl175-e'));
const timelineimgs = Array.from(document.querySelectorAll('.tl175img'));
const coverArchive = document.querySelector('.tl175-cvArc');
const timelineProgress = document.querySelector('.timline175-progressFill');
// const pageLine = document.querySelector('.tl175-line');
const pageTitle = document.querySelector('.tl175-pageTitle-container');
const scrollTip = document.querySelector('.tl175-scrollTip');
const loader = document.querySelector('.tl175-loader');
const loaderTitle = Array.from(document.querySelectorAll('.tl175-l-t'));
const loaderTimer = document.querySelector('.tl175-l-tim');
const bckTrigger = document.querySelector('.bckTrigger');
const fbButton = document.querySelector('.tl175-fb');
const twButton = document.querySelector('.tl175-tw');

let mobile = true;

function loadPageTimer() {
	loaderTimer.style.display = 'block';
	setTimeout(removeLoadPage, 4000);
}

function removeLoadPage() {
	function remPage() {
		loader.style.display = 'none';
	}
	function addTitle() {
		pageTitle.style.display = 'block';
		scrollTip.style.display = 'block';
	}
	featuredVideo.play();
	// loadPageLine();
	loader.style.opacity = '0';
	setTimeout(remPage, 1000);
	setTimeout(addTitle, 2000);
}

// function loadPageLine() {
// 	pageLine.style.display = 'block';
// }

loaderTitle.forEach((title,index) => {
	setTimeout(() => {
		title.style.opacity = '1';
	}, 200 * index);
});

setTimeout(loadPageTimer, 3500);


// const tl = gsap.timeline({onComplete: videoPlay});
// 	tl.to(loaderTitle, {opacity: 1, stagger: 0.2})
// 	tl.to(loaderTimer, {display: 'block'})
// 	tl.to(loader, {opacity: 0, duration: 1}, 9)
// 	tl.to(loader, {display: 'none'}, 9);

// tl.play();

// function videoPlay() {
// 	featuredVideo.play();
// 	pageLine.style.display = 'block';
// 	pageTitle.style.display = 'block';
// 	scrollTip.style.display = 'block';
// }

// COMPLIANCE BANNER HANDLER begin

function setBodyStyle() {
	documentBody[0].style.transform = 'none';
}

const interval = setInterval(function() {
    if(document.readyState === 'complete') {
        clearInterval(interval);
        const wrapper = document.querySelector('.optanon-alert-box-wrapper');
        const button = document.querySelector('.optanon-allow-all');
        wrapper.style.top = '0';
        documentBody[0].style.transform = 'none';
        documentBody[0].style.position = 'relative';
        documentBody[0].style.top = '0';
        documentBody[0].style.scrollTop = '0';
        button.addEventListener('click', function(e) {
        	wrapper.classList.add('clicked');
        	setTimeout(setBodyStyle, 100);
        })
    }    
}, 100);

// COMPLIANCE BANNER HANDLER end

function desktopScroll() {
	if (mobile) {
		return;
	} else {
		let distanceScrolled = window.pageYOffset;
		timeline.style.left = -distanceScrolled + 'px';

		timelineProgress.style.width = distanceScrolled / timeline.offsetWidth * 100 + '%';

		if (!timelineWindow.classList.contains('scrolled') && distanceScrolled > coverArchive.offsetTop - window.innerHeight) {
			timelineWindow.classList.add('scrolled');
			timelineNavTrig.style.display = 'none';
		} else if (timelineWindow.classList.contains('scrolled') && distanceScrolled < coverArchive.offsetTop - window.innerHeight) {
			timelineWindow.classList.remove('scrolled');
			timelineNavTrig.style.display = 'block';
		}

		if (!timelineNavTrig.classList.contains('expo') && distanceScrolled > timelineEntry[0].offsetLeft) {
			timelineNavTrig.classList.add('expo');
			timelineNavTrig.style.display = 'block';
		} else if (timelineNavTrig.classList.contains('expo') && distanceScrolled < timelineEntry[0].offsetLeft) {
			timelineNavTrig.classList.remove('expo');
			timelineNavTrig.style.display = 'none';
		}

		timelineEntry.forEach((entry,index) => {
			if (!entry.classList.contains('active') && index == 0 && distanceScrolled > entry.offsetLeft - window.innerWidth) {
				entry.classList.add('active');
			} else if (!entry.classList.contains('active') && !index == 0 && distanceScrolled > entry.offsetLeft) {
				entry.classList.add('active');
			} else if (entry.classList.contains('active') && index == 0 && distanceScrolled < entry.offsetLeft - window.innerWidth) {
				entry.classList.remove('active');
			} else if (entry.classList.contains('active') && !index == 0 && distanceScrolled < entry.offsetLeft) {
				entry.classList.remove('active');
			}
		})

		if (!bckTrigger.classList.contains('trigger') && distanceScrolled > bckTrigger.offsetTop) {
			bckTrigger.classList.add('trigger');
			for (let i = 0; i < timelineimgs.length; i++) {
				timelineimgs[i].style.opacity = '0';
			}
		} else if (bckTrigger.classList.contains('trigger') && distanceScrolled < bckTrigger.offsetTop) {
			bckTrigger.classList.remove('trigger');
			for (let i = 0; i < timelineimgs.length; i++) {
				timelineimgs[i].style.opacity = '1';
			}
		}
	}
}

function mobileScroll() {
	if (!mobile) {
		return;
	} else {
		let distanceScrolled = window.pageYOffset;

		if (!timelineNavTrig.classList.contains('expo') && distanceScrolled > timelineEntry[0].offsetTop + timelineEntry[0].parentElement.offsetTop + timelineEntry[0].parentElement.offsetParent.offsetTop + timelineEntry[0].parentElement.offsetParent.parentElement.offsetTop) {
			timelineNavTrig.classList.add('expo');
			timelineNavTrig.style.display = 'block';
		} else if (timelineNavTrig.classList.contains('expo') && distanceScrolled < timelineEntry[0].offsetTop + timelineEntry[0].parentElement.offsetTop + timelineEntry[0].parentElement.offsetParent.offsetTop + timelineEntry[0].parentElement.offsetParent.parentElement.offsetTop) {
			timelineNavTrig.classList.remove('expo');
			timelineNavTrig.style.display = 'none';
		}

		if (!timelineWindow.classList.contains('scrolled') && distanceScrolled > coverArchive.offsetTop - window.innerHeight) {
			timelineWindow.classList.add('scrolled');
			timelineNavTrig.style.display = 'none';
		} else if (timelineWindow.classList.contains('scrolled') && distanceScrolled < coverArchive.offsetTop - window.innerHeight) {
			timelineWindow.classList.remove('scrolled');
			timelineNavTrig.style.display = 'block';
		}		
		
		timelineEntry.forEach((entry,index) => {
			if (!entry.classList.contains('active') && index == 0 && distanceScrolled > entry.offsetTop + (entry.parentElement.offsetTop + entry.parentElement.offsetParent.offsetTop + entry.parentElement.offsetParent.parentElement.offsetTop) - window.innerHeight) {
				entry.classList.add('active');
			} else if (!entry.classList.contains('active') && !index == 0 && distanceScrolled > entry.offsetTop + entry.parentElement.offsetTop + entry.parentElement.offsetParent.offsetTop + entry.parentElement.offsetParent.parentElement.offsetTop) {
				entry.classList.add('active');
			} else if (entry.classList.contains('active') && index == 0 && distanceScrolled < entry.offsetTop + (entry.parentElement.offsetTop + entry.parentElement.offsetParent.offsetTop + entry.parentElement.offsetParent.parentElement.offsetTop) - window.innerHeight) {
				entry.classList.remove('active');
			} else if (entry.classList.contains('active') && !index == 0 && distanceScrolled < entry.offsetTop + entry.parentElement.offsetTop + entry.parentElement.offsetParent.offsetTop + entry.parentElement.offsetParent.parentElement.offsetTop) {
				entry.classList.remove('active');
			}
		})

		if (!bckTrigger.classList.contains('trigger') && distanceScrolled > bckTrigger.offsetTop) {
			bckTrigger.classList.add('trigger');
			for (let i = 0; i < timelineimgs.length; i++) {
				timelineimgs[i].style.opacity = '0';
			}
		} else if (bckTrigger.classList.contains('trigger') && distanceScrolled < bckTrigger.offsetTop) {
			bckTrigger.classList.remove('trigger');
			for (let i = 0; i < timelineimgs.length; i++) {
				timelineimgs[i].style.opacity = '1';
			}
		}
	}
}

function handleTrigger(e) {
	e.preventDefault();
	tlNav.classList.add('active');
	this.setAttribute('aria-expanded', 'true');
}

function handleNavClose(e) {
	e.preventDefault();
	tlNav.classList.remove('active');
	timelineNavTrig.setAttribute('aria-expanded', 'false');
}

function handleNavEnter(e) {
	if (mobile) {
		return;
	} else {
		let img = document.getElementById(this.dataset.yearimg);
		img.classList.add('active-navimg');
		img.style.opacity = '.7';
	}
}

function handleNavLeave(e) {
	if (mobile) {
		return;
	} else {
		let img = document.querySelector('.active-navimg');
		img.style.opacity = '0';
		img.classList.remove('active-navimg');
	}
}

function handleNavClick(e) {
	if (mobile) {
		return;
	} else {
		e.preventDefault();
		function scroller() {
			gsap.to(window, {duration: 4, scrollTo: {y: tElem.offsetLeft + tElem.children[1].offsetWidth}, ease: "power3.out"});
		}
		let tDate = this.getAttribute('href');
		let tElem = document.getElementById(tDate);
		tlNav.classList.remove('active');
		timelineNavTrig.setAttribute('aria-expanded', 'false');
		setTimeout(scroller, 350);
	}
}

function handleMobileNavClick(e) {
	if (!mobile) {
		return;
	} else {
		e.preventDefault();
		function scroller() {
			gsap.to(window, {duration: 4, scrollTo: {y: tElem, offsetY: -200, autoKill: false}, ease: "power3.out"});
		}
		let tDate = this.getAttribute('href');
		let tElem = document.getElementById(tDate);
		tlNav.classList.remove('active');
		timelineNavTrig.setAttribute('aria-expanded', 'false');
		setTimeout(scroller, 350);
	}
}

function handleFbButton(e) {
	e.preventDefault();
	let url = window.location.href;
	window.open('https://www.facebook.com/sharer/sharer.php?u=' + url);
}

function handleTwButton(e) {
	e.preventDefault();
	let url = window.location.href;
	window.open('https://twitter.com/intent/tweet?url=' + url);
}

// SET PLATFORM - Mobile or Desktop
function setPlatform() {
	if (window.innerWidth < 960) {
		mobile = true;
		timelineWindow.style.position = 'relative';
		timeline.style.left = '0';
		window.addEventListener('scroll', mobileScroll);

		for (let i = 0; i < navigationLinks.length; i++) {
			navigationLinks[i].addEventListener('click', handleMobileNavClick);
		}
	} else if (window.innerWidth > 960) {
		mobile = false;
		timelineWindow.style.position = 'fixed';
		window.addEventListener('scroll', desktopScroll);

		for (let i = 0; i < navigationLinks.length; i++) {
			navigationLinks[i].addEventListener('mouseenter', handleNavEnter);
		}

		for (let i = 0; i < navigationLinks.length; i++) {
			navigationLinks[i].addEventListener('mouseleave', handleNavLeave);
		}

		for (let i = 0; i < navigationLinks.length; i++) {
			navigationLinks[i].addEventListener('click', handleNavClick);
		}
	}
}
setPlatform();

// WINDOW RESIZE FUNCTIONS
function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};

const resizeFunction = debounce(function() {
	setPlatform();
}, 250);

window.addEventListener('resize', resizeFunction);
timelineNavTrig.addEventListener('click', handleTrigger);
timelineNavClose.addEventListener('click', handleNavClose);
fbButton.addEventListener('click', handleFbButton);
twButton.addEventListener('click', handleTwButton);
