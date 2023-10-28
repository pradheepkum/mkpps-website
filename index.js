// Global variables for common use
const currentYearPlaceholder = document.getElementById('currentYear');
const headerTopSection = document.getElementById('header__top');
const backToTopBtn = document.getElementById('backToTop__btn');
const mobileMenuContainer = document.getElementById('mobile__menu__container');

// variables for statistics for running numbers
var isVisited = false;
const countriesOperated = document.getElementById('countries__operated');
const industryDomains = document.getElementById('indutry__domains');
const deliveredProjects = document.getElementById('delivered_projects');
const experience = document.getElementById('experience');
const products = document.getElementById('product');

// triggered when site reloads or refreshed
window.onload = function () {
    currentYearPlaceholder.innerHTML = getCurrentYear();   
    highlightActiveNavItem();
    highlightActiveNavItemForOfferings();
    if (window.scrollY > 400 && backToTopBtn) {
        backToTopBtn.style.display = 'flex';
    }
}

/**
 * Method used to detect whether the scroll viewport
 * hits the current view as the target element
 * @param {HTMLElement} el 
 * @returns true or false
 */
function isScrolledIntoView(el) {
    if (el) {
        var rect = el.getBoundingClientRect();
        var elemTop = rect.top;
        var elemBottom = rect.bottom;

        // Only completely visible elements return true:
        var isVisible = (elemTop >= 0) && (elemBottom <= window.innerHeight);
        // Partially visible elements return true:
        //isVisible = elemTop < window.innerHeight && elemBottom >= 0;
        return isVisible;
    } else return false;
}

/**
 * Used to listen to all scroll events for the entire
 * site and execute methods based on preferences
 */
window.addEventListener('scroll', function (){
    if (isScrolledIntoView(document.getElementById('company__quote'))) {
        // trigger to show back to top button
        backToTopBtn.style.display = 'flex';
    }
    if (isScrolledIntoView(document.getElementById('analytic__board'))) {
       if (!isVisited) {
            animateStatisticValue(countriesOperated, 0, 4, 700)
            animateStatisticValue(industryDomains, 0, 8, 700, '+')
            animateStatisticValue(deliveredProjects, 0, 21, 700, '+')
            animateStatisticValue(experience, 0, 40, 700, '+')
            animateStatisticValue(products, 0, 1, 700)
       }
    }
    if (window.scrollY === 0 && headerTopSection) {
        headerTopSection.style.display = 'flex';
        this.document.getElementById('offerings__nav__container').classList.remove('top-28');
        this.document.getElementById('offerings__nav__container').classList.add('top-36');
        this.document.getElementById('services').classList.remove('pt-24');
    }
    if (window.scrollY > 100 && headerTopSection) {
        if (headerTopSection.style.display !== 'hidden') {
            headerTopSection.style.display = 'none';
            this.document.getElementById('offerings__nav__container').classList.remove('top-36');
            this.document.getElementById('offerings__nav__container').classList.add('top-28');
            this.document.getElementById('services').classList.add('pt-24');
        }
    }
    if (window.scrollY < 200 && backToTopBtn) {
        backToTopBtn.style.display = 'none';
    }
})

function closeMobileMenu() {
    if (mobileMenuContainer) {
        mobileMenuContainer.style.display = 'none';
    }
}

function openMobileMenu() {
    if (mobileMenuContainer) {
        mobileMenuContainer.style.display = 'flex';
    }
}

/**
 * Method used to animate the running numbers
 * controlled using speed and able to add a optional
 * suffix as string to it
 * @param {HTMLElement} obj 
 * @param {Number} start 
 * @param {Number} end 
 * @param {Number} duration 
 * @param {String} suffix 
 */
function animateStatisticValue(obj, start, end, duration, suffix='') {
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    obj.innerHTML = Math.floor(progress * (end - start) + start) + suffix;
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
  isVisited = true
}

/**
 * Used to fetch current year from date
 * for footer purpose
 */
const getCurrentYear = () => new Date().getFullYear();

/**
 * Methods and variables used for main hero section
 * carousels
 */
const slidesContainer = document.querySelector(".slides-container");
const prevButton = document.querySelector(".prev");
const nextButton = document.querySelector(".next");

if (nextButton) {
    nextButton.addEventListener("click", () => {
        let slideWidth = slidesContainer.querySelector(".slide").clientWidth;
        slidesContainer.scrollLeft += slideWidth;
    });
}

if (prevButton) {
    prevButton.addEventListener("click", () => {
        let slideWidth = slidesContainer.querySelector(".slide").clientWidth;
        slidesContainer.scrollLeft -= slideWidth;
    });
}

/**
 * Method used to highlight active nav item in the 
 * navbar header component
 * @returns null
 */
function highlightActiveNavItem() {
    let currentPathName = location.pathname.split('/')[1].replace('index.html', '');
    let navItems = document.querySelectorAll('.nav__item a');
    for (let i = 0, len = navItems.length; i < len; i++) {
        if (navItems[i].getAttribute("href").indexOf(currentPathName) !== -1) {
            if (navItems[i].getAttribute("href").split('/')[1].split('#')[0] === currentPathName) {
                navItems[i].classList.add("text-blue-700");
            } else {
                navItems[i].classList.add("text-gray-600")
            }
        }
    }
}

/**
 * Method used to highlight active nav item in the 
 * offerings page
 * @returns null
 */
function highlightActiveNavItemForOfferings(isManual=false, isActive=null) {
    let currentHash = location.hash;
    let navItems = document.querySelectorAll('.offerings__nav__item a');
    let navItemsWarp = document.querySelectorAll('.offerings__nav__item'); // only for highlighting
    for (let i = 0, len = navItems.length; i < len; i++) {
        if (isManual) {
            if (navItems[i].getAttribute("href") === isActive) {
                navItemsWarp[i].classList.add("bg-blue-800");
                navItemsWarp[i].classList.add("text-white");
            } else {
                navItemsWarp[i].classList.add("text-black");
                navItemsWarp[i].classList.remove('bg-blue-800');
                navItemsWarp[i].classList.remove('text-white');
            }
        } else {
            if (navItems[i].getAttribute("href").indexOf(currentHash) !== -1) {
                if (navItems[i].getAttribute("href") === currentHash) {
                    navItemsWarp[i].classList.add("bg-blue-800");
                    navItemsWarp[i].classList.add("text-white");
                } else {
                    navItemsWarp[i].classList.add("text-black");
                }
            }
        }
    }
}

/**
 * Method used to scroll to top of the page
 * Based on position of the current viewport of the site
 */
function scrollToTop() {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
}