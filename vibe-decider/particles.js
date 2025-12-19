/**
 * Antigravity Particle System
 * Creates a floating particle effect that responds to the vibe theme.
 */

class ParticleSystem {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;

        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.resize();
        this.themeColors = ['rgba(255, 255, 255, 0.5)']; // Default

        window.addEventListener('resize', () => this.resize());
        this.animate();
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    setTheme(colors) {
        // Convert hex/rgb to having opacity
        // For simplicity, we'll just use the hexes provided and add global alpha or process them later
        // We'll create a palette from the vibe colors
        this.themeColors = colors;
    }

    createParticle() {
        return {
            x: Math.random() * this.canvas.width,
            y: this.canvas.height + 10,
            size: Math.random() * 3 + 1,
            speedY: Math.random() * 1 + 0.2, // Float up slowly
            speedX: (Math.random() - 0.5) * 0.5, // Drift slightly
            color: this.themeColors[Math.floor(Math.random() * this.themeColors.length)],
            alpha: Math.random() * 0.5 + 0.1
        };
    }

    update() {
        // Add new particles occasionally
        if (this.particles.length < 100) {
            this.particles.push(this.createParticle());
        }

        // Update existing particles
        for (let i = 0; i < this.particles.length; i++) {
            const p = this.particles[i];
            p.y -= p.speedY;
            p.x += p.speedX;
            p.alpha -= 0.001; // Fade out slowly

            // Remove if off screen or invisible
            if (p.y < -10 || p.alpha <= 0) {
                this.particles.splice(i, 1);
                i--;
            }
        }
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.particles.forEach(p => {
            this.ctx.fillStyle = p.color;
            this.ctx.globalAlpha = p.alpha;
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            this.ctx.fill();
        });
        this.ctx.globalAlpha = 1;
    }

    animate() {
        this.update();
        this.draw();
        requestAnimationFrame(() => this.animate());
    }
}

// Export a singleton or factory
export const initParticles = () => {
    return new ParticleSystem('particle-canvas');
};
