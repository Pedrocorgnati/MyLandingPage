document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.querySelector('[data-projects-carousel]');
    const track = document.querySelector('[data-projects-track]');
    const dotsContainer = document.querySelector('[data-projects-dots]');
    const filtersContainer = document.querySelector('[data-projects-filters]');
    const prevButton = document.querySelector('[data-projects-prev]');
    const nextButton = document.querySelector('[data-projects-next]');

    if (!carousel || !track || !dotsContainer || !filtersContainer) {
        return;
    }

    const filters = [
        { id: 'all', label: 'All' },
        { id: 'saas', label: 'SaaS' },
        { id: 'landing', label: 'Landing Page' },
        { id: 'dashboard', label: 'Dashboard' },
        { id: 'ecommerce', label: 'E-commerce' },
        { id: 'software', label: 'Software' },
        { id: 'blockchain', label: 'Blockchain' }
    ];

    const projects = [
        {
            id: 'piemontech',
            title: 'Piemontech',
            description: 'Full-stack B2B platform built for an Italian tech studio serving SMEs, combining an institutional website, automated landing page builder with Stripe checkout, AI-powered business diagnostics, B2B prospecting engine, and affiliate partner system. Delivers a complete commercial ecosystem with admin dashboard, partner portal, and automated provisioning.',
            video: './assets/video/piemontech.mp4',
            filters: ['saas', 'software', 'dashboard'],
            techLabels: ['Next.js', 'TypeScript', 'Stripe', 'Prisma', 'Claude AI']
        },
        {
            id: 'bicoja',
            title: 'BicoJá',
            description: 'Complete marketplace platform connecting clients to independent professionals for on-demand services. Built with a fast, responsive web app and a React Native mobile companion, it features a virtual currency system for contact purchases, premium subscriptions with exclusive benefits, real-time notifications, and a powerful admin dashboard for seamless operation management.',
            video: './assets/video/bicoja.mp4',
            filters: ['saas', 'software', 'dashboard'],
            techLabels: ['Next.js', 'React Native', 'Prisma', 'Stripe', 'TypeScript']
        },
        {
            id: 'abitare-holding',
            title: 'Abitare Holding',
            description: 'Corporate website for an Italian real estate holding company, showcasing three complementary businesses in a cohesive digital experience. Built with Astro for blazing-fast performance, featuring smooth scroll animations, video backgrounds, and a conversion-focused layout designed to attract investors and partners.',
            video: './assets/video/abitare-holding.mp4',
            filters: ['landing'],
            techLabels: ['Astro', 'Tailwind CSS', 'TypeScript']
        },
        {
            id: 'personal-website',
            title: 'Personal Website',
            description: 'Personal portfolio website designed to present my frontend expertise, professional background, and real-world projects in a clear and engaging way. Built with a strong visual identity, fast performance, and smooth navigation to create a confident first impression for clients and recruiters.',
            video: './assets/video/Personal-Resume-Website.mp4',
            filters: ['landing'],
            techLabels: ['Next.js', 'React', 'Bootstrap']
        },
        {
            id: 'suppleseller',
            title: 'Suppleseller',
            description: 'Complete e-commerce platform built for a sports nutrition retailer, combining a fast, responsive storefront with a powerful admin dashboard. Designed to scale real operations, it delivers smooth shopping flows, efficient product and order management, and a clean, reliable experience across devices.',
            video: './assets/video/Suppleseller.mp4',
            filters: ['ecommerce', 'dashboard', 'software', 'saas'],
            techLabels: ['Next.js', 'React', 'Node.js', 'TypeScript']
        },
        {
            id: 'quackcoin',
            title: 'QuackCoin',
            description: 'High-conversion landing page for a crypto utility ecosystem, built with bold visuals, playful brand voice, and clear CTAs. Designed to drive waitlist signups with a custom form flow, UTM tracking, and HubSpot integration, while keeping the experience fast, responsive, and engaging on any device.',
            video: './assets/video/Quackcoin.mp4',
            filters: ['landing', 'blockchain'],
            techLabels: ['HTML', 'CSS', 'TypeScript']
        },
        {
            id: 'apexcrypto',
            title: 'ApexCrypto Website',
            description: 'Conversion-focused landing page for a crypto education platform, combining bold visuals, video hero sections, and clear pricing presentation. Built for speed and responsiveness, the site delivers trust, clarity, and a strong brand presence across all devices.',
            video: './assets/video/Apexcrypto-website.mp4',
            filters: ['landing', 'dashboard', 'blockchain'],
            techLabels: ['Next.js', 'React', 'Sass', 'Node.js']
        },
        {
            id: 'scoretube',
            title: 'Scoretube Landing Page',
            description: 'High-conversion landing page for an AI-powered platform that helps users evaluate YouTube videos before watching. Designed to communicate value instantly, drive installs, and guide visitors through a localized, responsive experience with clear messaging and strong calls to action.',
            video: './assets/video/Scoretube-landing.mp4',
            filters: ['landing', 'dashboard', 'software', 'saas'],
            techLabels: ['Next.js', 'React', 'Tailwind CSS', 'TypeScript']
        },
        {
            id: 'ninekeys',
            title: 'NineKeys Landing Page',
            description: 'Premium landing page for a boutique property management brand, focused on storytelling, trust, and conversion. Built with crisp typography, immersive video sections, and a smooth, responsive flow that highlights the 9-step method and real results.',
            video: './assets/video/Ninekeys.mp4',
            filters: ['landing'],
            techLabels: ['HTML', 'CSS', 'JavaScript', 'TypeScript']
        },
        {
            id: 'apexswift',
            title: 'ApexSwift Dashboard',
            description: 'Responsive Next.js dashboard created for a technology company focused on turning ideas into global businesses. Built to handle data-heavy finance operations, with interactive charts, user management, and a clean, scalable interface optimized for desktop and mobile use.',
            video: './assets/video/ApexSwift-dashboard.mp4',
            filters: ['dashboard', 'blockchain'],
            techLabels: ['Next.js', 'React', 'Tailwind CSS', 'Node.js']
        },
        {
            id: 'passkey',
            title: 'Passkey Dashboard',
            description: 'Production-ready Next.js dashboard for marketing teams to manage campaigns, workspaces, and creative assets. Features fast navigation, advanced filtering, data-rich tables, and a polished interface designed to support complex, real-world workflows.',
            video: './assets/video/Passkey-dashboard.mp4',
            filters: ['dashboard'],
            techLabels: ['Next.js', 'React', 'TypeScript', 'Sass']
        },
        {
            id: 'zenminder',
            title: 'ZenMinder',
            description: 'Productivity web platform that blends a marketing site with a full dashboard experience. Features email/Google authentication with verification, reminder management, phone verification via API, profile and payment sections, and a rewards marketplace. Built with a responsive, modular UI, smooth routing, and centralized state management for a reliable day-to-day workflow.',
            video: './assets/video/Zenminder.mp4',
            filters: ['dashboard', 'saas', 'software', 'landing'],
            techLabels: ['React', 'TypeScript', 'Firebase', 'Sass']
        },
        {
            id: 'cognuscraft-landing',
            title: 'Cognuscraft Landing Page',
            description: 'Brand-focused landing page for Cognuscraft, the company behind some technologies. Presents the mission of empowering humanity through Technology and AI, highlights flagship products, and provides clear paths to privacy policy and contact. Built to communicate credibility, purpose, and innovation with a clean, responsive layout.',
            video: './assets/video/Cognuscraft.mp4',
            filters: ['landing'],
            techLabels: ['HTML', 'CSS', 'JavaScript']
        }
    ];

    const createCard = (project) => {
        const card = document.createElement('article');
        card.className = 'projects-card';
        card.setAttribute('data-project-id', project.id);

        const techChips = project.techLabels
            .map((label) => `<span class="projects-card__chip">${label}</span>`)
            .join('');

        card.innerHTML = `
            <div class="projects-card__video">
                <video class="projects-card__video-player" autoplay loop muted playsinline preload="metadata">
                    <source src="${project.video}" type="video/mp4">
                </video>
            </div>
            <div class="projects-card__content">
                <h3 class="projects-card__title">${project.title}</h3>
                <div class="projects-card__tech" aria-label="Technologies used">
                    ${techChips}
                </div>
                <p class="projects-card__description">${project.description}</p>
            </div>
        `;

        return card;
    };

    const createDot = (index) => {
        const dot = document.createElement('button');
        dot.className = 'projects-carousel__dot';
        dot.setAttribute('type', 'button');
        dot.setAttribute('data-projects-dot', String(index));
        dot.setAttribute('aria-label', `Go to project ${index + 1}`);
        return dot;
    };

    let currentIndex = 0;
    let visibleProjects = [...projects];
    let dots = [];

    const updateCarousel = (index) => {
        const total = visibleProjects.length;
        if (total === 0) {
            if (prevButton) prevButton.disabled = true;
            if (nextButton) nextButton.disabled = true;
            return;
        }

        currentIndex = Math.max(0, Math.min(index, total - 1));

        const cards = track.children;
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

    const renderProjects = (filterId) => {
        const normalizedFilter = filterId === 'all' ? null : filterId;
        visibleProjects = normalizedFilter
            ? projects.filter((project) => project.filters.includes(normalizedFilter))
            : [...projects];

        track.innerHTML = '';
        dotsContainer.innerHTML = '';

        visibleProjects.forEach((project, index) => {
            track.appendChild(createCard(project));
            dotsContainer.appendChild(createDot(index));
        });

        dots = Array.from(dotsContainer.querySelectorAll('[data-projects-dot]'));
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                updateCarousel(index);
            });
        });

        currentIndex = 0;
        updateCarousel(0);
    };

    const createFilterButton = (filter) => {
        const button = document.createElement('button');
        button.className = 'projects-filter';
        button.type = 'button';
        button.textContent = filter.label;
        button.setAttribute('data-filter', filter.id);
        button.setAttribute('aria-pressed', 'false');
        return button;
    };

    const setActiveFilter = (filterId) => {
        filtersContainer.querySelectorAll('.projects-filter').forEach((button) => {
            const isActive = button.getAttribute('data-filter') === filterId;
            button.classList.toggle('is-active', isActive);
            button.setAttribute('aria-pressed', isActive ? 'true' : 'false');
        });
    };

    filters.forEach((filter) => {
        const button = createFilterButton(filter);
        button.addEventListener('click', () => {
            setActiveFilter(filter.id);
            renderProjects(filter.id);
        });
        filtersContainer.appendChild(button);
    });

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

    setActiveFilter('all');
    renderProjects('all');
});
