// ============================================
// SIGNATURE EVENTS PLANNER - JAVASCRIPT
// ============================================

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // ===== MOBILE MENU TOGGLE =====
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Change icon
            const icon = menuToggle.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
        
        // Close menu when clicking on a link
        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            });
        });
    }
    
    // ===== GALLERY FILTERS =====
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    if (filterButtons.length > 0 && galleryItems.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                // Get filter value
                const filterValue = this.getAttribute('data-filter');
                
                // Filter gallery items
                galleryItems.forEach(item => {
                    if (filterValue === 'all') {
                        item.style.display = 'block';
                        // Add fade-in animation
                        item.style.animation = 'fadeInUp 0.5s ease-out';
                    } else {
                        const itemCategory = item.getAttribute('data-category');
                        if (itemCategory === filterValue) {
                            item.style.display = 'block';
                            item.style.animation = 'fadeInUp 0.5s ease-out';
                        } else {
                            item.style.display = 'none';
                        }
                    }
                });
            });
        });
    }
    
    // ===== CONTACT FORM HANDLING =====
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const name = document.getElementById('name').value;
            const phone = document.getElementById('phone').value;
            const email = document.getElementById('email').value;
            const eventType = document.getElementById('eventType').value;
            const service = document.getElementById('service').value;
            const message = document.getElementById('message').value;
            
            // Create WhatsApp message
            let whatsappMessage = `Bonjour Signature Events Planner,%0A%0A`;
            whatsappMessage += `Je souhaite discuter de mon projet d'événement.%0A%0A`;
            whatsappMessage += `📝 *Mes informations :*%0A`;
            whatsappMessage += `Nom : ${encodeURIComponent(name)}%0A`;
            whatsappMessage += `Téléphone : ${encodeURIComponent(phone)}%0A`;
            if (email) {
                whatsappMessage += `Email : ${encodeURIComponent(email)}%0A`;
            }
            whatsappMessage += `%0A🎉 *Type d'événement :* ${encodeURIComponent(eventType)}%0A`;
            if (service) {
                whatsappMessage += `*Service souhaité :* ${encodeURIComponent(service)}%0A`;
            }
            whatsappMessage += `%0A💬 *Message :*%0A${encodeURIComponent(message)}%0A%0A`;
            whatsappMessage += `Merci de me recontacter rapidement.`;
            
            // Redirect to WhatsApp
            const whatsappURL = `https://wa.me/221773908881?text=${whatsappMessage}`;
            window.open(whatsappURL, '_blank');
            
            // Show success message
            if (formMessage) {
                formMessage.style.display = 'block';
                formMessage.style.padding = '1rem';
                formMessage.style.borderRadius = '8px';
                formMessage.style.background = 'linear-gradient(135deg, rgba(37, 211, 102, 0.1), rgba(37, 211, 102, 0.05))';
                formMessage.style.border = '2px solid var(--whatsapp-green)';
                formMessage.style.color = 'var(--dark-color)';
                formMessage.innerHTML = `
                    <i class="fab fa-whatsapp" style="color: var(--whatsapp-green); font-size: 2rem; margin-bottom: 0.5rem;"></i>
                    <p style="margin: 0; font-weight: 500;">Vous allez être redirigé vers WhatsApp pour finaliser votre demande.</p>
                    <p style="margin-top: 0.5rem; font-size: 0.9rem; color: #666;">Si la redirection ne fonctionne pas, contactez-nous directement au +221 77 390 88 81</p>
                `;
            }
            
            // Optional: Reset form after a delay
            setTimeout(() => {
                contactForm.reset();
            }, 2000);
        });
    }
    
    // ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.length > 1) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
    
    // ===== SCROLL TO TOP ON PAGE LOAD =====
    window.scrollTo(0, 0);
    
    // ===== ADD ANIMATION ON SCROLL =====
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe cards, values, and other elements
    const elementsToAnimate = document.querySelectorAll('.card, .value-card, .service-card, .process-step, .gallery-item');
    elementsToAnimate.forEach(element => {
        observer.observe(element);
    });
    
    // ===== HEADER SHADOW ON SCROLL =====
    const header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.15)';
            } else {
                header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
            }
        });
    }
    
    // ===== WHATSAPP FLOAT BUTTON ANIMATION =====
    const whatsappFloat = document.querySelector('.whatsapp-float');
    if (whatsappFloat) {
        // Pulse animation every 3 seconds
        setInterval(() => {
            whatsappFloat.style.animation = 'none';
            setTimeout(() => {
                whatsappFloat.style.animation = 'pulse 0.5s ease-in-out';
            }, 10);
        }, 3000);
    }
    
    // ===== LOG CONSOLE MESSAGE =====
    console.log('%c✨ Signature Events Planner', 'font-size: 20px; font-weight: bold; color: #D4AF37;');
    console.log('%cVotre événement, notre signature', 'font-size: 14px; color: #8B9D83;');
    console.log('%c📞 +221 77 390 88 81 | 📧 signatureeventsplanner10@gmail.com', 'font-size: 12px; color: #666;');
});

// ===== ADD PULSE ANIMATION TO CSS =====
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.1); }
        100% { transform: scale(1); }
    }
`;
document.head.appendChild(style);