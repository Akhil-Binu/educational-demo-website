/*
========================================================================
   AETHERIS INSTITUTE OF TECHNOLOGY - CLIENT LOGIC & INTERACTION
========================================================================
*/

// Initialize Vercel Web Analytics
import { inject } from '@vercel/analytics';
inject();

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Lucide Icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // 2. Sticky Navigation Bar Scroll Effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 3. Mobile Menu Toggle
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            
            // Switch menu icon
            const menuIcon = menuToggle.querySelector('i');
            if (menuIcon) {
                if (navMenu.classList.contains('active')) {
                    menuIcon.setAttribute('data-lucide', 'x');
                } else {
                    menuIcon.setAttribute('data-lucide', 'menu');
                }
                lucide.createIcons();
            }
        });

        // Close mobile menu when nav link is clicked
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                const menuIcon = menuToggle.querySelector('i');
                if (menuIcon) {
                    menuIcon.setAttribute('data-lucide', 'menu');
                    lucide.createIcons();
                }
            });
        });
    }

    // 4. Dark & Light Theme Toggle
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;

    // Load theme setting
    const savedTheme = localStorage.getItem('theme') || 'dark';
    if (savedTheme === 'light') {
        body.classList.add('light-theme');
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            body.classList.toggle('light-theme');
            const currentTheme = body.classList.contains('light-theme') ? 'light' : 'dark';
            localStorage.setItem('theme', currentTheme);
        });
    }

    // 5. Active Nav Link Highlighter on Scroll
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 120;
            const sectionId = section.getAttribute('id');
            
            const correspondingLink = document.querySelector(`.nav-menu a[href*=${sectionId}]`);
            if (correspondingLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    document.querySelectorAll('.nav-menu a').forEach(el => el.classList.remove('active'));
                    correspondingLink.classList.add('active');
                }
            }
        });
    });

    // 6. Real-time Stats Count-up Animation
    const statsSection = document.querySelector('.stats-section');
    const statCards = document.querySelectorAll('.stat-card');
    let animated = false;

    function countUp(element, target) {
        let current = 0;
        const duration = 2000; // 2 seconds
        const stepTime = Math.abs(Math.floor(duration / target));
        
        // Cap step time for extremely high/low values
        const minStep = 15;
        const actualStep = Math.max(stepTime, minStep);
        const increment = Math.ceil(target / (duration / actualStep));

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = current;
            }
        }, actualStep);
    }

    const observerOptions = {
        root: null,
        threshold: 0.1
    };

    const statsObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !animated) {
                statCards.forEach(card => {
                    const numElement = card.querySelector('.stat-num');
                    const targetVal = parseInt(card.getAttribute('data-stat-target'), 10);
                    if (numElement && targetVal) {
                        countUp(numElement, targetVal);
                    }
                });
                animated = true;
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    if (statsSection) {
        statsObserver.observe(statsSection);
    }

    // 7. Academics Filter & Search Functionality
    const courseSearch = document.getElementById('courseSearch');
    const filterTabs = document.getElementById('filterTabs');
    const programCards = document.querySelectorAll('.program-card');
    const noResults = document.getElementById('noResults');
    const programGrid = document.getElementById('programGrid');

    let currentFilter = 'all';
    let currentSearchQuery = '';

    function filterPrograms() {
        let visibleCount = 0;

        programCards.forEach(card => {
            const category = card.getAttribute('data-category');
            const title = card.querySelector('.program-title').textContent.toLowerCase();
            const summary = card.querySelector('.program-summary').textContent.toLowerCase();
            
            const matchesFilter = (currentFilter === 'all' || category === currentFilter);
            const matchesSearch = (title.includes(currentSearchQuery) || summary.includes(currentSearchQuery));

            if (matchesFilter && matchesSearch) {
                card.style.display = 'flex';
                visibleCount++;
                // Trigger smooth fade-in
                card.style.opacity = '1';
                card.style.transform = 'scale(1)';
            } else {
                card.style.display = 'none';
                card.style.opacity = '0';
                card.style.transform = 'scale(0.95)';
            }
        });

        if (visibleCount === 0) {
            noResults.style.display = 'block';
            programGrid.style.display = 'none';
        } else {
            noResults.style.display = 'none';
            programGrid.style.display = 'grid';
        }
    }

    if (courseSearch) {
        courseSearch.addEventListener('input', (e) => {
            currentSearchQuery = e.target.value.toLowerCase().trim();
            filterPrograms();
        });
    }

    if (filterTabs) {
        filterTabs.addEventListener('click', (e) => {
            if (e.target.classList.contains('tab-btn')) {
                document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
                e.target.classList.add('active');
                
                currentFilter = e.target.getAttribute('data-filter');
                filterPrograms();
            }
        });
    }

    // 8. Expandable Program Cards Logic
    programCards.forEach(card => {
        const toggleBtn = card.querySelector('.btn-card-toggle');
        const expandContent = card.querySelector('.program-details-expand');
        
        if (toggleBtn && expandContent) {
            toggleBtn.addEventListener('click', () => {
                const isExpanded = card.classList.toggle('expanded');
                
                if (isExpanded) {
                    // Set height based on scrollHeight for transition
                    expandContent.style.maxHeight = expandContent.scrollHeight + 'px';
                    toggleBtn.innerHTML = `Hide Modules <i data-lucide="chevron-up"></i>`;
                } else {
                    expandContent.style.maxHeight = '0';
                    toggleBtn.innerHTML = `View Modules <i data-lucide="chevron-down"></i>`;
                }
                
                if (typeof lucide !== 'undefined') {
                    lucide.createIcons();
                }
            });
        }
    });

    // 9. Admissions Program Advisor Tool (Stepper)
    let advisorState = {
        interest: null,
        cgpa: 8.5,
        goal: 'research'
    };

    const interestCards = document.querySelectorAll('.interest-card');
    const step1NextBtn = document.querySelector('#step1 .btn-next');
    const cgpaSlider = document.getElementById('cgpaSlider');
    const cgpaVal = document.getElementById('cgpaVal');
    const radioOptions = document.querySelectorAll('input[name="goal"]');
    
    const stepperSteps = document.querySelectorAll('.stepper .step');
    const stepperLines = document.querySelectorAll('.stepper .step-line');
    const stepContents = document.querySelectorAll('.step-content');
    
    // Step 1: Scientific Interest Card Selection
    interestCards.forEach(card => {
        card.addEventListener('click', () => {
            interestCards.forEach(c => c.classList.remove('selected'));
            card.classList.add('selected');
            
            advisorState.interest = card.getAttribute('data-interest');
            step1NextBtn.removeAttribute('disabled');
        });
    });

    // Step 2: CGPA Slider
    if (cgpaSlider && cgpaVal) {
        cgpaSlider.addEventListener('input', (e) => {
            advisorState.cgpa = parseFloat(e.target.value);
            cgpaVal.textContent = advisorState.cgpa.toFixed(1);
        });
    }

    // Stepper Navigation Logic
    function navigateToStep(targetStepNum) {
        // Update stepper indicators
        stepperSteps.forEach((step, index) => {
            const stepNum = index + 1;
            step.classList.remove('active', 'completed');
            
            if (stepNum === targetStepNum) {
                step.classList.add('active');
            } else if (stepNum < targetStepNum) {
                step.classList.add('completed');
            }
        });

        stepperLines.forEach((line, index) => {
            const lineNum = index + 1;
            line.classList.remove('completed');
            if (lineNum < targetStepNum) {
                line.classList.add('completed');
            }
        });

        // Toggle Content Sections
        stepContents.forEach(content => {
            content.classList.remove('active');
        });

        const targetContent = document.getElementById(`step${targetStepNum}`);
        if (targetContent) {
            targetContent.classList.add('active');
        } else if (targetStepNum === 4) {
            // Results screen
            document.getElementById('stepResult').classList.add('active');
        }
    }

    // Handle Next and Prev Buttons
    document.querySelectorAll('.btn-next').forEach(btn => {
        btn.addEventListener('click', () => {
            const currentActiveStep = document.querySelector('.step.active');
            if (currentActiveStep) {
                const nextStep = parseInt(currentActiveStep.getAttribute('data-step'), 10) + 1;
                navigateToStep(nextStep);
            }
        });
    });

    document.querySelectorAll('.btn-prev').forEach(btn => {
        btn.addEventListener('click', () => {
            const currentActiveStep = document.querySelector('.step.active');
            if (currentActiveStep) {
                const prevStep = parseInt(currentActiveStep.getAttribute('data-step'), 10) - 1;
                navigateToStep(prevStep);
            }
        });
    });

    // Calculate Recommendation (Step 3 Submit)
    const btnCalculate = document.getElementById('btnCalculate');
    const recommendedTitle = document.getElementById('recommendedTitle');
    const recommendedDesc = document.getElementById('recommendedDesc');
    const eligibilityText = document.getElementById('eligibilityText');
    const btnApplyEstimator = document.getElementById('btnApplyEstimator');

    if (btnCalculate) {
        btnCalculate.addEventListener('click', () => {
            // Capture goal radio value
            const selectedGoal = document.querySelector('input[name="goal"]:checked');
            if (selectedGoal) {
                advisorState.goal = selectedGoal.value;
            }

            let recommendation = { title: "", desc: "" };

            // Decision Engine based on selections
            if (advisorState.interest === 'computing') {
                if (advisorState.goal === 'research') {
                    recommendation.title = "M.S. in Cognitive AI & Swarm Intelligence";
                    recommendation.desc = "Perfectly aligned for candidates seeking to push boundaries in distributed reinforcement learning models and neuromorphic hardware networks.";
                } else {
                    recommendation.title = "B.Tech in Decentralized Systems & Edge Computing";
                    recommendation.desc = "Designed for high-impact developers aiming to construct next-generation trustless internet infrastructures, edge IoT networks, and real-time distributed servers.";
                }
            } else if (advisorState.interest === 'quantum') {
                if (advisorState.goal === 'research') {
                    recommendation.title = "B.Tech in Quantum Information & Cryptography";
                    recommendation.desc = "A specialized hardware & mathematics pathway exploring topological insulators, qubit physical design, and secure post-quantum communication protocols.";
                } else {
                    recommendation.title = "M.Tech in Space Propulsion & Avionics";
                    recommendation.desc = "Geared towards aerospace system engineers focusing on electric Hall-effect thrusters, autonomous orbit stabilizers, and satellite grid telemetry.";
                }
            } else if (advisorState.interest === 'bio') {
                if (advisorState.goal === 'research') {
                    recommendation.title = "Ph.D. in Synthetic Biology & Molecular Design";
                    recommendation.desc = "A doctoral-track program engineering living cell logic gates, programming DNA vectors, and designing biomimetic molecular systems.";
                } else {
                    recommendation.title = "M.S. in Neuro-Prosthetics & Cybernetics";
                    recommendation.desc = "Ideal for merging robotics with neurology. Master neural filters, biocompatible interfaces, and real-time BCI signal analytics.";
                }
            }

            // Render Output
            recommendedTitle.textContent = recommendation.title;
            recommendedDesc.textContent = recommendation.desc;

            // Set Inquiry subject link directly
            btnApplyEstimator.href = `#contact?subject=Admissions&program=${encodeURIComponent(recommendation.title)}`;
            btnApplyEstimator.addEventListener('click', () => {
                const subjectSelect = document.getElementById('formSubject');
                if (subjectSelect) {
                    if (recommendation.title.startsWith("Ph.D.") || recommendation.title.startsWith("M.S.") || recommendation.title.startsWith("M.Tech")) {
                        subjectSelect.value = "Admissions Postgraduate";
                    } else {
                        subjectSelect.value = "Admissions Undergraduate";
                    }
                    
                    const messageArea = document.getElementById('formMessage');
                    if (messageArea) {
                        messageArea.value = `Hello, I ran the Program Advisor Quiz and was recommended the "${recommendation.title}" program. I have a CGPA/Score of ${advisorState.cgpa} and would like to learn more about the admissions timeline and funding options.`;
                    }
                }
            });

            // Calculate eligibility criteria text
            if (advisorState.cgpa >= 8.5) {
                eligibilityText.innerHTML = `<strong>Eligible for Fast-track Interview</strong> (CGPA: ${advisorState.cgpa}/10). Merit-based waivers may apply.`;
            } else if (advisorState.cgpa >= 7.0) {
                eligibilityText.innerHTML = `<strong>Standard Admissions Route</strong> (CGPA: ${advisorState.cgpa}/10). Requires portfolio review and entrance exam.`;
            } else {
                eligibilityText.innerHTML = `<strong>Admissions review required</strong> (CGPA: ${advisorState.cgpa}/10). Candidate should submit reference letters and project works.`;
            }

            // Go to Results screen (represented as index 4)
            navigateToStep(4);
        });
    }

    // Reset Advisor Tool
    const btnResetEstimator = document.getElementById('btnResetEstimator');
    if (btnResetEstimator) {
        btnResetEstimator.addEventListener('click', () => {
            // Reset state
            advisorState.interest = null;
            interestCards.forEach(c => c.classList.remove('selected'));
            step1NextBtn.setAttribute('disabled', 'true');
            cgpaSlider.value = 8.5;
            cgpaVal.textContent = "8.5";
            
            // Go to Step 1
            navigateToStep(1);
        });
    }

    // 10. Contact & Newsletter Forms Logic with Validation
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');
    const sentEmailSpan = document.getElementById('sentEmail');
    const btnSuccessClose = document.getElementById('btnSuccessClose');

    function validateField(input) {
        const formGroup = input.parentElement;
        let isValid = true;

        if (input.required && !input.value.trim()) {
            isValid = false;
        } else if (input.type === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            isValid = emailRegex.test(input.value.trim());
        }

        if (!isValid) {
            formGroup.classList.add('error');
        } else {
            formGroup.classList.remove('error');
        }

        return isValid;
    }

    if (contactForm) {
        // Inline validation on blur
        const inputs = contactForm.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', () => validateField(input));
            input.addEventListener('input', () => {
                if (input.parentElement.classList.contains('error')) {
                    validateField(input);
                }
            });
        });

        // Form Submit
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let isFormValid = true;

            inputs.forEach(input => {
                if (!validateField(input)) {
                    isFormValid = false;
                }
            });

            if (isFormValid) {
                // Show Success Screen
                const emailInput = document.getElementById('formEmail');
                if (sentEmailSpan && emailInput) {
                    sentEmailSpan.textContent = emailInput.value.trim();
                }
                formSuccess.classList.add('active');
            }
        });
    }

    if (btnSuccessClose && contactForm && formSuccess) {
        btnSuccessClose.addEventListener('click', () => {
            contactForm.reset();
            formSuccess.classList.remove('active');
        });
    }

    // Newsletter Submission logic
    const newsletterForm = document.getElementById('newsletterForm');
    const newsletterStatus = document.getElementById('newsletterStatus');

    if (newsletterForm && newsletterStatus) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const input = newsletterForm.querySelector('input');
            if (input && input.value.trim()) {
                newsletterStatus.classList.add('active');
                input.value = '';
                
                // Hide indicator after 3 seconds
                setTimeout(() => {
                    newsletterStatus.classList.remove('active');
                }, 3000);
            }
        });
    }

    // 11. Virtual Tour Dialogue Modal Control
    const btnVirtualTour = document.getElementById('btnVirtualTour');
    const tourModal = document.getElementById('tourModal');
    const btnModalClose = document.getElementById('btnModalClose');
    const modalOverlay = tourModal ? tourModal.querySelector('.modal-overlay') : null;
    
    // Scene Slider
    const sceneImg = document.getElementById('sceneImg');
    const sceneCaption = document.getElementById('sceneCaption');
    const tourControlBtns = document.querySelectorAll('.tour-control-btn');

    // Asset paths for virtual tour generated images
    const scenes = {
        1: {
            img: "assets/scene_hub.png",
            caption: "Quantum Computational Cluster (Central Hub)"
        },
        2: {
            img: "assets/scene_cleanroom.png",
            caption: "Nanotech Cleanroom (R&D Labs)"
        },
        3: {
            img: "assets/scene_dronebay.png",
            caption: "Autonomous Flying Drone Bay (Robotics Quad)"
        }
    };

    function switchScene(sceneNum) {
        tourControlBtns.forEach(btn => btn.classList.remove('active'));
        const activeBtn = document.querySelector(`.tour-control-btn[data-scene="${sceneNum}"]`);
        if (activeBtn) activeBtn.classList.add('active');

        // Apply scene changes with simple animation
        if (sceneImg) {
            sceneImg.style.opacity = '0.1';
            setTimeout(() => {
                sceneImg.src = scenes[sceneNum].img;
                sceneImg.style.opacity = '0.75';
            }, 200);
        }
        if (sceneCaption) {
            sceneCaption.textContent = scenes[sceneNum].caption;
        }
    }

    if (btnVirtualTour && tourModal) {
        btnVirtualTour.addEventListener('click', () => {
            tourModal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Lock scrolling
            
            // Set initial scene
            switchScene(1);
        });
    }

    function closeModal() {
        if (tourModal) {
            tourModal.classList.remove('active');
            document.body.style.overflow = ''; // Unlock scrolling
        }
    }

    if (btnModalClose) btnModalClose.addEventListener('click', closeModal);
    if (modalOverlay) modalOverlay.addEventListener('click', closeModal);

    // Tour controls switch triggers
    tourControlBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const sceneNum = parseInt(btn.getAttribute('data-scene'), 10);
            switchScene(sceneNum);
        });
    });

    // 12. Scroll Reveal Animation Observer
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    const revealObserverOptions = {
        root: null,
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, revealObserverOptions);

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });
});
