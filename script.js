/* ================================================
   SCRIPT - Camiño dos Faros - Web Éducative FLE
   ================================================ */

document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initUnitsTabs();
    initMapInteraction();
    initBlogFilter();
    initResourcesTabs();
    initModal();
    initScrollAnimations();
});

/* ================================================
   NAVIGATION
   ================================================ */
function initNavigation() {
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    const navbar = document.querySelector('.navbar');

    // Mobile menu toggle
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuToggle.classList.remove('active');
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = 80;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/* ================================================
   UNITÉS TABS
   ================================================ */
function initUnitsTabs() {
    const tabs = document.querySelectorAll('.unit-tab');
    const contents = document.querySelectorAll('.unit-content');
    const prevBtn = document.querySelector('.unit-nav-btn.prev');
    const nextBtn = document.querySelector('.unit-nav-btn.next');
    const tabsContainer = document.getElementById('unitsTabs');

    let currentUnit = 1;
    const totalUnits = 15;

    function showUnit(unitNumber) {
        currentUnit = unitNumber;
        
        // Update tabs
        tabs.forEach(tab => {
            tab.classList.remove('active');
            if (parseInt(tab.dataset.unit) === unitNumber) {
                tab.classList.add('active');
            }
        });

        // Update content
        contents.forEach(content => {
            content.classList.remove('active');
            const contentUnit = parseInt(content.id.replace('unit-', ''));
            if (contentUnit === unitNumber) {
                content.classList.add('active');
            }
        });

        // Scroll tab into view
        const activeTab = document.querySelector('.unit-tab.active');
        if (activeTab && tabsContainer) {
            activeTab.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
        }
    }

    // Tab click handlers
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const unitNumber = parseInt(tab.dataset.unit);
            showUnit(unitNumber);
        });
    });

    // Navigation buttons
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            if (currentUnit > 1) {
                showUnit(currentUnit - 1);
            }
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            if (currentUnit < totalUnits) {
                showUnit(currentUnit + 1);
            }
        });
    }

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft' && currentUnit > 1) {
            showUnit(currentUnit - 1);
        } else if (e.key === 'ArrowRight' && currentUnit < totalUnits) {
            showUnit(currentUnit + 1);
        }
    });
}

/* ================================================
   MAP INTERACTION
   ================================================ */
function initMapInteraction() {
    const mapPoints = document.querySelectorAll('.map-point');
    const mapInfoPanel = document.getElementById('mapInfo');

    const placeInfo = {
        malpica: {
            title: 'Malpica de Bergantiños',
            description: 'Premier phare du Camiño dos Faros. Village de pêcheurs avec une plage spectaculaire.',
            facts: ['🗼 Phare historique', '🏖️ Plage de Lage', '🚤 Port de pêche']
        },
        carnota: {
            title: 'Plage de Carnota',
            description: 'La plus grande plage de Galice avec une dune naturelle préservée.',
            facts: ['🏖️ 1,4 km de longueur', '🌿 Dune protégée', '🌊 Vagues puissantes']
        },
        fisterra: {
            title: 'Fisterra (Finistère)',
            description: 'La "fin de la terre" pour les Romains. Coucher de soleil emblématique.',
            facts: ['🌅 Point culminant du chemin', '🗼 Phare célèbre', '⚓ Traditions maritimes']
        },
        muxia: {
            title: 'Muxía',
            description: 'Sanctuaire de la Virxe da Barca, lieu important du chemin jacquaire.',
            facts: ['⛪ Sanctuaire marin', '🐟 Traditions de pêche', '🛶 Route jacquaire']
        },
        sisagra: {
            title: 'Cabo Sisagra',
            description: 'Le point le plus élevé du chemin avec une vue spectaculaire sur l\'Atlantique.',
            facts: ['📍 238m d\'altitude', '🗼 Phare le plus haut d\'Espagne', '👁️ Vue panoramique']
        }
    };

    mapPoints.forEach(point => {
        point.addEventListener('click', () => {
            const place = point.dataset.place;
            const info = placeInfo[place];

            if (info && mapInfoPanel) {
                mapInfoPanel.innerHTML = `
                    <h4>${info.title}</h4>
                    <p>${info.description}</p>
                    <div class="place-facts">
                        ${info.facts.map(fact => `<span>${fact}</span>`).join('')}
                    </div>
                `;
            }

            // Highlight active point
            mapPoints.forEach(p => p.style.background = 'rgba(255, 255, 255, 0.9)');
            point.style.background = 'var(--primary)';
            point.style.color = 'white';
        });

        // Hover effect
        point.addEventListener('mouseenter', () => {
            point.style.transform = 'scale(1.2)';
        });

        point.addEventListener('mouseleave', () => {
            point.style.transform = 'scale(1)';
        });
    });
}

/* ================================================
   BLOG FILTER
   ================================================ */
function initBlogFilter() {
    const filterSelect = document.getElementById('blogFilter');
    const blogCards = document.querySelectorAll('.blog-card');

    if (filterSelect) {
        filterSelect.addEventListener('change', (e) => {
            const category = e.target.value;

            blogCards.forEach(card => {
                if (category === 'all' || card.dataset.category === category) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeIn 0.4s ease';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }
}

/* ================================================
   RESOURCES TABS
   ================================================ */
function initResourcesTabs() {
    const tabs = document.querySelectorAll('.resource-tab');
    const panels = document.querySelectorAll('.resource-panel');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const resource = tab.dataset.resource;

            // Update tabs
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            // Update panels
            panels.forEach(panel => {
                panel.classList.remove('active');
                if (panel.id === resource) {
                    panel.classList.add('active');
                }
            });
        });
    });
}

/* ================================================
   MODAL
   ================================================ */
function initModal() {
    const modal = document.getElementById('blogModal');
    const modalBody = document.getElementById('modalBody');

    // Close modal when clicking outside
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });

        // Close on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                closeModal();
            }
        });
    }
}

function openModal(type, postId = null) {
    const modal = document.getElementById('blogModal');
    const modalBody = document.getElementById('modalBody');

    if (!modal || !modalBody) return;

    const blogContent = {
        fisterra: {
            title: 'Mon village: Fisterra',
            author: 'María C.',
            content: `
                <p>Fisterra est un petit village de pêcheurs situé à l'extrémité ouest de la Costa da Morte. Quand on arrive, la première chose qu'on voit, c'est le grand phare qui domine la mer.</p>
                <p>Le phare de Fisterra est l'un des plus importants d'Espagne. Il a été construit en 1851 et se trouve à 120 mètres au-dessus du niveau de la mer. Les marins le voyaient de très loin, c'était un signal de terre!</p>
                <p>Les couchers de soleil à Fisterra sont célèbres dans le monde entier. Chaque soir, des centaines de personnes observent le soleil qui disparaît dans l'océan Atlantique. C'est romantique et un peu triste en même temps.</p>
                <p>Les habitants sont très gentils. Ils vivent de la pêche et du tourisme. Le dimanche, il y a un marché où on peut acheter du poisson frais directement des pêcheurs.</p>
                <p>Je suis fière de vivre ici. C'est un endroit spécial, à la fin du monde!</p>
            `
        },
        malpica: {
            title: 'Une journée à Malpica',
            author: 'Pablo L.',
            content: `
                <p>Ce matin, nous sommes allés à Malpica avec la classe. C'est une ville très belle avec une plage spectaculaire.</p>
                <p>Nous avons commencé par visiter le phare. Il est tout blanc et il brille quand le soleil le touche. De là-haut, on voit toute la côte. C'est impressionnant!</p>
                <p>Ensuite, nous avons marché jusqu'à la plage de Lage. Le sable est doré et l'eau est froide mais claire. Certains élèves se sont baignés, mais moi, j'ai préféré manger des empanadas au bord de la mer!</p>
                <p>Les empanadas de Malpica sont fameuses. C'est une pâte feuilletée avec de la morue ou du thon à l'intérieur. Délicieux!</p>
                <p>Nous avons passé une belle journée. J'aime découvrir ma propre région avec mes camarades.</p>
            `
        },
        muxia: {
            title: 'Interview: Un pêcheur de Muxía',
            author: 'Ana S.',
            content: `
                <p>J'ai interviewé M. Rodríguez, un pêcheur de Muxía. Il m'a parlé de son métier et de la vie dans ce village marin.</p>
                <p><strong>Comment êtes-vous devenu pêcheur?</strong></p>
                <p>Mon père était pêcheur, et son père aussi. Quand j'avais 15 ans, j'ai commencé à travailler sur le bateau. C'est difficile, mais c'est notre vie.</p>
                <p><strong>Qu'est-ce que vous préférez dans votre métier?</strong></p>
                <p>La mer, bien sûr! Et le matin, quand on sort, tout est calme. C'est magnifique. Et puis, quand on revient avec du bon poisson, je suis content.</p>
                <p><strong>Et les difficultés?</strong></p>
                <p>La mer est dangereuse. Quand il y a des tempêtes, on ne peut pas sortir. Et maintenant, il y a moins de poissons qu'avant. C'est triste.</p>
                <p>Merci à M. Rodríguez pour cette interview! J'ai appris beaucoup de choses sur la vie des pêcheurs.</p>
            `
        },
        galice: {
            title: 'Mon avis sur la Galice',
            author: 'Julie M. (France)',
            content: `
                <p>Je suis venue en Galice pendant les vacances de Noël et j'ai découvert un endroit magnifique!</p>
                <p>La première chose qui m'a frappée, c'est le vert. En France, je pensais que l'Espagne était jaune et sèche, mais pas du tout! La Galice est très verte, avec des prairies et des forêts.</p>
                <p>Les gens sont très gentils. Ils parlent lentement quand ils savent que je suis française. J'ai essayé de parler un peu d'espagnol et de galicien. Les gens souriaient!</p>
                <p>J'ai goûté des platos délicieux: pulpo (le poulpe!), empanadas, tortilla española... Todo era muy rico!</p>
                <p>Le paysage est spectaculaire. Les côtes sont rocheuses et les phares sont nombreux. J'ai pris beaucoup de photos.</p>
                <p>J'espère revenir bientôt. La Galice est un endroit spécial qui touche le cœur.</p>
            `
        },
        restaurant: {
            title: 'Dialogue: Au restaurant',
            author: 'Carlos R.',
            content: `
                <p><strong>Scène: Un restaurant à Fisterra</strong></p>
                <p><strong>Serveur:</strong> Bonjour! Bienvenue! Vous avez une réservation?</p>
                <p><strong>Touriste:</strong> Oui, pour deux personnes. Au nom de García.</p>
                <p><strong>Serveur:</strong> Parfait! Par ici, je vous prie. Voici le menu.</p>
                <p><strong>Touriste:</strong> Merci! Qu'est-ce que vous recommandez?</p>
                <p><strong>Serveur:</strong> Aujourd'hui, nous avons du poulpe frais! C'est notre spécialité. Ou peut-être du thon grillé avec des légumes.</p>
                <p><strong>Touriste:</strong> Mmm, excellent! Je prends le poulpe, s'il vous plaît.</p>
                <p><strong>Serveur:</strong> Et comme boisson? Nous avons un excellent vin albariño de la région.</p>
                <p><strong>Touriste:</strong> Parfait! Un demi-verre de vin blanc, alors.</p>
                <p><strong>Serveur:</strong> Très bon choix! Je reviens avec votre commande.</p>
                <p><em>Fin du dialogue. ¡Buen provecho!</em></p>
            `
        },
        santa: {
            title: 'La légende de la Santa Compaña',
            author: 'Laura M.',
            content: `
                <p>Un soir d'automne, Pablo marchait seul sur le chemin entre deux aldeas. Il était tard et il n'y avait pas de lune.</p>
                <p>Soudain, il entendit des lumières derrière lui. Des lumières blanches et froides. Il eut peur et se retourna.</p>
                <p>Ce qu'il vit le glaça d'effroi: une procession de personnes habillées de blanc, avec des cierges à la main. Ils avançaient lentement, sans faire de bruit.</p>
                <p>C'était la Santa Compaña! La procession des morts qui traverse les chemins de Galice.</p>
                <p>Pablo se souvint des conseils de sa grand-mère: "Si tu vois la Santa Compaña, mets-toi à genoux et prie!" Il obéit immédiatement.</p>
                <p>Les esprits passèrent près de lui. Il sentit un froid intense. Puis, lentement, ils disparurent dans la brume.</p>
                <p>Depuis ce jour, Pablo ne marche plus seul la nuit. Et vous? Avez-vous déjà vu quelque chose de strange sur les chemins?</p>
            `
        }
    };

    if (type === 'read' && postId && blogContent[postId]) {
        const post = blogContent[postId];
        modalBody.innerHTML = `
            <h3>${post.title}</h3>
            <p style="color: var(--primary); margin-bottom: 1.5rem;">Par ${post.author}</p>
            <div style="line-height: 1.8; color: var(--gray-light);">
                ${post.content}
            </div>
        `;
    } else if (type === 'publish') {
        modalBody.innerHTML = `
            <h3>📝 Publier un texte</h3>
            <p>Rédige ton texte et envoie-le à ton professeur pour publication!</p>
            <form class="publish-form" onsubmit="handlePublish(event)">
                <div class="form-group">
                    <label for="postTitle">Titre</label>
                    <input type="text" id="postTitle" placeholder="Le titre de ton texte" required>
                </div>
                <div class="form-group">
                    <label for="postCategory">Catégorie</label>
                    <select id="postCategory" required>
                        <option value="">Sélectionne une catégorie</option>
                        <option value="lieux">Description de lieux</option>
                        <option value="culture">Texte culturel</option>
                        <option value="dialogues">Dialogue</option>
                        <option value="legendes">Légende</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="postContent">Ton texte (en français)</label>
                    <textarea id="postContent" rows="8" placeholder="Écris ton texte ici..." required></textarea>
                </div>
                <button type="submit" class="btn-primary" style="width: 100%;">Envoyer pour publication</button>
            </form>
        `;
    }

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('blogModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function handlePublish(e) {
    e.preventDefault();
    alert('Merci! Ton texte a été envoyé à ton professeur pour correction et publication.');
    closeModal();
}

/* ================================================
   SCROLL ANIMATIONS
   ================================================ */
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements
    const animatedElements = document.querySelectorAll(
        '.place-card, .blog-card, .culture-card, .obj-card, .activity-card, .culture-card, .tool-card, .collab-item, .example-item'
    );

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Add visible class styles
    const style = document.createElement('style');
    style.textContent = `
        .visible {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
}

/* ================================================
   QUIZ FUNCTIONALITY (for UD1)
   ================================================ */
document.querySelectorAll('.quiz-option').forEach(option => {
    option.addEventListener('click', function() {
        const container = this.closest('.quiz-container');
        const isCorrect = this.dataset.correct === 'true';
        
        // Disable all options
        container.querySelectorAll('.quiz-option').forEach(opt => {
            opt.disabled = true;
            if (opt.dataset.correct === 'true') {
                opt.style.background = 'var(--success)';
                opt.style.borderColor = 'var(--success)';
            } else {
                opt.style.opacity = '0.5';
            }
        });

        // Show result
        const result = container.querySelector('.quiz-result');
        if (result) {
            result.classList.remove('hidden');
            result.innerHTML = isCorrect 
                ? '<p style="color: var(--success);">✓ Bonne réponse!</p>'
                : '<p style="color: var(--danger);">✗ Mauvaise réponse. Réessayez!</p>';
        }
    });
});

/* ================================================
   VOCABULARY CARD EXPANSION
   ================================================ */
document.querySelectorAll('.vocab-item').forEach(card => {
    card.addEventListener('click', function() {
        this.classList.toggle('expanded');
    });
});

/* ================================================
   PRINT FUNCTIONALITY
   ================================================ */
function printUnit(unitNumber) {
    const unit = document.getElementById(`unit-${unitNumber}`);
    if (unit) {
        const printWindow = window.open('', '_blank');
        printWindow.document.write(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>UD${unitNumber} - Camiño dos Faros</title>
                <style>
                    body { font-family: Arial, sans-serif; padding: 20px; line-height: 1.6; }
                    h1 { color: #0891b2; }
                    h2 { color: #0f172a; margin-top: 30px; }
                    .vocab-item { margin: 10px 0; padding: 10px; border-bottom: 1px solid #eee; }
                    .activity-card { background: #f8fafc; padding: 15px; margin: 15px 0; border-radius: 8px; }
                    .text-example { background: #f1f5f9; padding: 15px; border-left: 3px solid #14b8a6; margin: 10px 0; }
                </style>
            </head>
            <body>
                ${unit.innerHTML}
            </body>
            </html>
        `);
        printWindow.document.close();
        printWindow.print();
    }
}

/* ================================================
   EXPORT/IMPORT DATA (for teachers)
   ================================================ */
function exportStudentWork() {
    const data = {
        units: [],
        blogPosts: []
    };
    
    console.log('Export data:', JSON.stringify(data, null, 2));
    alert('Fonctionnalité à venir: Export des travaux des élèves');
}

function importStudentWork() {
    alert('Fonctionnalité à venir: Import des travaux des élèves');
}
