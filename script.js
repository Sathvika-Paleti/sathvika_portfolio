document.addEventListener('DOMContentLoaded', () => {

    /* --- 1. DOM Elements --- */
    const themeBtn = document.getElementById('theme-toggle');
    const body = document.body;
    const navbar = document.getElementById('navbar');
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileNav = document.getElementById('mobile-nav');
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    const typingText = document.getElementById('typing-text');
    const revealElements = document.querySelectorAll('.reveal-up');
    const progressBars = document.querySelectorAll('.progress');


    /* --- 2. Theme Toggle (Dark/Light Mode) --- */
    // Check local storage for theme preference
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme) {
        body.classList.remove('dark-mode', 'light-mode');
        body.classList.add(currentTheme);
        updateThemeIcon(currentTheme);
    } else {
        // Default to dark mode
        updateThemeIcon('dark-mode');
    }

    themeBtn.addEventListener('click', () => {
        if (body.classList.contains('dark-mode')) {
            body.classList.replace('dark-mode', 'light-mode');
            localStorage.setItem('theme', 'light-mode');
            updateThemeIcon('light-mode');
        } else {
            body.classList.replace('light-mode', 'dark-mode');
            localStorage.setItem('theme', 'dark-mode');
            updateThemeIcon('dark-mode');
        }
    });

    function updateThemeIcon(theme) {
        const icon = themeBtn.querySelector('i');
        if (theme === 'dark-mode') {
            icon.className = 'fa-solid fa-sun';
        } else {
            icon.className = 'fa-solid fa-moon';
        }
    }


    /* --- 3. Mobile Navigation Toggle --- */
    mobileMenuBtn.addEventListener('click', () => {
        mobileNav.classList.toggle('active');
        const icon = mobileMenuBtn.querySelector('i');
        if (mobileNav.classList.contains('active')) {
            icon.className = 'fa-solid fa-xmark';
        } else {
            icon.className = 'fa-solid fa-bars';
        }
    });

    // Close mobile menu when a link is clicked
    document.querySelectorAll('.mobile-link').forEach(link => {
        link.addEventListener('click', () => {
            mobileNav.classList.remove('active');
            mobileMenuBtn.querySelector('i').className = 'fa-solid fa-bars';
        });
    });


    /* --- 4. Sticky Navbar & Scroll To Top Button --- */
    window.addEventListener('scroll', () => {
        // Sticky Navbar
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Scroll To Top Button Visibility
        if (window.scrollY > 500) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }
    });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });


    /* --- 5. Typing Animation (Hero Section) --- */
    const words = ["Software Developer", "Problem Solver", "Web Developer"];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function typeEffect() {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            typingText.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50; // Faster deletion
        } else {
            typingText.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100; // Normal typing
        }

        // Behavior logic
        if (!isDeleting && charIndex === currentWord.length) {
            // Word completed, pause before deleting
            typingSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typingSpeed = 500; // Pause before typing new word
        }

        setTimeout(typeEffect, typingSpeed);
    }
    
    // Start typing effect slightly after load
    setTimeout(typeEffect, 1000);


    /* --- 6. Scroll Reveal Animation using IntersectionObserver --- */
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                
                // If it's the skills section, animate progress bars
                if (entry.target.closest('#skills')) {
                    progressBars.forEach(bar => {
                        bar.classList.add('animate');
                    });
                }
                
                // Optional: Stop observing once revealed
                // observer.unobserve(entry.target); 
            }
        });
    }, {
        threshold: 0.15, // Trigger when 15% is visible
        rootMargin: "0px 0px -50px 0px"
    });

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

});
