// Digital Garden - Interactive Features & Easter Eggs
class DigitalGarden {
    constructor() {
        this.achievements = {
            konami: false,
            explorer: false,
            clicker: false,
            keyboard_master: false,
            garden_keeper: false
        };
        this.konamiSequence = [];
        this.konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // ↑↑↓↓←→←→BA
        this.clickCount = 0;
        this.explorationCount = 0;
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupScrollAnimations();
        this.setupFloatingElements();
        this.setupSkillAnimations();
        this.setupProjectCards();
        this.setupContactForm();
        this.setupTerminal();
        this.setupAchievementSystem();
        this.setupKonamiCode();
        this.setupHiddenEasterEggs();
        
        // Welcome message
        setTimeout(() => {
            this.showAchievement('Welcome to the Digital Garden! 🌱');
        }, 2000);
    }

    setupEventListeners() {
        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Navigation highlight on scroll
        window.addEventListener('scroll', () => {
            this.highlightActiveNavLink();
        });

        // Floating elements click events
        document.querySelectorAll('.floating-element').forEach(element => {
            element.addEventListener('click', (e) => {
                this.handleFloatingElementClick(e);
            });
        });

        // Project card interactions
        document.querySelectorAll('.project-card').forEach(card => {
            card.addEventListener('click', (e) => {
                this.handleProjectCardClick(e);
            });
        });

        // Skill item interactions
        document.querySelectorAll('.skill-item').forEach(item => {
            item.addEventListener('mouseenter', () => {
                this.animateSkillLevel(item);
            });
        });
    }

    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    this.explorationCount++;
                    
                    // Check for exploration achievement
                    if (this.explorationCount >= 5 && !this.achievements.explorer) {
                        this.unlockAchievement('explorer');
                    }
                }
            });
        }, observerOptions);

        // Observe all sections
        document.querySelectorAll('.section').forEach(section => {
            observer.observe(section);
        });
    }

    setupFloatingElements() {
        // Add ripple effect to floating elements
        document.querySelectorAll('.floating-element').forEach(element => {
            element.addEventListener('click', (e) => {
                this.createRipple(e, element);
            });
        });
    }

    createRipple(event, element) {
        const ripple = document.createElement('div');
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');

        element.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    setupSkillAnimations() {
        // Animate skill levels on scroll
        const skillObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const skillItem = entry.target;
                    const level = skillItem.getAttribute('data-level');
                    const levelBar = skillItem.querySelector('.skill-level');
                    
                    if (levelBar) {
                        setTimeout(() => {
                            levelBar.style.width = level + '%';
                        }, 200);
                    }
                }
            });
        }, { threshold: 0.5 });

        document.querySelectorAll('.skill-item').forEach(item => {
            skillObserver.observe(item);
        });
    }

    setupProjectCards() {
        // Add 3D tilt effect to project cards
        document.querySelectorAll('.project-card').forEach(card => {
            card.addEventListener('mousemove', (e) => {
                this.handleCardTilt(e, card);
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
            });
        });
    }

    handleCardTilt(event, card) {
        const rect = card.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    }

    setupContactForm() {
        const form = document.getElementById('contact-form');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleContactFormSubmit(form);
            });
        }
    }

    handleContactFormSubmit(form) {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Simulate form submission
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            submitBtn.innerHTML = '<i class="fas fa-check"></i> Sent!';
            submitBtn.style.background = '#10b981';
            
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                submitBtn.style.background = '';
                form.reset();
            }, 2000);
        }, 1500);
        
        // Unlock achievement for using contact form
        if (!this.achievements.garden_keeper) {
            this.unlockAchievement('garden_keeper');
        }
    }

    setupTerminal() {
        const terminal = document.getElementById('secret-terminal');
        const input = document.getElementById('terminal-input');
        
        if (input) {
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.handleTerminalCommand(input.value);
                    input.value = '';
                }
            });
        }
    }

    handleTerminalCommand(command) {
        const output = document.querySelector('.terminal-output');
        const commandLine = document.createElement('div');
        commandLine.className = 'terminal-line';
        commandLine.innerHTML = `<span style="color: #00ffff;">$ ${command}</span>`;
        output.appendChild(commandLine);
        
        let response = '';
        
        switch (command.toLowerCase()) {
            case 'help':
                response = `Available commands:
help - Show this help
about - About the developer
skills - Show skills
projects - List projects
clear - Clear terminal
date - Current date
whoami - User info
ls - List files
pwd - Print working directory
exit - Close terminal`;
                break;
            case 'about':
                response = 'I am a CS student passionate about creating digital solutions and exploring new technologies.';
                break;
            case 'skills':
                response = 'Python, JavaScript, Java, C++, React, Node.js, Flask, Git, and more!';
                break;
            case 'projects':
                response = 'AI Chatbot, E-commerce Platform, Fitness Tracker, and various open-source contributions.';
                break;
            case 'clear':
                output.innerHTML = '';
                return;
            case 'date':
                response = new Date().toLocaleString();
                break;
            case 'whoami':
                response = 'garden@digital:~$ CS Student & Developer';
                break;
            case 'ls':
                response = 'about/  skills/  projects/  experience/  contact/  README.md';
                break;
            case 'pwd':
                response = '/home/garden/digital-portfolio';
                break;
            case 'exit':
                this.closeTerminal();
                return;
            default:
                response = `Command not found: ${command}. Type 'help' for available commands.`;
        }
        
        const responseLine = document.createElement('div');
        responseLine.className = 'terminal-line';
        responseLine.textContent = response;
        output.appendChild(responseLine);
        
        output.scrollTop = output.scrollHeight;
    }

    setupAchievementSystem() {
        // Check for existing achievements in localStorage
        const savedAchievements = localStorage.getItem('digitalGardenAchievements');
        if (savedAchievements) {
            this.achievements = { ...this.achievements, ...JSON.parse(savedAchievements) };
        }
    }

    unlockAchievement(achievement) {
        if (this.achievements[achievement]) return;
        
        this.achievements[achievement] = true;
        localStorage.setItem('digitalGardenAchievements', JSON.stringify(this.achievements));
        
        // Send to backend
        fetch(`/api/achievements/${achievement}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        }).catch(console.error);
        
        // Show achievement toast
        this.showAchievement(this.getAchievementMessage(achievement));
        
        // Add achievement to terminal
        const terminalOutput = document.querySelector('.terminal-output');
        if (terminalOutput) {
            const achievementLine = document.createElement('div');
            achievementLine.className = 'terminal-line';
            achievementLine.innerHTML = `🎉 Achievement unlocked: ${this.getAchievementMessage(achievement)}`;
            terminalOutput.appendChild(achievementLine);
        }
    }

    getAchievementMessage(achievement) {
        const messages = {
            konami: 'Konami Code Master! 🎮',
            explorer: 'Garden Explorer! 🗺️',
            clicker: 'Click Master! 🖱️',
            keyboard_master: 'Keyboard Ninja! ⌨️',
            garden_keeper: 'Garden Keeper! 🌱'
        };
        return messages[achievement] || 'Achievement Unlocked! 🏆';
    }

    showAchievement(message) {
        const toast = document.getElementById('achievement-toast');
        const text = document.getElementById('achievement-text');
        
        if (toast && text) {
            text.textContent = message;
            toast.classList.add('show');
            
            setTimeout(() => {
                toast.classList.remove('show');
            }, 3000);
        }
    }

    

    setupKonamiCode() {
        document.addEventListener('keydown', (e) => {
            console.log('Key pressed:', e.keyCode);
            this.konamiSequence.push(e.keyCode);
            
            if (this.konamiSequence.length > this.konamiCode.length) {
                this.konamiSequence.shift();
            }
            console.log('Current konamiSequence:', this.konamiSequence);
            
            if (this.konamiSequence.length === this.konamiCode.length) {
                if (this.konamiSequence.every((code, index) => code === this.konamiCode[index])) {
                    console.log('COrrect!', this.konamiSequence);
                    this.activateKonamiCode();
                }
            }
        });
    }

    activateKonamiCode() {
        console.log('Activating Konami Code!');
        
        this.unlockAchievement('konami');
        this.toggleTerminal();
        
        // Add special effects
        document.body.style.animation = 'konamiGlow 2s ease';
        setTimeout(() => {
            document.body.style.animation = '';
        }, 2000);
    }

    setupHiddenEasterEggs() {
        // Hidden click counter
        let clickCount = 0;
        document.addEventListener('click', () => {
            clickCount++;
            if (clickCount === 42 && !this.achievements.clicker) {
                this.unlockAchievement('clicker');
                this.showAchievement('The Answer to Life, the Universe, and Everything! 🤖');
            }
        });

        // Hidden text selection
        document.addEventListener('mouseup', () => {
            const selection = window.getSelection().toString();
            if (selection.toLowerCase().includes('easter egg') && !this.achievements.explorer) {
                this.unlockAchievement('explorer');
                this.showAchievement('Text Explorer! 🔍');
            }
        });

        // Right-click easter egg
        document.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            this.showAchievement('Right-click disabled! 🚫');
        });

        // Double-tap easter egg
        let lastTap = 0;
        document.addEventListener('touchend', (e) => {
            const currentTime = new Date().getTime();
            const tapLength = currentTime - lastTap;
            if (tapLength < 500 && tapLength > 0) {
                this.showAchievement('Double-tap detected! 👆👆');
            }
            lastTap = currentTime;
        });
    }

    // Utility functions
    scrollToSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    }

    highlightActiveNavLink() {
        const sections = document.querySelectorAll('.section');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    handleFloatingElementClick(event) {
        const element = event.target;
        const tooltip = element.getAttribute('data-tooltip');
        
        if (tooltip) {
            this.showAchievement(tooltip);
        }
        
        // Add click animation
        element.style.transform = 'scale(0.8) rotate(180deg)';
        setTimeout(() => {
            element.style.transform = '';
        }, 300);
    }

    handleProjectCardClick(event) {
        const card = event.currentTarget;
        const projectId = card.getAttribute('data-project');
        
        // Add click effect
        card.style.transform = 'scale(0.95)';
        setTimeout(() => {
            card.style.transform = '';
        }, 150);
        
        // Show project info
        this.showAchievement(`Project: ${projectId} selected! 🚀`);
    }

    animateSkillLevel(skillItem) {
        const levelBar = skillItem.querySelector('.skill-level');
        if (levelBar) {
            levelBar.style.animation = 'skillGlow 0.5s ease';
            setTimeout(() => {
                levelBar.style.animation = '';
            }, 500);
        }
    }

    toggleTerminal() {
        const terminal = document.getElementById('secret-terminal');
        console.log('Toggling terminal:', terminal);
        if (terminal) {
            terminal.classList.toggle('active');
            if (terminal.classList.contains('active')) {
                console.log('Terminal activated!');
                document.getElementById('terminal-input').focus();
            }
        }
    }

    closeTerminal() {
        const terminal = document.getElementById('secret-terminal');
        if (terminal) {
            terminal.classList.remove('active');
        }
    }


    resetAchievements() {
        if (confirm('Are you sure you want to reset all achievements?')) {
            this.achievements = {
                konami: false,
                explorer: false,
                clicker: false,
                keyboard_master: false,
                garden_keeper: false
            };
            localStorage.removeItem('digitalGardenAchievements');
            this.showAchievement('Achievements reset! 🔄');
        }
    }
}

// Initialize the Digital Garden when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.digitalGarden = new DigitalGarden();
});

// Global functions for HTML onclick handlers
function scrollToSection(sectionId) {
    if (window.digitalGarden) {
        window.digitalGarden.scrollToSection(sectionId);
    }
}

function closeTerminal() {
    if (window.digitalGarden) {
        window.digitalGarden.closeTerminal();
    }
}

// Add CSS for new animations
const style = document.createElement('style');
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(167, 201, 87, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }

    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }

    .animate-in {
        animation: slideInUp 0.8s ease forwards;
    }

    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(50px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .konamiGlow {
        0%, 100% { filter: brightness(1); }
        50% { filter: brightness(1.2) hue-rotate(180deg); }
    }

    .nav-link.active::after {
        width: 100% !important;
    }

    .floating-element {
        cursor: pointer;
        user-select: none;
    }

    .floating-element:hover {
        filter: drop-shadow(0 0 20px rgba(167, 201, 87, 0.8));
    }
`;
document.head.appendChild(style);

