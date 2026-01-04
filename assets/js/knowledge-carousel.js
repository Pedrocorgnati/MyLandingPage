document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.querySelector('[data-knowledge-carousel]');
    const track = document.querySelector('[data-knowledge-track]');
    const dotsContainer = document.querySelector('[data-knowledge-dots]');
    const prevButton = document.querySelector('[data-knowledge-prev]');
    const nextButton = document.querySelector('[data-knowledge-next]');

    if (!carousel || !track || !dotsContainer) {
        return;
    }

    const cards = Array.from(track.children);
    if (cards.length === 0) {
        return;
    }

    let currentIndex = 0;
    let dots = [];

    const createDot = (index) => {
        const dot = document.createElement('button');
        dot.className = 'knowledge-carousel__dot';
        dot.type = 'button';
        dot.setAttribute('data-knowledge-dot', String(index));
        dot.setAttribute('aria-label', `Go to study ${index + 1}`);
        return dot;
    };

    const updateCarousel = (index) => {
        const total = cards.length;
        currentIndex = Math.max(0, Math.min(index, total - 1));

        const currentCard = cards[currentIndex];
        if (currentCard) {
            track.scrollTo({
                left: currentCard.offsetLeft - track.offsetLeft,
                behavior: 'smooth'
            });
        }

        dots.forEach((dot, dotIndex) => {
            if (dotIndex === currentIndex) {
                dot.classList.add('is-active');
                dot.setAttribute('aria-current', 'true');
            } else {
                dot.classList.remove('is-active');
                dot.removeAttribute('aria-current');
            }
        });

        if (prevButton) {
            prevButton.disabled = currentIndex === 0;
        }
        if (nextButton) {
            nextButton.disabled = currentIndex === total - 1;
        }
    };

    dotsContainer.innerHTML = '';
    cards.forEach((_, index) => {
        const dot = createDot(index);
        dot.addEventListener('click', () => {
            updateCarousel(index);
        });
        dotsContainer.appendChild(dot);
    });
    dots = Array.from(dotsContainer.querySelectorAll('[data-knowledge-dot]'));

    prevButton?.addEventListener('click', () => {
        updateCarousel(currentIndex - 1);
    });

    nextButton?.addEventListener('click', () => {
        updateCarousel(currentIndex + 1);
    });

    carousel.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowLeft') {
            updateCarousel(currentIndex - 1);
        } else if (event.key === 'ArrowRight') {
            updateCarousel(currentIndex + 1);
        }
    });

    updateCarousel(0);
});
