// Clean JavaScript for Indie Twist Restaurant

document.addEventListener('DOMContentLoaded', function() {
    // Initialize loading screen first
    initLoadingScreen();
    
    // Initialize all functionality after loading
    setTimeout(() => {
        initSmoothScrolling();
        initNavbarScroll();
        initBookingForm();
        initAnimations();
        initCounterAnimation();
        initDateRestrictions();
        initMenuFiltering();
        initMenuAnimations();
        initImageLoading();
    }, 1500);
});

// Loading Screen Functionality
function initLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    
    // Hide loading screen after page loads
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
        // Remove from DOM after transition
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }, 2000);
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 90; // Account for reduced header height
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Enhanced Navbar scroll effect
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    const topBanner = document.querySelector('.top-banner');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
            if (topBanner) {
                topBanner.style.opacity = '0.8';
            }
        } else {
            navbar.classList.remove('scrolled');
            if (topBanner) {
                topBanner.style.opacity = '1';
            }
        }
    });
}

// Booking form functionality
function initBookingForm() {
    const bookingForm = document.getElementById('bookingForm');
    const contactForm = document.getElementById('contactForm');
    
    // Booking form validation
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateForm(this)) {
                submitBooking();
            }
        });
        
        // Real-time validation
        const formInputs = bookingForm.querySelectorAll('input, select, textarea');
        formInputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                if (this.classList.contains('is-invalid')) {
                    validateField(this);
                }
            });
        });
    }
    
    // Contact form validation (FormSubmit handles the actual sending)
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            // Let FormSubmit handle the submission, just validate first
            if (!validateForm(this)) {
                e.preventDefault(); // Only prevent if validation fails
                return false;
            }
            
            // Show loading state (FormSubmit will handle the redirect)
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Sending...';
            submitBtn.disabled = true;
            
            // FormSubmit will handle the rest automatically
        });
        
        // Real-time validation
        const formInputs = contactForm.querySelectorAll('input, select, textarea');
        formInputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                if (this.classList.contains('is-invalid')) {
                    validateField(this);
                }
            });
        });
    }
}

// Form validation
function validateForm(form) {
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!validateField(field)) {
            isValid = false;
        }
    });
    
    return isValid;
}

// Individual field validation
function validateField(field) {
    const value = field.value.trim();
    const fieldType = field.type;
    let isValid = true;
    let errorMessage = '';
    
    // Required field check
    if (field.hasAttribute('required') && !value) {
        isValid = false;
        errorMessage = `${getFieldLabel(field)} is required.`;
    }
    
    // Email validation
    if (fieldType === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            isValid = false;
            errorMessage = 'Please enter a valid email address.';
        }
    }
    
    // Phone validation
    if (fieldType === 'tel' && value) {
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        if (!phoneRegex.test(value.replace(/\s/g, ''))) {
            isValid = false;
            errorMessage = 'Please enter a valid phone number.';
        }
    }
    
    // Date validation
    if (fieldType === 'date' && value) {
        const selectedDate = new Date(value);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        if (selectedDate < today) {
            isValid = false;
            errorMessage = 'Please select a future date.';
        }
    }
    
    // Update field appearance
    updateFieldValidation(field, isValid, errorMessage);
    
    return isValid;
}

// Update field validation appearance
function updateFieldValidation(field, isValid, errorMessage) {
    const feedbackElement = field.parentNode.querySelector('.invalid-feedback, .valid-feedback');
    
    // Remove existing validation classes
    field.classList.remove('is-valid', 'is-invalid');
    if (feedbackElement) {
        feedbackElement.remove();
    }
    
    if (isValid) {
        field.classList.add('is-valid');
        if (field.value.trim()) {
            const validFeedback = document.createElement('div');
            validFeedback.className = 'valid-feedback';
            validFeedback.textContent = 'Looks good!';
            field.parentNode.appendChild(validFeedback);
        }
    } else {
        field.classList.add('is-invalid');
        const invalidFeedback = document.createElement('div');
        invalidFeedback.className = 'invalid-feedback';
        invalidFeedback.textContent = errorMessage;
        field.parentNode.appendChild(invalidFeedback);
    }
}

// Get field label for error messages
function getFieldLabel(field) {
    const label = field.parentNode.querySelector('label');
    return label ? label.textContent.replace('*', '').trim() : field.id;
}

// Submit booking
function submitBooking() {
    const submitBtn = document.querySelector('#bookingForm button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    // Show loading state
    submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Processing...';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        // Show success message
        showAlert('success', 'Booking request submitted successfully! We will contact you shortly to confirm your reservation at Indie Twist.');
        
        // Reset form
        document.getElementById('bookingForm').reset();
        
        // Remove validation classes
        const formInputs = document.querySelectorAll('#bookingForm input, #bookingForm select, #bookingForm textarea');
        formInputs.forEach(input => {
            input.classList.remove('is-valid', 'is-invalid');
            const feedback = input.parentNode.querySelector('.invalid-feedback, .valid-feedback');
            if (feedback) {
                feedback.remove();
            }
        });
        
    }, 2000);
}

// Show alert messages
function showAlert(type, message) {
    const alertContainer = document.createElement('div');
    alertContainer.className = `alert alert-${type} alert-dismissible fade show`;
    alertContainer.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    // Try to find contact section first, then booking section
    const contactSection = document.getElementById('contact');
    const bookingSection = document.getElementById('booking');
    const targetSection = contactSection || bookingSection;
    
    if (targetSection) {
        const container = targetSection.querySelector('.container');
        container.insertBefore(alertContainer, container.firstChild);
    } else {
        // Fallback: add to top of page
        document.body.insertBefore(alertContainer, document.body.firstChild);
    }
    
    // Auto-dismiss after 5 seconds
    setTimeout(() => {
        if (alertContainer.parentNode) {
            alertContainer.remove();
        }
    }, 5000);
}

// Initialize animations
function initAnimations() {
    // Enhanced Intersection Observer for global animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animate sections
                if (entry.target.tagName === 'SECTION') {
                    entry.target.classList.add('animate-in');
                }
                
                // Animate gallery cards
                if (entry.target.classList.contains('gallery-card')) {
                    entry.target.classList.add('animate-in');
                }
                
                // Animate food cards
                if (entry.target.classList.contains('food-card')) {
                    entry.target.classList.add('animate-in');
                }
                
                // Animate special cards
                if (entry.target.classList.contains('special-card')) {
                    entry.target.classList.add('animate-in');
                }
                
                // Animate review cards
                if (entry.target.classList.contains('review-card')) {
                    entry.target.classList.add('animate-in');
                }
                
                // Animate menu items
                if (entry.target.classList.contains('menu-item-card')) {
                    entry.target.classList.add('animate-in');
                }
                
                // Staggered card animations within sections
                if (entry.target.classList.contains('row')) {
                    const cards = entry.target.querySelectorAll('.gallery-card, .food-card, .special-card, .review-card, .menu-item-card');
                    cards.forEach((card, index) => {
                        setTimeout(() => {
                            card.classList.add('animate-in');
                        }, index * 200);
                    });
                }
            }
        });
    }, observerOptions);
    
    // Observe all sections for entrance animations
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        observer.observe(section);
    });
    
    // Observe gallery cards for individual animation
    const galleryCards = document.querySelectorAll('.gallery-card');
    galleryCards.forEach(card => {
        observer.observe(card);
    });
    
    // Observe food cards for individual animation
    const foodCards = document.querySelectorAll('.food-card');
    foodCards.forEach(card => {
        observer.observe(card);
    });
    
    // Observe special cards for individual animation
    const specialCards = document.querySelectorAll('.special-card');
    specialCards.forEach(card => {
        observer.observe(card);
    });
    
    // Observe menu item cards
    const menuItemCards = document.querySelectorAll('.menu-item-card');
    menuItemCards.forEach(card => {
        observer.observe(card);
    });
    
    // Observe review cards for individual animation
    const reviewCards = document.querySelectorAll('.review-card');
    reviewCards.forEach(card => {
        observer.observe(card);
    });
    
    // Initialize hero animations (immediate)
    setTimeout(() => {
        document.querySelector('.hero-content')?.classList.add('animate-in');
    }, 100);
    
    // Animate navbar on scroll
    initNavbarAnimations();
}

// Enhanced navbar animations
function initNavbarAnimations() {
    const navbar = document.querySelector('.navbar');
    // Initial state - navbar starts fully visible for hero section
    navbar.style.background = 'linear-gradient(135deg, var(--dark-color) 0%, var(--primary-color) 100%)';
    
    // Add smooth scroll reveal animation for navbar items
    const navItems = document.querySelectorAll('.navbar-nav .nav-link');
    navItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(-20px)';
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
            item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        }, index * 100);
    });
}

// Counter animation for stats
function initCounterAnimation() {
    const counters = document.querySelectorAll('.counter');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                const increment = target / 50; // Animation duration
                
                let current = 0;
                const updateCounter = () => {
                    if (current < target) {
                        current += increment;
                        counter.textContent = Math.ceil(current);
                        setTimeout(updateCounter, 20);
                    } else {
                        counter.textContent = target;
                    }
                };
                
                updateCounter();
                counterObserver.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

// Initialize date restrictions
function initDateRestrictions() {
    const dateInput = document.getElementById('date');
    const today = new Date();
    const maxDate = new Date();
    maxDate.setMonth(maxDate.getMonth() + 3); // Allow booking up to 3 months ahead
    
    // Set minimum date to today
    dateInput.min = today.toISOString().split('T')[0];
    
    // Set maximum date
    dateInput.max = maxDate.toISOString().split('T')[0];
    
    // Disable past dates
    dateInput.addEventListener('input', function() {
        const selectedDate = new Date(this.value);
        if (selectedDate < today) {
            this.value = '';
            showAlert('danger', 'Please select a future date.');
        }
    });
}

// Time slot availability (simulated)
function updateTimeSlots() {
    const dateInput = document.getElementById('date');
    const timeSelect = document.getElementById('time');
    const selectedDate = new Date(dateInput.value);
    const dayOfWeek = selectedDate.getDay();
    
    // Clear existing options except the first one
    timeSelect.innerHTML = '<option value="">Select Time</option>';
    
    // Define available time slots based on day
    let availableSlots = [];
    
    if (dayOfWeek >= 1 && dayOfWeek <= 4) { // Monday to Thursday
        availableSlots = [
            { time: '12:00', label: '12:00 PM' },
            { time: '12:30', label: '12:30 PM' },
            { time: '13:00', label: '1:00 PM' },
            { time: '13:30', label: '1:30 PM' },
            { time: '14:00', label: '2:00 PM' },
            { time: '18:00', label: '6:00 PM' },
            { time: '18:30', label: '6:30 PM' },
            { time: '19:00', label: '7:00 PM' },
            { time: '19:30', label: '7:30 PM' },
            { time: '20:00', label: '8:00 PM' },
            { time: '20:30', label: '8:30 PM' },
            { time: '21:00', label: '9:00 PM' }
        ];
    } else { // Friday to Sunday
        availableSlots = [
            { time: '12:00', label: '12:00 PM' },
            { time: '12:30', label: '12:30 PM' },
            { time: '13:00', label: '1:00 PM' },
            { time: '13:30', label: '1:30 PM' },
            { time: '14:00', label: '2:00 PM' },
            { time: '17:30', label: '5:30 PM' },
            { time: '18:00', label: '6:00 PM' },
            { time: '18:30', label: '6:30 PM' },
            { time: '19:00', label: '7:00 PM' },
            { time: '19:30', label: '7:30 PM' },
            { time: '20:00', label: '8:00 PM' },
            { time: '20:30', label: '8:30 PM' },
            { time: '21:00', label: '9:00 PM' },
            { time: '21:30', label: '9:30 PM' },
            { time: '22:00', label: '10:00 PM' }
        ];
    }
    
    // Add options to select
    availableSlots.forEach(slot => {
        const option = document.createElement('option');
        option.value = slot.time;
        option.textContent = slot.label;
        timeSelect.appendChild(option);
    });
}

// Update time slots when date changes
document.getElementById('date').addEventListener('change', updateTimeSlots);

// Guest count validation
document.getElementById('guests').addEventListener('change', function() {
    const guests = parseInt(this.value);
    
    if (guests > 8) {
        showAlert('info', 'For parties larger than 8 guests, please call us directly at 01635 783660 for special arrangements.');
    }
});

// Enhanced Menu filtering functionality with smooth scrolling
function initMenuFiltering() {
    const filterButtons = document.querySelectorAll('.menu-nav .btn');
    const menuCategories = document.querySelectorAll('.menu-category');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const category = this.getAttribute('data-category');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Add visual feedback
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
            
            // Filter menu categories with smooth scrolling
            filterMenuCategories(category, menuCategories);
            
            // Scroll to menu section if not already visible
            const menuSection = document.getElementById('menu');
            if (menuSection) {
                const menuOffset = menuSection.offsetTop - 90; // Account for reduced header height
                window.scrollTo({
                    top: menuOffset,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Filter menu categories based on selected category
function filterMenuCategories(selectedCategory, categories) {
    categories.forEach(category => {
        const categoryType = category.getAttribute('data-category');
        
        if (selectedCategory === 'all' || categoryType === selectedCategory) {
            // Show category
            category.style.display = 'block';
            category.classList.remove('hidden');
            
            // Animate category title
            const categoryTitle = category.querySelector('.category-title');
            if (categoryTitle) {
                categoryTitle.style.animation = 'none';
                setTimeout(() => {
                    categoryTitle.style.animation = 'titleSlideIn 0.8s ease-out';
                }, 10);
            }
            
            // Animate menu items with staggered effect
            const menuItems = category.querySelectorAll('.menu-item-card');
            menuItems.forEach((item, index) => {
                item.style.animation = 'none';
                setTimeout(() => {
                    item.style.animation = `menuItemSlideIn 0.6s ease forwards`;
                    item.style.animationDelay = `${index * 0.1}s`;
                }, 10);
            });
            
            // Add fade-in animation
            setTimeout(() => {
                category.classList.add('fade-in');
            }, 50);
        } else {
            // Hide category
            category.classList.add('fade-out');
            
            // Reset animations for hidden items
            const menuItems = category.querySelectorAll('.menu-item-card');
            menuItems.forEach(item => {
                item.style.animation = 'none';
            });
            
            setTimeout(() => {
                category.style.display = 'none';
                category.classList.remove('fade-out');
            }, 300);
        }
    });
    
    // Scroll to menu section when filtering
    const menuSection = document.getElementById('menu');
    if (menuSection) {
        const offsetTop = menuSection.offsetTop - 90; // Account for reduced header height
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Add menu enhancement animations
function initMenuAnimations() {
    // Add hover effects for badge pulsing
    const badges = document.querySelectorAll('.dish-badges .badge');
    badges.forEach(badge => {
        badge.addEventListener('mouseenter', function() {
            this.style.animationPlayState = 'paused';
        });
        
        badge.addEventListener('mouseleave', function() {
            this.style.animationPlayState = 'running';
        });
    });
    
    // Add ripple effect to menu items
    const menuItems = document.querySelectorAll('.menu-item-card');
    menuItems.forEach(item => {
        item.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// Initialize image loading
function initImageLoading() {
    // Add loading states for images
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
            this.style.transform = 'scale(1)';
        });
        
        img.addEventListener('error', function() {
            console.log('Image failed to load:', this.src);
            this.style.display = 'none';
        });
        
        // Set initial opacity (keep gallery images visible)
        if (img.closest('.gallery-card')) {
            img.style.opacity = '1';
            img.style.transform = 'scale(1)';
        } else {
            img.style.opacity = '0';
            img.style.transform = 'scale(0.9)';
        }
        img.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
}

// Mobile menu enhancement
function initMobileMenu() {
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navbarCollapse.classList.contains('show')) {
                navbarToggler.click();
            }
        });
    });
}

// Initialize mobile menu
initMobileMenu();

// Form auto-save to localStorage
function saveFormData() {
    const formData = new FormData(document.getElementById('bookingForm'));
    const data = {};
    
    for (let [key, value] of formData.entries()) {
        data[key] = value;
    }
    
    localStorage.setItem('indieTwistBookingData', JSON.stringify(data));
}

// Load saved form data
function loadFormData() {
    const savedData = localStorage.getItem('indieTwistBookingData');
    if (savedData) {
        const data = JSON.parse(savedData);
        
        Object.keys(data).forEach(key => {
            const field = document.getElementById(key);
            if (field && data[key]) {
                field.value = data[key];
            }
        });
    }
}

// Auto-save form data
document.getElementById('bookingForm').addEventListener('input', saveFormData);

// Load saved data on page load
loadFormData();

// Clear saved data on successful submission
function clearSavedData() {
    localStorage.removeItem('indieTwistBookingData');
}

// Update submit function to clear saved data
const originalSubmitBooking = submitBooking;
submitBooking = function() {
    originalSubmitBooking();
    clearSavedData();
};