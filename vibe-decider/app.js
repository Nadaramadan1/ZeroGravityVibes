// Merged logic to avoid module issues

/**
 * Data
 */
// Data is now loaded from data.js
const historyBuffer = []; // Keep track of last 3 vibes to avoid repetition

/**
 * Particle System
 */
/**
 * Cosmic Visuals Engine
 */
/**
 * Cosmic Visuals Engine (Upgrade 2.0)
 * Features:
 * - Parallax Starfield (3 Layers)
 * - Rotating Spiral Galaxies
 * - Floating Planetoids
 * - Nebula Fog Overlay
 * - Mouse Parallax Interaction
 */
class CosmicVisuals {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;

        this.ctx = this.canvas.getContext('2d');
        this.width = window.innerWidth;
        this.height = window.innerHeight;

        this.particles = [];
        this.mouse = { x: this.width / 2, y: this.height / 2 };
        this.currentThemeColors = ['#6c5ce7', '#a29bfe']; // Default

        this.init();

        window.addEventListener('resize', () => this.resize());
        window.addEventListener('mousemove', (e) => {
            // Smooth mouse tracking for parallax
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        });

        this.animate();
    }

    init() {
        this.resize();
        this.createUniverse();
    }

    resize() {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        // Re-create heavily positioned elements if needed, or just let them drift
    }

    setTheme(colors) {
        this.currentThemeColors = colors;
        // Update galaxy/planet colors immediately
        this.particles.forEach(p => {
            if (p.updateTheme) p.updateTheme(colors);
        });
    }

    createUniverse() {
        this.particles = [];

        // 1. STARFIELD (3 Layers of Depth)
        // Background Stars (Slow, Small)
        for (let i = 0; i < 200; i++) this.particles.push(new Star(this.width, this.height, 0.5, 0.05));
        // Midground Stars (Medium speed)
        for (let i = 0; i < 100; i++) this.particles.push(new Star(this.width, this.height, 1.2, 0.1));
        // Foreground Stars (Fast, Brighter)
        for (let i = 0; i < 50; i++) this.particles.push(new Star(this.width, this.height, 2, 0.2));

        // 2. NEBULAE (Cloud-like Globs)
        for (let i = 0; i < 5; i++) {
            this.particles.push(new Nebula(this.width, this.height));
        }

        // 3. GALAXIES (Spiral Systems)
        // One main galaxy, maybe one far away
        this.particles.push(new Galaxy(this.width * 0.2, this.height * 0.3, 80, this.currentThemeColors));
        this.particles.push(new Galaxy(this.width * 0.8, this.height * 0.8, 120, this.currentThemeColors));

        // 4. PLANETOIDS (Floating Planets)
        this.particles.push(new Planet(this.width, this.height, 40));
        this.particles.push(new Planet(this.width, this.height, 25));
    }

    draw() {
        // Clear with slight trail for motion blur feel if desired, but clean clear is better for crispy stars
        this.ctx.clearRect(0, 0, this.width, this.height);

        // Sort by Z-index (simulated by type logic: Nebula -> Stars -> Galaxy -> Planet)
        // Actually, painter's algorithm: Draw Background -> Foreground

        // We will just iterate existing array. Order in createUniverse matters.
        // But galaxies should be behind planets usually.
        // Let's rely on creation order: Stars, Nebula, Galaxy, Planet.

        this.particles.forEach(p => {
            p.update(this.mouse.x, this.mouse.y);
            p.draw(this.ctx);
        });
    }

    animate() {
        this.draw();
        requestAnimationFrame(() => this.animate());
    }
}

/**
 * ENTITIES
 */

class Star {
    constructor(w, h, sizeMax, speedRatio) {
        this.w = w;
        this.h = h;
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.size = Math.random() * sizeMax;
        this.baseSize = this.size;
        this.speed = speedRatio;
        this.alpha = Math.random();
        this.twinkleDir = Math.random() > 0.5 ? 0.02 : -0.02;
    }

    update(mx, my) {
        // Natural drift
        this.y -= this.speed;

        // Mouse Parallax (very subtle)
        const dx = (mx - this.w / 2) * (this.speed * 0.02);
        const dy = (my - this.h / 2) * (this.speed * 0.02);
        this.x += dx * 0.01; // Smooth dampening would be better but simple shift works

        // Wrap
        if (this.y < 0) {
            this.y = this.h;
            this.x = Math.random() * this.w;
        }
        if (this.x < 0) this.x = this.w;
        if (this.x > this.w) this.x = 0;

        // Twinkle
        this.alpha += this.twinkleDir;
        if (this.alpha > 1 || this.alpha < 0.2) this.twinkleDir *= -1;
    }

    draw(ctx) {
        ctx.fillStyle = `rgba(255, 255, 255, ${this.alpha})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }

    updateTheme(c) { } // Stars don't care
}

class Nebula {
    constructor(w, h) {
        this.w = w;
        this.h = h;
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.radius = 100 + Math.random() * 300;
        this.vx = (Math.random() - 0.5) * 0.2;
        this.vy = (Math.random() - 0.5) * 0.2;
        this.color = Math.random() > 0.5 ? 'rgba(60, 20, 100, 0.1)' : 'rgba(20, 60, 100, 0.1)';
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;

        // Wrap
        if (this.x < -this.radius) this.x = this.w + this.radius;
        if (this.x > this.w + this.radius) this.x = -this.radius;
        if (this.y < -this.radius) this.y = this.h + this.radius;
        if (this.y > this.h + this.radius) this.y = -this.radius;
    }

    draw(ctx) {
        // Soft gradient blob
        const g = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius);
        g.addColorStop(0, this.color);
        g.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
    }

    updateTheme(c) {
        // Maybe shift nebula color slightly to match theme accent
        // this.color = hexToRgba(c[0], 0.1); 
    }
}

class Galaxy {
    constructor(x, y, radius, colors) {
        this.x = x;
        this.y = y;
        this.baseRadius = radius;
        this.colors = colors;
        this.stars = [];
        this.angle = 0;

        // Create spiral arms
        const arms = 3;
        const count = 150;
        for (let i = 0; i < count; i++) {
            const arm = i % arms;
            const dist = Math.random() * radius;
            const theta = (dist / 20) + (arm * (Math.PI * 2 / arms)); // Spiral math
            this.stars.push({
                dist: dist,
                baseTheta: theta,
                size: Math.random() * 2,
                colorIdx: Math.floor(Math.random() * 2), // 0 or 1
                offset: Math.random() * 10 // Scatter
            });
        }
    }

    update(mx, my) {
        this.angle += 0.002; // Slow rotation
        this.x += Math.sin(this.angle) * 0.1; // Slight drift
    }

    draw(ctx) {
        this.stars.forEach(s => {
            const currentTheta = s.baseTheta + this.angle;
            const x = this.x + Math.cos(currentTheta) * (s.dist + Math.sin(this.angle) * 5);
            const y = this.y + Math.sin(currentTheta) * (s.dist + Math.cos(this.angle) * 5);

            ctx.fillStyle = this.colors[s.colorIdx];
            ctx.globalAlpha = 1 - (s.dist / this.baseRadius) * 0.8; // Fade out at edges
            ctx.beginPath();
            ctx.arc(x, y, s.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.globalAlpha = 1;
        });
    }

    updateTheme(c) {
        this.colors = c;
    }
}

class Planet {
    constructor(w, h, r) {
        this.w = w;
        this.h = h;
        this.r = r;
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.colorStr = `hsl(${Math.random() * 360}, 60%, 70%)`;
        this.angle = 0;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.angle += 0.01;

        if (this.x < -this.r) this.x = this.w + this.r;
        if (this.x > this.w + this.r) this.x = -this.r;
        if (this.y < -this.r) this.y = this.h + this.r;
        if (this.y > this.h + this.r) this.y = -this.r;
    }

    draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle); // Rotate planet? or just shadow

        const g = ctx.createLinearGradient(-this.r, -this.r, this.r, this.r);
        g.addColorStop(0, this.colorStr);
        g.addColorStop(1, 'rgba(0,0,0,0.2)'); // Shadow side

        ctx.fillStyle = g;
        ctx.shadowBlur = 20;
        ctx.shadowColor = this.colorStr;

        ctx.beginPath();
        ctx.arc(0, 0, this.r, 0, Math.PI * 2);
        ctx.fill();

        // Ring?
        ctx.strokeStyle = 'rgba(255,255,255,0.3)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.ellipse(0, 0, this.r * 1.5, this.r * 0.3, Math.PI / 4, 0, Math.PI * 2);
        ctx.stroke();

        ctx.restore();
    }

    updateTheme(c) {
        // Maybe update planet hue based on theme?
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
    navbar: document.getElementById('navbar'),
    moodInput: document.getElementById('ai-mood-input'),
    moodInputBtn: document.getElementById('ai-mood-submit')
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
    els.shareBtn.addEventListener('click', shareVibeAsImage);
    els.modalClose.addEventListener('click', closeModal);

    // New Input Listeners
    if (els.moodInputBtn) {
        els.moodInputBtn.addEventListener('click', startProcess);
    }
    if (els.moodInput) {
        els.moodInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') startProcess();
        });
    }

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

const applyColors = (colorsOrTheme) => {
    let colors = colorsOrTheme;
    // If it's a theme string, look it up
    if (typeof colorsOrTheme === 'string') {
        colors = COSMIC_THEMES[colorsOrTheme] || COSMIC_THEMES['MilkyWay'];
    }

    if (!isDark) {
        document.documentElement.style.setProperty('--bg-color-1', colors[0]);
        document.documentElement.style.setProperty('--bg-color-2', colors[1]);
        particles.setTheme([colors[0], '#ffffff']);
    }
};

const getTimeOfDay = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 10) return 'morning';
    if (hour >= 10 && hour < 17) return 'work';
    if (hour >= 17 && hour < 21) return 'evening';
    return 'night';
};

const detectMood = (text) => {
    if (!text) return null;
    text = text.toLowerCase();

    // Check against keywords in MOOD_KEYWORDS (from data.js)
    for (const [vibe, keywords] of Object.entries(MOOD_KEYWORDS)) {
        if (keywords.some(k => text.includes(k))) {
            return vibe;
        }
    }
    return null;
};

const getSmartVibe = () => {
    const time = getTimeOfDay();

    // 1. Detect Mood from Input OR Slider
    let targetVibe = null;
    const inputText = els.moodInput ? els.moodInput.value.trim() : '';

    // Try AI detection first
    if (inputText) {
        targetVibe = detectMood(inputText);
        console.log(`AI Detection: "${inputText}" -> ${targetVibe}`);
    }

    // Fallback to Slider if no AI match
    if (!targetVibe) {
        const sliderVal = els.moodSlider ? parseInt(els.moodSlider.value) : 50;
        if (sliderVal < 25) targetVibe = 'calm';
        else if (sliderVal < 50) targetVibe = 'focused';
        else if (sliderVal < 75) targetVibe = 'energetic';
        else targetVibe = 'party';
        console.log(`Slider Detection: ${sliderVal} -> ${targetVibe}`);
    }

    // 2. Filter Cards from globalVibes
    let candidates = globalVibes.filter(v => {
        // Time filter
        const timeMatch = v.time.includes(time) || v.time.includes('any');
        // Vibe filter (using new 'vibe' property)
        const moodMatch = v.vibe === targetVibe;
        // History filter
        const notRecentlyShown = !historyBuffer.includes(v.title);

        return timeMatch && moodMatch && notRecentlyShown;
    });

    // Fallback 1: Relax history
    if (candidates.length === 0) {
        candidates = globalVibes.filter(v =>
            (v.time.includes(time) || v.time.includes('any')) &&
            v.vibe === targetVibe
        );
    }

    // Fallback 2: Relax time (keep mood)
    if (candidates.length === 0) {
        candidates = globalVibes.filter(v => v.vibe === targetVibe);
    }

    // Fallback 3: Relax mood (keep time)
    if (candidates.length === 0) {
        candidates = globalVibes.filter(v => v.time.includes(time) || v.time.includes('any'));
    }

    // Pick random
    const vibe = candidates[Math.floor(Math.random() * candidates.length)];

    // Update history
    if (vibe) {
        historyBuffer.push(vibe.title);
        if (historyBuffer.length > 5) historyBuffer.shift();
        console.log(`Smart Logic Selected: ${vibe.title} (Time: ${time}, Mood: ${targetVibe})`);
    }

    return vibe || globalVibes[0];
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
    if (document.querySelector('.hero-logo-container')) document.querySelector('.hero-logo-container').classList.add('hidden');
    if (document.querySelector('.subheading')) document.querySelector('.subheading').classList.add('hidden');
    if (document.querySelector('.slider-container')) document.querySelector('.slider-container').classList.add('hidden');
    if (document.querySelector('.mood-input-wrapper')) document.querySelector('.mood-input-wrapper').classList.add('hidden');
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
            setTimeout(() => showResult(), 600);
        }
    }, 500);
};

const showResult = (overrideVibe = null) => {
    const vibe = overrideVibe || getSmartVibe();

    els.vibeEmoji.textContent = vibe.emoji;
    els.vibeTitle.textContent = vibe.title;
    els.vibeActivity.textContent = vibe.activity;

    // New: Show Quote AND Instruction
    // Styling the quote as main text, instruction as subtitle
    els.vibeInstruction.innerHTML = `
        <span style="font-size: 1.1em; font-weight: 600; font-style: italic;">"${vibe.quote}"</span><br/>
        <span style="font-size: 0.9em; opacity: 0.8; margin-top: 5px; display: block;">${vibe.instruction}</span>
    `;

    const isFav = favorites.some(f => f.title === vibe.title);
    els.acceptBtn.textContent = isFav ? "Saved to Favorites ❤️" : "Save to Favorites 🤍";

    // Use cosmic theme
    applyColors(vibe.theme);

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

    // Use random easter egg phrase from global array
    const eggPhrase = phrases.easterEgg[Math.floor(Math.random() * phrases.easterEgg.length)];

    els.vibeActivity.textContent = eggPhrase;
    els.vibeInstruction.textContent = "The universe is judging your speed.";
};

const addToFavorites = () => {
    const currentVibeTitle = els.vibeTitle.textContent;
    const isFav = favorites.some(f => f.title === currentVibeTitle);

    if (isFav) return;

    const vibe = globalVibes.find(v => v.title === currentVibeTitle) || {
        title: currentVibeTitle,
        emoji: els.vibeEmoji.textContent,
        activity: els.vibeActivity.textContent,
        theme: "MilkyWay"
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

/**
 * Generate a shareable image from the current vibe card
 * Returns a Blob containing the PNG image
 */
const generateVibeImage = async () => {
    const title = els.vibeTitle.textContent;
    const emoji = els.vibeEmoji.textContent;
    const activity = els.vibeActivity.textContent;

    // Extract Quote and Instruction
    const spans = els.vibeInstruction.querySelectorAll('span');
    // If we have our new structure, use it. Otherwise fallback to text.
    const quote = spans.length > 0 ? spans[0].textContent.replace(/^"|"$/g, '') : "";
    const instruction = spans.length > 1 ? spans[1].textContent : els.vibeInstruction.textContent;

    // Get current gradient colors
    const color1 = getComputedStyle(document.documentElement).getPropertyValue('--bg-color-1').trim();
    const color2 = getComputedStyle(document.documentElement).getPropertyValue('--bg-color-2').trim();

    // Create temporary container for image generation
    const container = document.createElement('div');
    container.style.cssText = `
        position: fixed;
        top: -9999px;
        left: -9999px;
        width: 1080px;
        height: 1080px;
        background: linear-gradient(135deg, ${color1}, ${color2});
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 80px;
        box-sizing: border-box;
        font-family: 'Outfit', 'Inter', sans-serif;
        color: ${getComputedStyle(document.documentElement).getPropertyValue('--text-main')};
    `;

    container.innerHTML = `
        <div style="text-align: center; position: relative; z-index: 2;">
            <div style="font-size: 180px; margin-bottom: 40px; filter: drop-shadow(0 10px 30px rgba(0,0,0,0.3));">
                ${emoji}
            </div>
            <h2 style="font-size: 56px; font-weight: 700; margin: 0 0 30px 0; line-height: 1.2; max-width: 800px;">
                ${title}
            </h2>
            <p style="font-size: 36px; margin: 0 0 25px 0; opacity: 0.95; max-width: 800px; line-height: 1.4;">
                ${activity}
            </p>
            
            <div style="margin: 0 0 50px 0; max-width: 700px;">
                ${quote ? `<p style="font-size: 32px; font-weight: 600; font-style: italic; margin: 0 0 15px 0; line-height: 1.3;">"${quote}"</p>` : ''}
                <p style="font-size: 24px; opacity: 0.7; margin: 0;">
                    ${instruction}
                </p>
            </div>

            <div style="display: flex; align-items: center; justify-content: center; gap: 20px; margin-top: 40px;">
                <div style="width: 60px; height: 60px; border-radius: 50%; background: linear-gradient(135deg, rgba(108, 92, 231, 0.3), rgba(162, 155, 254, 0.3)); display: flex; align-items: center; justify-content: center; font-size: 32px; backdrop-filter: blur(10px);">✨</div>
                <p style="font-size: 32px; font-weight: 600; opacity: 0.8; margin: 0;">ZeroGravity</p>
            </div>
        </div>
    `;

    document.body.appendChild(container);

    try {
        // Generate canvas from HTML
        const canvas = await html2canvas(container, {
            backgroundColor: null,
            scale: 2, // High quality
            logging: false,
            useCORS: false, // Changed to false since we're not using external images
            allowTaint: false // Changed to false - no taint issues now
        });

        // Convert canvas to blob
        return new Promise((resolve, reject) => {
            canvas.toBlob((blob) => {
                document.body.removeChild(container);
                if (blob) {
                    resolve(blob);
                } else {
                    reject(new Error('Failed to generate image'));
                }
            }, 'image/png', 0.95);
        });
    } catch (error) {
        document.body.removeChild(container);
        throw error;
    }
};

/**
 * Show notification to user
 */
const showNotification = (message) => {
    const notification = document.createElement('div');
    notification.className = 'share-notification';
    notification.innerHTML = `<span>${message}</span>`;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(-50%) translateY(20px)';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
};

/**
 * Share vibe as image - main function
 */
const shareVibeAsImage = async () => {
    const title = els.vibeTitle.textContent;
    const emoji = els.vibeEmoji.textContent;
    const activity = els.vibeActivity.textContent;

    // Show loading state
    els.shareBtn.classList.add('share-generating');
    els.shareBtn.textContent = 'Generating...';

    try {
        // Generate the image
        const imageBlob = await generateVibeImage();

        // Prepare share data
        const shareText = `${emoji} ${title}\n${activity}\n\nDiscover your vibe on ZeroGravity ✨`;
        const shareUrl = window.location.href;

        // Try Web Share API (mobile/modern browsers)
        if (navigator.share && navigator.canShare && navigator.canShare({ files: [new File([imageBlob], 'vibe.png', { type: 'image/png' })] })) {
            const file = new File([imageBlob], 'my-zerogravity-vibe.png', { type: 'image/png' });

            try {
                await navigator.share({
                    title: 'My ZeroGravity Vibe',
                    text: shareText,
                    files: [file]
                });

                // Success - reset button
                els.shareBtn.classList.remove('share-generating');
                els.shareBtn.textContent = 'Share 📤';
                return;
            } catch (shareError) {
                // User cancelled or sharing failed, fall through to download
                if (shareError.name !== 'AbortError') {
                    console.log('Share failed, falling back to download');
                }
            }
        }

        // Fallback: Download the image
        const url = URL.createObjectURL(imageBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `zerogravity-vibe-${Date.now()}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);

        // Show notification
        showNotification('Image saved — share it anywhere ✨');

    } catch (error) {
        console.error('Share error:', error);
        showNotification('❌ Oops! Failed to generate image. Try again.');
    } finally {
        // Reset button state
        els.shareBtn.classList.remove('share-generating');
        els.shareBtn.textContent = 'Share 📤';
    }
};

// Keep old modal function for fallback or as alternative method
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
    if (document.querySelector('.mood-input-wrapper')) document.querySelector('.mood-input-wrapper').classList.remove('hidden');
    els.thinkingText.textContent = "Analyzing mental chaos...";
    els.acceptBtn.textContent = "Save to Favorites 🤍";
    // Clear input
    if (els.moodInput) els.moodInput.value = "";
};

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
