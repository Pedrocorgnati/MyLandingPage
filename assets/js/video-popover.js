document.addEventListener('DOMContentLoaded', () => {
    const popover = document.getElementById('video-popover');
    const player = document.getElementById('video-popover-player');
    let lastTrigger = null;
    let previousBodyOverflow = '';

    if (!popover || !player) {
        return;
    }

    const closePopover = () => {
        popover.classList.remove('is-visible');
        popover.setAttribute('aria-hidden', 'true');
        player.pause();
        player.removeAttribute('src');
        player.load();
        document.body.style.overflow = previousBodyOverflow;

        if (lastTrigger) {
            lastTrigger.focus();
        }
    };

    const openPopover = (videoPath, trigger) => {
        lastTrigger = trigger;
        player.setAttribute('src', videoPath);
        player.load();
        previousBodyOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        popover.classList.add('is-visible');
        popover.setAttribute('aria-hidden', 'false');
        player.focus({ preventScroll: true });
        player.play().catch(() => {
            // Auto-play might be blocked; allow manual play
        });
    };

    const getVideoPathFromProject = (projectContainer) => {
        const image = projectContainer.querySelector('picture img');
        if (!image) {
            return null;
        }

        const src = image.getAttribute('src') || '';
        const fileName = src.split('/').pop();

        if (!fileName) {
            return null;
        }

        const baseName = fileName.split('.').slice(0, -1).join('.');
        return baseName ? `./assets/video/${baseName}.mp4` : null;
    };

    popover.addEventListener('click', (event) => {
        if (event.target === popover || event.target.hasAttribute('data-popover-close')) {
            closePopover();
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && popover.classList.contains('is-visible')) {
            closePopover();
        }
    });

    document.querySelectorAll('.user-projects').forEach((project) => {
        const trigger = project.querySelector('.project-video-trigger');
        if (!trigger) {
            return;
        }

        const videoPath = getVideoPathFromProject(project);
        if (!videoPath) {
            trigger.disabled = true;
            return;
        }

        trigger.addEventListener('click', () => openPopover(videoPath, trigger));
    });
});
