// Confetti Stolen from this guy 
// "https://codepen.io/jonathanbell/pen/OvYVYw" on codepen
let W = window.innerWidth;
let H = window.innerHeight;
const maxConfettis = 150;
const particles = [];
const possibleColors = [
    "DodgerBlue",
    "OliveDrab",
    "Gold",
    "Pink",
    "SlateBlue",
    "LightBlue",
    "Gold",
    "Violet",
    "PaleGreen",
    "SteelBlue",
    "SandyBrown",
    "Chocolate",
    "Crimson"
];

let animationId = null;
let canvas;
let context;

function initConfetti() {
    canvas = document.getElementById("canvas");
    if (!canvas) {
        canvas = document.createElement('canvas');
        canvas.id = 'canvas';
        canvas.style.position = 'fixed';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.pointerEvents = 'none';
        canvas.style.zIndex = '1';
        document.body.appendChild(canvas);
    }
    context = canvas.getContext("2d");
    canvas.width = W;
    canvas.height = H;
}

function randomFromTo(from, to) {
    return Math.floor(Math.random() * (to - from + 1) + from);
}

function confettiParticle() {
    this.x = Math.random() * W;
    this.y = Math.random() * H - H;
    this.r = randomFromTo(11, 33);
    this.d = Math.random() * maxConfettis + 11;
    this.color = possibleColors[Math.floor(Math.random() * possibleColors.length)];
    this.tilt = Math.floor(Math.random() * 33) - 11;
    this.tiltAngleIncremental = Math.random() * 0.07 + 0.05;
    this.tiltAngle = 0;

    this.draw = function() {
        context.beginPath();
        context.lineWidth = this.r / 2;
        context.strokeStyle = this.color;
        context.moveTo(this.x + this.tilt + this.r / 3, this.y);
        context.lineTo(this.x + this.tilt, this.y + this.tilt + this.r / 5);
        return context.stroke();
    };
}

function Draw() {
    const results = [];
    animationId = requestAnimationFrame(Draw);
    context.clearRect(0, 0, W, window.innerHeight);
    
    for (var i = 0; i < maxConfettis; i++) {
        results.push(particles[i].draw());
    }
    
    let particle = {};
    let remainingFlakes = 0;
    for (var i = 0; i < maxConfettis; i++) {
        particle = particles[i];
        particle.tiltAngle += particle.tiltAngleIncremental;
        particle.y += (Math.cos(particle.d) + 3 + particle.r / 2) / 2;
        particle.tilt = Math.sin(particle.tiltAngle - i / 3) * 15;
        if (particle.y <= H) remainingFlakes++;
        
        if (particle.x > W + 30 || particle.x < -30 || particle.y > H) {
            particle.x = Math.random() * W;
            particle.y = -30;
            particle.tilt = Math.floor(Math.random() * 10) - 20;
        }
    }
    return results;
}

window.addEventListener("resize", function() {
    W = window.innerWidth;
    H = window.innerHeight;
    if (canvas) canvas.width = window.innerWidth;
}, false);

function startConfetti() {
    if (!canvas) initConfetti();
    // Clear existing particles if any
    particles.length = 0;
    // Push new confetti objects to `particles[]`
    for (var i = 0; i < maxConfettis; i++) {
        particles.push(new confettiParticle());
    }
    // Start animation if not already running
    if (!animationId) Draw();
}

function stopConfetti() {
    if (animationId) {
        cancelAnimationFrame(animationId);
        animationId = null;
    }
    if (canvas) {
        context.clearRect(0, 0, W, H);
    }
}
