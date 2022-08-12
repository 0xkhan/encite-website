import './sass/main.scss'
import logo from './assets/logo.svg'
import headerBI from './assets/hero-btn.png'
import aboutImg from './assets/about_title_img.png'
import featuredMockupImg from './assets/mockup.png'
import headerImgSource from './assets/header_mockup.png'
import featherSprite from './assets/feather-sprite.svg'
import brandsSprite from './assets/brands_sprite.svg'

import maajiMockup from './assets/maaji_mockup.png'
import werebuzyMockup from './assets/werebuzy_mockup.png'
import econoizMockup from './assets/econoiz_mockup.png'

// Get img elements
const siteLogo = document.getElementById('logo');
const headerBtnImg = document.getElementById('header__btn-img');
const aboutTitleImg = document.getElementById('about__img');
const featuredImg = document.getElementById('featured__img');
const reviewsSliderImg = document.getElementById('reviews__slider-img');
const headerImg = document.getElementById('header__img');

const featuredImgMaaji = document.querySelector('.featured__img--maaji');
const featuredImgWerebuzy = document.querySelector('.featured__img--werebuzy');
const featuredImgEconoiz = document.querySelector('.featured__img--econoiz');

// Get card elements
const featuredCardMaaji = document.querySelector('.featured__card--maaji');
const featuredCardWerebuzy = document.querySelector('.featured__card--werebuzy');
const featuredCardEconoiz = document.querySelector('.featured__card--econoiz');

// Featured case studies background colors
const colorMaaji = '#f0be71';
const colorWerebuzy = '#61bda6';
const colorEconoiz = '#008570';

// Set img elements
siteLogo.src = logo;
headerBtnImg.src = headerBI;
aboutTitleImg.src = aboutImg;
headerImg.src = headerImgSource;

featuredImgMaaji.src = maajiMockup;
featuredImgWerebuzy.src = werebuzyMockup;
featuredImgEconoiz.src = econoizMockup;

featuredCardMaaji.style.backgroundColor = colorMaaji;
featuredCardWerebuzy.style.backgroundColor = colorWerebuzy;
featuredCardEconoiz.style.backgroundColor = colorEconoiz;


const slider = function() {
    const slider = document.querySelector('.slider');
    const slides = document.querySelectorAll('.slide');
    const dotContainer = document.querySelector('.dots');
    const btnLeft = document.querySelector('.slider__btn--left');
    const btnRight = document.querySelector('.slider__btn--right');

    // Match media query. mql := mediaQueryList
    let mql = window.matchMedia('(max-width: 600px)');

    const maxSlides = slides.length;
    let currentSlide = 0;

    // Create dot elements for each slide
    const createDots = function() {
        slides.forEach(function(_, i) {
            dotContainer.insertAdjacentHTML(
                'beforeend',
                `<button class="dots__dot" data-slide="${i}"></button>`
            );
        });
    }

    // Activate Dot
    const activateDot = function(slide) {
        // Remove active class from all elements
        document.querySelectorAll('.dots__dot').forEach((dot) => {
            dot.classList.remove('dots__dot--active');
        });

        // Add active class only to current element
        document.querySelector(`.dots__dot[data-slide="${slide}"]`).classList.add('dots__dot--active');
    }

    const goToSlide = function(currentSlide) {
        if (mql.matches) {
            slides.forEach((slide, i) => {
                slide.style.transform = `translateX(${120 * (i - currentSlide)}%)`;
            });
        } else {
            slides.forEach((slide, i) => {
                slide.style.transform = `skewX(12deg) translateX(${120 * (i - currentSlide)}%)`;
            });
        }
    }

    const nextSlide = function() {
        if (currentSlide === maxSlides - 1) {
            currentSlide = 0;
        } else {
            currentSlide++;
        }
        goToSlide(currentSlide);
        activateDot(currentSlide);
    }

    const prevSlide = function() {
        if (currentSlide === 0) {
            currentSlide = maxSlides - 1;
        } else {
            currentSlide--;
        }
        goToSlide(currentSlide);
        activateDot(currentSlide);
    }

    const autoSlide = function() {
        if (!mql.matches) {
            // setInterval(nextSlide, 5000);
            // Set timer for autoslide
            let timer = setInterval(nextSlide, 5000);

            slider.addEventListener('mouseover', () => {
                clearInterval(timer);
            }, false);

            slider.addEventListener('mouseout', () => {
                timer = setInterval(nextSlide, 5000);
            }, false);
        }
    }

    // Initial State
    const init = function() {
        createDots();
        activateDot(0);
        goToSlide(0);
        autoSlide();
    }

    // Initialize initial states
    init();

    // Event handlers
    // Next/Prev slide
    btnRight.addEventListener('click', nextSlide);
    btnLeft.addEventListener('click', prevSlide);

    // Next/Prev slide with arrow keys
    document.addEventListener('keydown', function(event) {
        if (event.key === 'ArrowLeft') prevSlide();
        // Short circuit variant
        event.key === 'ArrowRight' && nextSlide();
    });

    // Next/Prev when clicked on dot
    dotContainer.addEventListener('click', function (event) {
        if (event.target.classList.contains('dots__dot')) {
            const {slide} = event.target.dataset;
            goToSlide(slide);
            activateDot(slide);
        }
    });
}

slider();
