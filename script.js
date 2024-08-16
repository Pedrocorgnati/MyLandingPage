const translations = {
    en: {
        "profile-title": "Corgnati Developer Professional Profile",
        "profile-subtitle": "Front-End Developer & AI Enthusiast",
        "portfolio-btn": "View My Portfolio",
        "about-title": "About Me",
        "about-text1": "I am a versatile professional with a strong foundation in business management and a growing expertise in technology.",
        "about-text2": "In 2018, I transitioned into programming and founded SuppleSeller, later managing Litoral Fit Suplementos. Since 2023, I've been focused on programming and artificial intelligence, pursuing multiple advanced degrees, including AI and Machine Learning, Software Engineering, and AI in Healthcare Services.",
        "tech-title": "Technologies:",
        "footer-text": "© 2024 Corgnati Developer. All rights reserved."
    },
    it: {
        "profile-title": "Profilo Professionale di Corgnati Developer",
        "profile-subtitle": "Sviluppatore Front-End & Appassionato di AI",
        "portfolio-btn": "Guarda il Mio Portfolio",
        "about-title": "Su di Me",
        "about-text1": "Sono un professionista versatile con una solida base nella gestione aziendale e una crescente esperienza nella tecnologia.",
        "about-text2": "Nel 2018, sono passato alla programmazione e ho fondato SuppleSeller, gestendo successivamente Litoral Fit Suplementos. Dal 2023, mi sono concentrato sulla programmazione e sull'intelligenza artificiale, perseguendo diversi diplomi avanzati, inclusi AI e Machine Learning, Ingegneria del Software e AI nei Servizi Sanitari.",
        "tech-title": "Tecnologie:",
        "footer-text": "© 2024 Corgnati Developer. Tutti i diritti riservati."
    }
};

function translatePage(language) {
    document.querySelectorAll("[data-key]").forEach(element => {
        const key = element.getAttribute("data-key");
        element.textContent = translations[language][key];
    });
}

// Example contact form handler (unchanged)
document.getElementById("contact-form").addEventListener("submit", function(event) {
    event.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    alert(`Thank you, ${name}! Your message has been sent. I'll get back to you at ${email} soon.`);
    
    // Optionally, reset the form fields after submission
    document.getElementById("contact-form").reset();
});
