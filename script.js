// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme') || 'dark-mode';
body.classList.add(savedTheme);
updateThemeIcon(savedTheme);

themeToggle.addEventListener('click', () => {
    if (body.classList.contains('dark-mode')) {
        body.classList.remove('dark-mode');
        body.classList.add('light-mode');
        localStorage.setItem('theme', 'light-mode');
    } else {
        body.classList.remove('light-mode');
        body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark-mode');
    }
    updateThemeIcon(body.classList.contains('dark-mode') ? 'dark-mode' : 'light-mode');
});

function updateThemeIcon(theme) {
    const moonIcon = themeToggle.querySelector('.fa-moon');
    const sunIcon = themeToggle.querySelector('.fa-sun');
    
    if (theme === 'dark-mode') {
        moonIcon.style.display = 'block';
        sunIcon.style.display = 'none';
    } else {
        moonIcon.style.display = 'none';
        sunIcon.style.display = 'block';
    }
}

// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if(targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if(targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Projects data
const projectsData = [
    {
        title: "Volt-Find",
        description: "EV Charging Station Finder with real-time availability and accurate location data for seamless electric vehicle charging.",
        tech: "Dart / Flutter",
        category: "mobile",
        icon: "fas fa-charging-station"
    },
    {
        title: "SwimTrack",
        description: "Swimming Management System with role-based dashboards, class scheduling, attendance tracking, and performance monitoring.",
        tech: "Flutter / Firebase",
        category: "mobile",
        icon: "fas fa-swimmer"
    },
    {
        title: "SL Traffic Signs",
        description: "Mobile learning app to help users understand and identify official Sri Lankan road and traffic signs.",
        tech: "Dart / Flutter",
        category: "mobile",
        icon: "fas fa-traffic-light"
    },
    {
        title: "Expense Tracker",
        description: "Track daily expenses with an intuitive interface and comprehensive financial reporting features.",
        tech: "Java / SQLite",
        category: "desktop",
        icon: "fas fa-chart-line"
    },
    {
        title: "Cinnaro",
        description: "E-commerce platform for selling authentic cinnamon products from Sri Lanka with seamless shopping experience.",
        tech: "Java / Firebase",
        category: "web",
        icon: "fas fa-store"
    },
    {
        title: "V-Audio Player",
        description: "Lightweight music player with clean UI and personal music library management capabilities.",
        tech: "React Native",
        category: "mobile",
        icon: "fas fa-music"
    },
    {
        title: "VPQR Scanner",
        description: "QR Scanner with real-time scanning, history storage, gallery scanning, and QR code generator functionality.",
        tech: "Flutter",
        category: "mobile",
        icon: "fas fa-qrcode"
    },
    {
        title: "VP Doc Scanner",
        description: "Mobile app for scanning, editing, and managing documents with advanced image processing features.",
        tech: "Flutter",
        category: "mobile",
        icon: "fas fa-file-alt"
    },
    {
        title: "Screen Recorder",
        description: "Lightweight screen recorder with Tkinter GUI for recording full screen with system audio and microphone input.",
        tech: "Python / Tkinter",
        category: "desktop",
        icon: "fas fa-video"
    },
    {
        title: "All-in-One POS & Business Management",
        description: "Full-featured Windows-based Point of Sale and business management system with modules for POS, Inventory, Customers, Reports, Authentication, Sync, and Settings. Features real-time inventory tracking, customer loyalty management, multi-user roles, Google Sheets sync, and thermal receipt printing. Built with a custom Dart WebSocket barcode scanning system and a hardware-locked SHA-256 license key system. Deployed to beta clients in Sri Lanka as an offline-first packaged EXE application.",
        tech: "Flutter / Dart / SQLite",
        category: "desktop",
        icon: "fas fa-cash-register"
    }
];

// Function to render projects
function renderProjects(filter = 'all') {
    const projectsGrid = document.querySelector('.projects-grid');
    projectsGrid.innerHTML = '';
    
    const filteredProjects = filter === 'all' 
        ? projectsData 
        : projectsData.filter(project => project.category === filter);
    
    filteredProjects.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        projectCard.setAttribute('data-category', project.category);
        
        projectCard.innerHTML = `
            <div class="project-header">
                <h3 class="project-title">
                    <i class="${project.icon}"></i>
                    ${project.title}
                </h3>
                <span class="project-tech">${project.tech}</span>
            </div>
            <div class="project-content">
                <p class="project-description">${project.description}</p>
            </div>
        `;
        
        // Add click animation
        projectCard.addEventListener('click', function() {
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
        
        projectsGrid.appendChild(projectCard);
    });
    
    // Update slider controls visibility
    updateSliderControls();
}

// Function to update slider controls
function updateSliderControls() {
    const projectsGrid = document.querySelector('.projects-grid');
    const scrollLeftBtn = document.getElementById('scrollLeft');
    const scrollRightBtn = document.getElementById('scrollRight');
    
    // Only show controls on mobile
    if (window.innerWidth <= 768) {
        // Check if scrolling is needed
        if (projectsGrid.scrollWidth > projectsGrid.clientWidth) {
            document.querySelector('.projects-slider-controls').style.display = 'flex';
            
            // Update arrow states
            updateArrowStates();
        } else {
            document.querySelector('.projects-slider-controls').style.display = 'none';
        }
    } else {
        document.querySelector('.projects-slider-controls').style.display = 'none';
    }
}

// Update arrow states
function updateArrowStates() {
    const projectsGrid = document.querySelector('.projects-grid');
    const scrollLeftBtn = document.getElementById('scrollLeft');
    const scrollRightBtn = document.getElementById('scrollRight');
    
    if (scrollLeftBtn && scrollRightBtn) {
        scrollLeftBtn.disabled = projectsGrid.scrollLeft <= 0;
        scrollRightBtn.disabled = projectsGrid.scrollLeft + projectsGrid.clientWidth >= projectsGrid.scrollWidth - 1;
    }
}

// Initialize projects
document.addEventListener('DOMContentLoaded', () => {
    renderProjects();
    
    // Filter projects
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            // Get filter value
            const filter = button.getAttribute('data-filter');
            
            // Render filtered projects
            renderProjects(filter);
        });
    });
    
    // Form submission
    const contactForm = document.getElementById('contactForm');
    if(contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Simple validation
            if(name && email && message) {
                // In a real application, you would send this data to a server
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                successMessage.innerHTML = `
                    <i class="fas fa-check-circle"></i>
                    <span>Thank you ${name}! Your message has been sent. I'll get back to you soon at ${email}.</span>
                `;
                successMessage.style.cssText = `
                    background: linear-gradient(135deg, var(--yellow-primary), var(--yellow-secondary));
                    color: #1e293b;
                    padding: 15px 20px;
                    border-radius: 10px;
                    margin-top: 20px;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    font-weight: 500;
                `;
                
                contactForm.appendChild(successMessage);
                contactForm.reset();
                
                // Remove success message after 5 seconds
                setTimeout(() => {
                    successMessage.remove();
                }, 5000);
            } else {
                alert('Please fill in all fields.');
            }
        });
    }
    
    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if(window.scrollY > 50) {
            navbar.style.backgroundColor = 'rgba(15, 23, 42, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
        } else {
            navbar.style.backgroundColor = 'rgba(15, 23, 42, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
        }
    });
    
    // Project slider controls
    const projectsGrid = document.querySelector('.projects-grid');
    const scrollLeftBtn = document.getElementById('scrollLeft');
    const scrollRightBtn = document.getElementById('scrollRight');
    
    if (scrollLeftBtn && scrollRightBtn) {
        scrollLeftBtn.addEventListener('click', () => {
            projectsGrid.scrollBy({
                left: -320,
                behavior: 'smooth'
            });
        });
        
        scrollRightBtn.addEventListener('click', () => {
            projectsGrid.scrollBy({
                left: 320,
                behavior: 'smooth'
            });
        });
        
        // Update arrow states on scroll
        projectsGrid.addEventListener('scroll', updateArrowStates);
    }
    
    // Update on window resize
    window.addEventListener('resize', updateSliderControls);
    
    // Add fade-in animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                
                // Animate skill bars when skills section is visible
                if(entry.target.id === 'skills') {
                    animateSkillBars();
                }
            }
        });
    }, observerOptions);
    
    // Observe all sections
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
    
    // Add skill bar animation
    function animateSkillBars() {
        const skillBars = document.querySelectorAll('.skill-progress');
        skillBars.forEach(bar => {
            const width = bar.style.width;
            bar.style.width = '0';
            setTimeout(() => {
                bar.style.width = width;
            }, 300);
        });
    }
});

// Add CSS for fade-in animation
const style = document.createElement('style');
style.textContent = `
    .fade-in {
        animation: fadeIn 0.8s ease forwards;
    }
    
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    section {
        opacity: 0;
    }
    
    /* Custom scrollbar */
    ::-webkit-scrollbar {
        width: 10px;
    }
    
    ::-webkit-scrollbar-track {
        background: var(--secondary-dark);
    }
    
    ::-webkit-scrollbar-thumb {
        background: linear-gradient(135deg, var(--yellow-primary), var(--yellow-secondary));
        border-radius: 5px;
    }
    
    ::-webkit-scrollbar-thumb:hover {
        background: linear-gradient(135deg, var(--yellow-secondary), var(--yellow-accent));
    }
`;
document.head.appendChild(style);