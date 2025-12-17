(() => {
    const carousel = document.querySelector('.projects-carousel');
    if (!carousel) return;

    const viewport = carousel.querySelector('.projects-carousel__viewport');
    const track = carousel.querySelector('.projects-carousel__track');
    const slides = Array.from(carousel.querySelectorAll('.projects-carousel__slide'));
    const prevButton = carousel.querySelector('.projects-carousel__nav--prev');
    const nextButton = carousel.querySelector('.projects-carousel__nav--next');
    const indicator = carousel.querySelector('.projects-carousel__indicator');

    let slidesPerView = getSlidesPerView();
    let currentPage = 0;
    let startX = 0;
    let deltaX = 0;
    let isTouching = false;
    let resizeTimeout;

    setSlideWidths();
    update();

    prevButton.addEventListener('click', () => goTo(currentPage - 1));
    nextButton.addEventListener('click', () => goTo(currentPage + 1));
    viewport.addEventListener('keydown', handleKeydown);

    viewport.addEventListener('touchstart', handleTouchStart, { passive: true });
    viewport.addEventListener('touchmove', handleTouchMove, { passive: true });
    viewport.addEventListener('touchend', handleTouchEnd);
    viewport.addEventListener('touchcancel', handleTouchEnd);

    window.addEventListener('resize', handleResize);

    function getSlidesPerView() {
        return window.innerWidth <= 768 ? 1 : 2;
    }

    function getTotalPages() {
        return Math.max(1, Math.ceil(slides.length / slidesPerView));
    }

    function setSlideWidths() {
        const basis = 100 / slidesPerView;
        slides.forEach((slide) => {
            slide.style.flexBasis = `${basis}%`;
        });
    }

    function goTo(page) {
        const maxPage = getTotalPages() - 1;
        currentPage = Math.min(Math.max(0, page), maxPage);
        update();
    }

    function update() {
        const offset = (100 / slidesPerView) * currentPage;
        track.style.transform = `translateX(-${offset}%)`;
        updateActiveSlides();
        updateControls();
    }

    function updateActiveSlides() {
        const start = currentPage * slidesPerView;
        const end = start + slidesPerView;

        slides.forEach((slide, index) => {
            const inView = index >= start && index < end;
            slide.classList.toggle('is-active', inView);
        });
    }

    function updateControls() {
        const pages = getTotalPages();
        indicator.textContent = `${Math.min(currentPage + 1, pages)} / ${pages}`;
        prevButton.disabled = currentPage === 0;
        nextButton.disabled = currentPage >= pages - 1;
    }

    function handleResize() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            const nextSlidesPerView = getSlidesPerView();
            if (nextSlidesPerView === slidesPerView) return;

            slidesPerView = nextSlidesPerView;
            setSlideWidths();
            goTo(currentPage); // clamps to new bounds
        }, 150);
    }

    function handleKeydown(event) {
        if (event.key === 'ArrowLeft') {
            event.preventDefault();
            goTo(currentPage - 1);
        } else if (event.key === 'ArrowRight') {
            event.preventDefault();
            goTo(currentPage + 1);
        }
    }

    function handleTouchStart(event) {
        if (!event.touches || !event.touches.length) return;
        startX = event.touches[0].clientX;
        deltaX = 0;
        isTouching = true;
        track.classList.add('is-dragging');
    }

    function handleTouchMove(event) {
        if (!isTouching || !event.touches || !event.touches.length) return;
        const currentX = event.touches[0].clientX;
        deltaX = currentX - startX;

        const viewportWidth = viewport.offsetWidth || 1;
        const percentDelta = (deltaX / viewportWidth) * 100;
        const baseOffset = (100 / slidesPerView) * currentPage;

        track.style.transform = `translateX(calc(-${baseOffset}% + ${percentDelta}%))`;
    }

    function handleTouchEnd() {
        if (!isTouching) return;
        isTouching = false;
        track.classList.remove('is-dragging');

        const threshold = (viewport.offsetWidth || 1) * 0.12;
        if (Math.abs(deltaX) > threshold) {
            if (deltaX < 0) {
                goTo(currentPage + 1);
            } else {
                goTo(currentPage - 1);
            }
        } else {
            update();
        }

        deltaX = 0;
    }
})();
