// Merged logic to avoid module issues

/**
 * Data
 */
const vibes = [
    {
        title: "Mentally fried but alive",
        emoji: "🫠",
        activity: "Stare at a wall.",
        instruction: "For exactly 3 minutes. No thoughts allowed.",
        colors: ["#fbc2eb", "#a6c1ee"],
        energy: 1 // Low energy
    },
    {
        title: "Fake productivity mode",
        emoji: "💻",
        activity: "Rearrange your desktop icons.",
        instruction: "Ideally by color. It feels like work but isn't.",
        colors: ["#e0c3fc", "#8ec5fc"],
        energy: 4 // Medium-Low
    },
    {
        title: "Soft reset needed",
        emoji: "🌱",
        activity: "Touch some grass.",
        instruction: "Or a houseplant. Just something organic.",
        colors: ["#d4fc79", "#96e6a1"],
        energy: 2 // Low
    },
    {
        title: "Main character energy",
        emoji: "✨",
        activity: "Walk like you're in a music video.",
        instruction: "Put on headphones. Ignoring everyone is key.",
        colors: ["#f6d365", "#fda085"],
        energy: 9 // High
    },
    {
        title: "Low battery human",
        emoji: "🪫",
        activity: "Horizontal life pause.",
        instruction: "Lie on the floor. The floor is your friend.",
        colors: ["#84fab0", "#8fd3f4"],
        energy: 0 // Very Low
    },
    {
        title: "Chaos Gremlin",
        emoji: "👾",
        activity: "Close all your tabs.",
        instruction: "Without saving. Live dangerously.",
        colors: ["#ff9a9e", "#fecfef"],
        energy: 8 // High
    },
    {
        title: "Sophisticated Procrastination",
        emoji: "🧐",
        activity: "Research expensive hobbies.",
        instruction: "You definitely need an espresso machine setup.",
        colors: ["#a1c4fd", "#c2e9fb"],
        energy: 5 // Medium
    },
    {
        title: "Hydration Threat",
        emoji: "💧",
        activity: "Drink water excessively.",
        instruction: "Aggressively sip until the headache goes away.",
        colors: ["#cfd9df", "#e2ebf0"],
        energy: 6 // Medium-High
    }
];

const phrases = {
    thinking: [
        "Reading your vibe...",
        "Analying life choices...",
        "Floating through the void...",
        "Asking the universal DJ...",
        "Calculating antigravity...",
        "Calibrating cosmic energy...",
        "Drifting..."
    ],
    easterEgg: {
        procrastinating: "You don't trust the universe, huh? 😏",
        nothing: "Do absolutely nothing today. You earned it. 🏆"
    }
};

/**
 * Particle System
 */
/**
 * Cosmic Visuals Engine
 */
class CosmicVisuals {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;

        this.ctx = this.canvas.getContext('2d');
        this.width = window.innerWidth;
        this.height = window.innerHeight;

        this.stars = [];
        this.planets = [];
        this.galaxies = [];
        this.scrollOffset = 0;

        // Configuration
        this.config = {
            starCount: 200,
            planetCount: 3,
            galaxyCount: 1,
            colors: {
                deep: ['#0f0c29', '#302b63', '#24243e'], // Dark mode base
                light: ['#1e1e2f', '#3b3b58', '#5a5a7f'] // Just slightly lighter 
            }
        };

        this.init();
        window.addEventListener('resize', () => this.resize());
        window.addEventListener('scroll', () => { this.scrollOffset = window.scrollY * 0.2; });
        this.animate();
    }

    init() {
        this.resize();
        this.createStars();
        this.createPlanets();
        this.createGalaxies();
    }

    resize() {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
    }

    setTheme(colors) {
        // Theme updates can influence planet colors or star brightness
        // For now, cosmic background stays relatively consistent but adapts brightness
    }

    createStars() {
        this.stars = [];
        for (let i = 0; i < this.config.starCount; i++) {
            this.stars.push({
                x: Math.random() * this.width,
                y: Math.random() * this.height,
                size: Math.random() * 1.5 + 0.5,
                twinkleSpeed: Math.random() * 0.05 + 0.01,
                alpha: Math.random(),
                direction: Math.random() > 0.5 ? 1 : -1,
                speed: Math.random() * 0.2
            });
        }
    }

    createPlanets() {
        this.planets = [];
        const colors = [['#ff9a9e', '#fecfef'], ['#a18cd1', '#fbc2eb'], ['#84fab0', '#8fd3f4']];

        for (let i = 0; i < this.config.planetCount; i++) {
            this.planets.push({
                x: Math.random() * this.width,
                y: Math.random() * this.height,
                size: Math.random() * 30 + 10,
                color: colors[i % colors.length],
                speedX: (Math.random() - 0.5) * 0.1,
                speedY: (Math.random() - 0.5) * 0.1,
                angle: 0
            });
        }
    }

    createGalaxies() {
        this.galaxies = [{
            x: this.width * 0.8,
            y: this.height * 0.2,
            size: 150,
            arms: 3,
            angle: 0,
            color: '#6c5ce7'
        }];
    }

    update() {
        // Stars
        this.stars.forEach(s => {
            s.alpha += s.twinkleSpeed * s.direction;
            if (s.alpha > 1 || s.alpha < 0.2) s.direction *= -1;
            s.y -= s.speed; // Drift up
            if (s.y < 0) s.y = this.height;
        });

        // Planets
        this.planets.forEach(p => {
            p.x += p.speedX;
            p.y += p.speedY;
            p.angle += 0.002;

            // Wrap around
            if (p.x < -50) p.x = this.width + 50;
            if (p.x > this.width + 50) p.x = -50;
            if (p.y < -50) p.y = this.height + 50;
            if (p.y > this.height + 50) p.y = -50;
        });

        // Galaxies
        this.galaxies.forEach(g => {
            g.angle += 0.001;
        });
    }

    draw() {
        this.ctx.clearRect(0, 0, this.width, this.height);

        // Stars
        this.stars.forEach(s => {
            this.ctx.fillStyle = "white";
            this.ctx.globalAlpha = s.alpha;
            this.ctx.beginPath();
            this.ctx.arc(s.x, s.y - this.scrollOffset * 0.1, s.size, 0, Math.PI * 2);
            this.ctx.fill();
        });

        // Galaxies
        this.galaxies.forEach(g => {
            this.ctx.save();
            this.ctx.translate(g.x, g.y - this.scrollOffset * 0.05);
            this.ctx.rotate(g.angle);

            // Simple spiral visualization
            for (let i = 0; i < 300; i++) {
                const angle = 0.1 * i;
                const x = (1 + angle) * Math.cos(angle + g.angle);
                const y = (1 + angle) * Math.sin(angle + g.angle);
                this.ctx.fillStyle = g.color;
                this.ctx.globalAlpha = (300 - i) / 1000;
                this.ctx.beginPath();
                this.ctx.arc(x, y, 1.5, 0, Math.PI * 2);
                this.ctx.fill();
            }
            this.ctx.restore();
        });

        // Planets
        this.planets.forEach(p => {
            const grad = this.ctx.createLinearGradient(p.x - p.size, p.y - p.size, p.x + p.size, p.y + p.size);
            grad.addColorStop(0, p.color[0]);
            grad.addColorStop(1, p.color[1]);

            this.ctx.fillStyle = grad;
            this.ctx.globalAlpha = 0.8;
            this.ctx.shadowBlur = 20;
            this.ctx.shadowColor = p.color[1];
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y - this.scrollOffset * 0.2, p.size, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.shadowBlur = 0;
        });

        this.ctx.globalAlpha = 1;
    }

    animate() {
        this.update();
        this.draw();
        requestAnimationFrame(() => this.animate());
    }
}

/**
 * App Logic
 */
const els = {
    btn: document.getElementById('decide-btn'),
    thinking: document.getElementById('thinking'),
    thinkingText: document.querySelector('.thinking-text'),
    result: document.getElementById('result'),
    vibeEmoji: document.querySelector('.vibe-emoji'),
    vibeTitle: document.querySelector('.vibe-title'),
    vibeActivity: document.querySelector('.vibe-activity'),
    vibeInstruction: document.querySelector('.vibe-instruction'),
    resetBtn: document.getElementById('reset-btn'),
    acceptBtn: document.getElementById('accept-btn'),
    themeToggle: document.getElementById('theme-toggle'),
    moodSlider: document.getElementById('mood-slider'),
    favList: document.getElementById('fav-list'),
    shareBtn: document.getElementById('share-btn'),
    quizBtn: document.getElementById('quiz-btn'),
    favBtn: document.getElementById('fav-btn'),
    modal: document.getElementById('modal-overlay'),
    modalContent: document.getElementById('modal-content'),
    modalClose: document.getElementById('modal-close'),
    navbar: document.getElementById('navbar')
};

let lastVibeIndex = -1;
let clickCount = 0;
let clickTimer = null;
let particles;
let isDark = false;
let favorites = JSON.parse(localStorage.getItem('vibeFavorites')) || [];

const init = () => {
    if (!els.btn) return;

    // Initialize Cosmic Visuals
    particles = new CosmicVisuals('particle-canvas');

    // Event Listeners
    els.btn.addEventListener('click', startProcess);
    els.resetBtn.addEventListener('click', resetApp);
    els.acceptBtn.addEventListener('click', addToFavorites);
    els.themeToggle.addEventListener('click', toggleTheme);
    els.quizBtn.addEventListener('click', startQuiz);
    els.favBtn.addEventListener('click', showFavorites);
    els.shareBtn.addEventListener('click', showShareModal);
    els.modalClose.addEventListener('click', closeModal);

    // Scroll listener for Navbar
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            els.navbar.classList.add('scrolled');
            els.navbar.classList.remove('hidden');
        } else {
            els.navbar.classList.remove('scrolled');
            els.navbar.classList.add('hidden'); // Optional: hide completely at top if desired, or just style
        }
    });

    // Antigravity classes
    els.btn.classList.add('float');

    // Initial colors
    applyColors(["#f5f7fa", "#c3cfe2"]);
};

const toggleTheme = () => {
    isDark = !isDark;
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
    els.themeToggle.textContent = isDark ? '🌖' : '🌓';

    if (isDark) {
        particles.setTheme(['#ffffff', '#a29bfe']);
    } else {
        particles.setTheme(['#6c5ce7', '#ffffff']);
    }
};

const applyColors = (colors) => {
    if (!isDark) {
        document.documentElement.style.setProperty('--bg-color-1', colors[0]);
        document.documentElement.style.setProperty('--bg-color-2', colors[1]);
        particles.setTheme([colors[0], '#ffffff']);
    }
};

const getWeightedVibe = () => {
    const sliderVal = els.moodSlider ? parseInt(els.moodSlider.value) : 50;
    let candidates = vibes;
    if (sliderVal < 40) {
        candidates = vibes.filter(v => v.energy <= 4);
    } else if (sliderVal > 60) {
        candidates = vibes.filter(v => v.energy >= 6);
    }
    if (candidates.length === 0) candidates = vibes;
    const randomIndex = Math.floor(Math.random() * candidates.length);
    return candidates[randomIndex];
};

const startProcess = () => {
    clickCount++;
    if (clickTimer) clearTimeout(clickTimer);
    clickTimer = setTimeout(() => { clickCount = 0; }, 2000);

    if (clickCount >= 5) {
        showEasterEgg();
        clickCount = 0;
        return;
    }

    // UI Updates
    els.btn.classList.add('hidden');
    // Hide title logic - class based
    if (document.querySelector('.hero-logo-container')) document.querySelector('.hero-logo-container').classList.add('hidden');
    if (document.querySelector('.subheading')) document.querySelector('.subheading').classList.add('hidden');

    if (document.querySelector('.slider-container')) document.querySelector('.slider-container').classList.add('hidden');
    els.thinking.classList.remove('hidden');
    els.result.classList.add('hidden');

    cycleThinkingMessages();
};

const cycleThinkingMessages = () => {
    let steps = 0;
    const maxSteps = 4;
    els.thinkingText.textContent = phrases.thinking[Math.floor(Math.random() * phrases.thinking.length)];
    const interval = setInterval(() => {
        els.thinkingText.textContent = phrases.thinking[Math.floor(Math.random() * phrases.thinking.length)];
        steps++;
        if (steps >= maxSteps) {
            clearInterval(interval);
            setTimeout(showResult, 600);
        }
    }, 500);
};

const showResult = (overrideVibe = null) => {
    const vibe = overrideVibe || getWeightedVibe();

    els.vibeEmoji.textContent = vibe.emoji;
    els.vibeTitle.textContent = vibe.title;
    els.vibeActivity.textContent = vibe.activity;
    els.vibeInstruction.textContent = vibe.instruction;

    const isFav = favorites.some(f => f.title === vibe.title);
    els.acceptBtn.textContent = isFav ? "Saved to Favorites ❤️" : "Save to Favorites 🤍";

    applyColors(vibe.colors);

    els.thinking.classList.add('hidden');
    els.result.classList.remove('hidden');
    els.result.classList.add('float');
};

const showEasterEgg = () => {
    els.btn.classList.add('hidden');
    els.thinking.classList.add('hidden');
    els.result.classList.remove('hidden');
    els.vibeEmoji.textContent = "😏";
    els.vibeTitle.textContent = "Trust Issues?";
    els.vibeActivity.textContent = phrases.easterEgg.procrastinating;
    els.vibeInstruction.textContent = "The universe is judging your speed.";
};

const addToFavorites = () => {
    const currentVibeTitle = els.vibeTitle.textContent;
    const isFav = favorites.some(f => f.title === currentVibeTitle);

    if (isFav) return;

    const vibe = vibes.find(v => v.title === currentVibeTitle) || {
        title: currentVibeTitle,
        emoji: els.vibeEmoji.textContent,
        activity: els.vibeActivity.textContent,
        colors: ["#fff"]
    };

    favorites.push(vibe);
    localStorage.setItem('vibeFavorites', JSON.stringify(favorites));

    els.acceptBtn.textContent = "Saved to Favorites ❤️";
    els.acceptBtn.classList.add('celebrate');
    setTimeout(() => els.acceptBtn.classList.remove('celebrate'), 500);
};

/* --- Modals --- */

const showModal = (content) => {
    els.modalContent.innerHTML = content;
    els.modal.classList.remove('hidden');
};

const closeModal = () => {
    els.modal.classList.add('hidden');
};

const showFavorites = () => {
    if (favorites.length === 0) {
        showModal(`<h2>My Vibe Collection</h2><p>No vibes saved yet. Go find some!</p><button onclick="document.getElementById('modal-overlay').classList.add('hidden')" class="reset-btn" style="width:100%; margin-top:20px">Close</button>`);
        return;
    }

    let html = `<h2>My Vibe Collection</h2><div class="fav-grid">`;
    favorites.forEach(fav => {
        html += `
        <div class="fav-card">
            <span style="font-size: 2rem;">${fav.emoji}</span>
            <div>
                <h3>${fav.title}</h3>
                <p>${fav.activity}</p>
            </div>
        </div>`;
    });
    html += `</div>
    <button id="close-fav" class="reset-btn" style="width:100%; margin-top:20px">Close</button>
    `;
    showModal(html);

    document.getElementById('close-fav').addEventListener('click', closeModal);
};

const startQuiz = () => {
    const questions = [
        {
            q: "How much energy do you have?", answers: [
                { t: "None at all 🪫", score: 0 },
                { t: "A little 🌱", score: 2 },
                { t: "Too much ⚡", score: 8 }
            ]
        },
        {
            q: "Social or Solo?", answers: [
                { t: "Leave me alone 🔒", score: 0 },
                { t: "Maybe one person 👥", score: 5 },
                { t: "Party time 🎉", score: 10 }
            ]
        }
    ];

    let currentQ = 0;
    let totalScore = 0;

    const renderQ = () => {
        if (currentQ >= questions.length) {
            closeModal();
            const finalScore = totalScore / questions.length;
            els.moodSlider.value = finalScore * 10;
            startProcess();
            return;
        }

        const q = questions[currentQ];
        let html = `<h2>Vibe Check (${currentQ + 1}/${questions.length})</h2>
                    <p style="margin-bottom: 20px;">${q.q}</p>
                    <div class="quiz-options">`;
        q.answers.forEach((ans, idx) => {
            html += `<button class="quiz-btn-opt" data-score="${ans.score}">${ans.t}</button>`;
        });
        html += `</div>
        <button id="close-quiz" class="reset-btn" style="width:100%; margin-top:20px">Cancel</button>
        `;
        showModal(html);

        document.querySelectorAll('.quiz-btn-opt').forEach(btn => {
            btn.addEventListener('click', (e) => {
                totalScore += parseInt(e.target.dataset.score);
                currentQ++;
                renderQ();
            });
        });

        document.getElementById('close-quiz').addEventListener('click', closeModal);
    };

    renderQ();
};

const showShareModal = () => {
    const title = els.vibeTitle.textContent;
    const emoji = els.vibeEmoji.textContent;
    const activity = els.vibeActivity.textContent;
    const shareData = {
        title: 'ZeroGravity Vibe',
        text: `${emoji} ${title}\n${activity}\n\nVia ZeroGravity ✨`,
        url: window.location.href
    };

    const html = `
        <h2>Share Vibe</h2>
        <div class="share-preview" style="background: linear-gradient(135deg, ${getComputedStyle(document.documentElement).getPropertyValue('--bg-color-1')}, ${getComputedStyle(document.documentElement).getPropertyValue('--bg-color-2')}); color: var(--text-main); padding: 20px; border-radius: 20px; text-align: center; margin-bottom: 20px;">
            <div style="font-size: 4rem;">${emoji}</div>
            <h3>${title}</h3>
            <p>${activity}</p>
            <p style="opacity: 0.7; font-size: 0.8rem; margin-top: 10px;">✨ ZeroGravity</p>
        </div>
        <div style="display: flex; gap: 10px; flex-direction: column;">
            ${navigator.share ? `<button id="native-share-btn" class="decide-btn" style="width: 100%;">Share via...</button>` : ''}
            <button id="copy-text-btn" class="action-btn" style="width: 100%; border: 1px solid var(--accent); color: var(--accent);">Copy Text</button>
            <button id="close-modal-btn" class="reset-btn" style="width: 100%;">Close</button>
        </div>
    `;
    showModal(html);

    if (navigator.share) {
        document.getElementById('native-share-btn').addEventListener('click', async () => {
            try {
                await navigator.share(shareData);
            } catch (err) { }
        });
    }

    document.getElementById('copy-text-btn').addEventListener('click', () => {
        const text = shareData.text;
        navigator.clipboard.writeText(text).then(() => {
            const btn = document.getElementById('copy-text-btn');
            btn.innerText = "Copied! ✅";
            setTimeout(() => btn.innerText = "Copy Text", 2000);
        });
    });

    document.getElementById('close-modal-btn').addEventListener('click', closeModal);
};

const resetApp = () => {
    els.result.classList.add('hidden');
    els.result.classList.remove('float');
    els.btn.classList.remove('hidden');
    // Reveal logo container
    if (document.querySelector('.hero-logo-container')) document.querySelector('.hero-logo-container').classList.remove('hidden');
    if (document.querySelector('.subheading')) document.querySelector('.subheading').classList.remove('hidden');
    if (document.querySelector('.slider-container')) document.querySelector('.slider-container').classList.remove('hidden');
    els.thinkingText.textContent = "Analyzing mental chaos...";
    els.acceptBtn.textContent = "Save to Favorites 🤍";
};

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
