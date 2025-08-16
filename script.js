// Initialize Feather Icons after DOM is loaded
// (Moved to the end of the file to avoid duplication)

// Mobile menu functionality
function toggleMobileMenu() {
    const mobileNav = document.getElementById('mobileNav');
    if (mobileNav) {
    mobileNav.classList.toggle('active');
        
        // Update menu icon
        const menuToggle = document.querySelector('[onclick="toggleMobileMenu()"] i');
        if (menuToggle) {
            if (mobileNav.classList.contains('active')) {
                menuToggle.setAttribute('data-feather', 'x');
            } else {
                menuToggle.setAttribute('data-feather', 'menu');
            }
            feather.replace();
        }
    }
}

// Scroll to section
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        // Close mobile menu if open
        closeMobileMenu();
        
        // Calculate offset for fixed header
        const headerHeight = document.querySelector('header').offsetHeight;
        const elementPosition = element.offsetTop - headerHeight - 20;
        
        window.scrollTo({
            top: elementPosition,
            behavior: 'smooth'
        });
    }
}

// Open WhatsApp
function openWhatsApp() {
    window.open('https://wa.me/5512988978104?text=Olá! Gostaria de agendar uma consulta.', '_blank');
}

// Open Google Maps
function openGoogleMaps() {
    const address = "Ark'tetura Humana, Rua Antônio Major Domingues, 357, Centro, São José dos Campos, SP";
    const encodedAddress = encodeURIComponent(address);
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
    window.open(mapsUrl, '_blank');
}

// Force re-render all Feather Icons (useful for debugging)
function forceRenderIcons() {
    if (typeof feather !== 'undefined') {
        feather.replace();
        console.log('Feather Icons re-rendered');
        
        // Check status after rendering
        setTimeout(() => {
            checkIconStatus();
        }, 100);
    } else {
        console.log('Feather Icons not available');
    }
}

// Check icon rendering status
function checkIconStatus() {
    const icons = document.querySelectorAll('i[data-feather]');
    const renderedIcons = document.querySelectorAll('i[data-feather] svg');
    const unrenderedIcons = document.querySelectorAll('i[data-feather]:not(svg)');
    
    console.log(`Icon Status: ${renderedIcons.length}/${icons.length} rendered`);
    
    if (unrenderedIcons.length > 0) {
        console.log('Unrendered icons:', Array.from(unrenderedIcons).map(icon => 
            icon.getAttribute('data-feather')
        ));
    }
    
    return { total: icons.length, rendered: renderedIcons.length, unrendered: unrenderedIcons.length };
}

// Handle form submission
function handleSubmit(event) {
    event.preventDefault();
    
    // Simulate form submission
    alert('Mensagem enviada com sucesso!\n\nEntrarei em contato com você em breve. Obrigada pelo interesse!');
    
    // Reset form
    event.target.reset();
}

// Scroll animations with improved performance
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    // Initialize animations for elements with fade-in-up class
    const fadeElements = document.querySelectorAll('.fade-in-up');
    fadeElements.forEach(el => observer.observe(el));

    // Ensure Feather Icons are properly rendered
    const ensureIconsRendered = () => {
        if (typeof feather !== 'undefined') {
            // Check if any icons are not rendered
            const unrenderedIcons = document.querySelectorAll('i[data-feather]:not(svg)');
            if (unrenderedIcons.length > 0) {
                console.log(`Re-rendering ${unrenderedIcons.length} unrendered icons`);
                feather.replace();
                
                // Double-check after a short delay
                setTimeout(() => {
                    const stillUnrendered = document.querySelectorAll('i[data-feather]:not(svg)');
                    if (stillUnrendered.length > 0) {
                        console.log(`Still ${stillUnrendered.length} unrendered icons, forcing again`);
                        feather.replace();
                    }
                }, 100);
            }
        }
    };

    // Initial icon rendering
    ensureIconsRendered();
    
    // Re-render icons after a short delay to ensure all elements are loaded
    setTimeout(ensureIconsRendered, 100);
    
    // Re-render icons after images and other resources are loaded
    window.addEventListener('load', () => {
        ensureIconsRendered();
        
        // Final check after everything is loaded
        setTimeout(() => {
            const status = checkIconStatus();
            if (status.unrendered > 0) {
                console.log('Final attempt to render remaining icons');
                feather.replace();
            }
        }, 500);
    });

    // Show WhatsApp float button after 3 seconds with smooth animation
    setTimeout(() => {
        const whatsappFloat = document.getElementById('whatsappFloat');
        if (whatsappFloat) {
        whatsappFloat.style.opacity = '0';
        whatsappFloat.style.transform = 'scale(0.8)';
        whatsappFloat.style.transition = 'all 0.4s ease';
        
        setTimeout(() => {
            whatsappFloat.style.opacity = '1';
            whatsappFloat.style.transform = 'scale(1)';
        }, 100);
        }
    }, 3000);

    // Add smooth scroll behavior for all internal links
    const internalLinks = document.querySelectorAll('a[onclick*="scrollToSection"]');
    internalLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const sectionId = link.getAttribute('onclick').match(/'([^']+)'/)[1];
            scrollToSection(sectionId);
        });
    });
});

// Header scroll effect with improved performance
let ticking = false;
function updateHeader() {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = 'none';
    }
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(updateHeader);
        ticking = true;
    }
});

// Close mobile menu when clicking on a link
function closeMobileMenu() {
    const mobileNav = document.getElementById('mobileNav');
    if (mobileNav) {
        mobileNav.classList.remove('active');
        
        // Reset menu icon
        const menuToggle = document.querySelector('[onclick="toggleMobileMenu()"] i');
        if (menuToggle) {
            menuToggle.setAttribute('data-feather', 'menu');
            feather.replace();
        }
    }
}

// Close mobile menu when clicking outside
document.addEventListener('click', function(event) {
    const mobileNav = document.getElementById('mobileNav');
    const menuToggle = document.querySelector('[onclick="toggleMobileMenu()"]');
    
    if (mobileNav && menuToggle && !mobileNav.contains(event.target) && !menuToggle.contains(event.target)) {
        closeMobileMenu();
    }
});

// Close mobile menu on window resize
window.addEventListener('resize', function() {
    if (window.innerWidth >= 1024) { // lg breakpoint
        closeMobileMenu();
    }
});

// Add touch support for mobile devices
document.addEventListener('touchstart', () => {}, {passive: true});

// Improve form accessibility
document.addEventListener('DOMContentLoaded', () => {
    const formInputs = document.querySelectorAll('input, textarea');
    formInputs.forEach(input => {
        // Add focus styles
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', () => {
            input.parentElement.classList.remove('focused');
        });
    });
});

// Add loading states for form submission
function setFormLoading(form, loading) {
    const submitBtn = form.querySelector('button[type="submit"]');
    if (submitBtn) {
        if (loading) {
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i data-feather="loader" width="16" height="16" class="animate-spin"></i> Enviando...';
            feather.replace();
        } else {
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<i data-feather="send" width="16" height="16"></i> Enviar Mensagem';
            feather.replace();
        }
    }
}

// Enhanced form submission with loading state
function handleSubmit(event) {
    event.preventDefault();
    const form = event.target;
    
    // Set loading state
    setFormLoading(form, true);
    
    // Simulate form submission delay
    setTimeout(() => {
        // Show success message
        alert('Mensagem enviada com sucesso!\n\nEntrarei em contato com você em breve. Obrigada pelo interesse!');
        
        // Reset form
        form.reset();
        
        // Reset loading state
        setFormLoading(form, false);
    }, 1500);
}

// Map functionality enhancement
function initMap() {
    const mapIframe = document.querySelector('iframe[src*="google.com/maps"]');
    const mapButton = document.querySelector('.absolute.bottom-6.right-6 button');
    const mapFallback = document.getElementById('mapFallback');
    
    if (mapIframe && mapButton) {
        console.log('Map iframe and button found');
        
        // Add loading state to iframe
        mapIframe.addEventListener('load', () => {
            console.log('Google Maps loaded successfully');
            // Hide fallback if it was showing
            if (mapFallback) {
                mapFallback.style.display = 'none';
            }
            // Add a subtle animation to the button when map loads
            mapButton.style.opacity = '0';
            mapButton.style.transform = 'translateY(20px) scale(0.9)';
            setTimeout(() => {
                mapButton.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
                mapButton.style.opacity = '1';
                mapButton.style.transform = 'translateY(0) scale(1)';
            }, 200);
        });
        
        // Handle iframe errors gracefully
        mapIframe.addEventListener('error', () => {
            console.log('Google Maps failed to load');
            showMapFallback();
        });
        
        // Add timeout to check if iframe loads within 10 seconds
        setTimeout(() => {
            if (mapIframe.contentDocument && mapIframe.contentDocument.readyState === 'complete') {
                console.log('Map loaded successfully');
            } else {
                console.log('Map loading timeout, showing fallback');
                showMapFallback();
            }
        }, 10000);
        
        // Add hover effects to button
        mapButton.addEventListener('mouseenter', () => {
            mapButton.style.transform = 'translateY(-2px) scale(1.02)';
        });
        
        mapButton.addEventListener('mouseleave', () => {
            mapButton.style.transform = 'translateY(0) scale(1)';
        });
    }
}

// Show map fallback when iframe fails
function showMapFallback() {
    const mapIframe = document.querySelector('iframe[src*="google.com/maps"]');
    const mapFallback = document.getElementById('mapFallback');
    
    if (mapIframe && mapFallback) {
        mapIframe.style.display = 'none';
        mapFallback.style.display = 'flex';
        console.log('Showing map fallback');
    }
}

// Typewriter effect for hero title
function initTypewriter() {
    const typewriterElement = document.getElementById('typewriter-text');
    if (!typewriterElement) return;
    
    const phrases = [
        'vida mais equilibrada',
        'mente mais tranquila',
        'jornada de evolução',
        'experiência única',
        'busca pela harmonia',
        'conexão com seu eu',
        'descoberta pessoal'
    ];
    
    let currentPhraseIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    function type() {
        const currentPhrase = phrases[currentPhraseIndex];
        
        if (isDeleting) {
            // Deletando caracteres
            typewriterElement.textContent = currentPhrase.substring(0, currentCharIndex - 1);
            currentCharIndex--;
            typingSpeed = 50; // Mais rápido para deletar
        } else {
            // Digitando caracteres
            typewriterElement.textContent = currentPhrase.substring(0, currentCharIndex + 1);
            currentCharIndex++;
            typingSpeed = 100; // Velocidade normal para digitar
        }
        
        // Lógica para alternar entre digitar e deletar
        if (!isDeleting && currentCharIndex === currentPhrase.length) {
            // Terminou de digitar, aguarda um pouco e começa a deletar
            typingSpeed = 2000; // Pausa de 2 segundos
            isDeleting = true;
        } else if (isDeleting && currentCharIndex === 0) {
            // Terminou de deletar, passa para a próxima frase
            isDeleting = false;
            currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
            typingSpeed = 500; // Pausa entre frases
        }
        
        setTimeout(type, typingSpeed);
    }
    
    // Inicia o efeito
    type();
}

// Initialize map when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize Feather Icons
    if (typeof feather !== 'undefined') {
        feather.replace();
    }
    
    // Initialize map functionality
    initMap();
    
    // Initialize typewriter effect
    initTypewriter();
});
