const track = document.querySelector('.carousel-track');
const rooms = track ? Array.from(track.children) : [];
const nextButton = document.querySelector('.carousel-button.next');
const prevButton = document.querySelector('.carousel-button.prev');
const hamburger = document.querySelector('.hamburger');
const nav = document.querySelector('nav ul');

let currentIndex = 0;
let isThrottled = false;

// Update the carousel position based on the current index
const updateCarousel = () => {
    const amountToMove = rooms[currentIndex].getBoundingClientRect().width;
    track.style.transform = `translateX(-${amountToMove * currentIndex}px)`;
    rooms.forEach((room, index) => {
        room.setAttribute('aria-hidden', index !== currentIndex);
    });
};

// Throttle function to limit the rate of function calls
const throttle = (callback, delay) => {
    if (isThrottled) return;
    isThrottled = true;
    setTimeout(() => {
        callback();
        isThrottled = false;
    }, delay);
};

// Event listener for the next button
nextButton.addEventListener('click', () => {
    throttle(() => {
        currentIndex = (currentIndex + 1) % rooms.length;
        updateCarousel();
    }, 300);
});

// Event listener for the previous button
prevButton.addEventListener('click', () => {
    throttle(() => {
        currentIndex = (currentIndex - 1 + rooms.length) % rooms.length;
        updateCarousel();
    }, 300);
});

// Event listener for room click to expand/collapse
rooms.forEach(room => {
    room.addEventListener('click', () => {
        if (room.classList.contains('expanded')) {
            room.classList.remove('expanded');
        } else {
            rooms.forEach(r => r.classList.remove('expanded'));
            room.classList.add('expanded');
        }
    });
});

// Keyboard navigation for the carousel
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') {
        nextButton.click();
    } else if (e.key === 'ArrowLeft') {
        prevButton.click();
    }
});

// Debounce function to limit the rate of function calls
const debounce = (func, wait) => {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
};

// Reset carousel position on window resize
window.addEventListener('resize', debounce(() => {
    currentIndex = 0;
    updateCarousel();
}, 200));

// Toggle navigation menu on hamburger click
hamburger.addEventListener('click', () => {
    const expanded = hamburger.getAttribute('aria-expanded') === 'true' || false;
    hamburger.setAttribute('aria-expanded', !expanded);
    nav.classList.toggle('active');
});



