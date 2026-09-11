const playlist = [
    "title.html",
    "real-world-problem.html",
    "proposed-solution.html",
    "booking-journey.html",
    "system-architecture.html",
    "why-solid-matters.html",
    "single-responsibility.html",
    "open-closed.html",
    "liskov-substitution.html",
    "interface-segregation.html",
    "dependency-inversion.html",
    "crc-cards.html",
    "class-diagram.html",
    "use-case-diagram.html",
    "sequence-diagram.html",
    "er-diagram.html",
    "normalization.html",
    "thank-you.html"
];

const ENTRANCE_ANIMS = ['anim-prof-fade', 'anim-prof-slide-up', 'anim-prof-scale-up', 'anim-prof-blur'];
let isAnimatingOut = false;

function scaleSlide() {
    const container = document.querySelector('.slide-container');
    if (!container) return;
    
    // Calculate the scale factor needed to fit the screen
    const scale = Math.min(window.innerWidth / 1920, window.innerHeight / 1080);
    
    container.style.setProperty('position', 'absolute', 'important');
    container.style.setProperty('left', '50%', 'important');
    container.style.setProperty('top', '50%', 'important');
    container.style.setProperty('transform-origin', 'center center', 'important');
    container.style.setProperty('margin', '0', 'important');
    
    // Set a custom CSS property for the CSS animations to use
    container.style.setProperty('--dynamic-scale', scale);
    
    // Fallback transform without !important so CSS animations can override it
    container.style.transform = `translate(-50%, -50%) scale(${scale})`;
}

// Run on load and whenever the window is resized
window.addEventListener('resize', scaleSlide);
window.addEventListener('DOMContentLoaded', () => {
    scaleSlide();
    
    const container = document.querySelector('.slide-container');
    if (container) {
        let currentFile = window.location.pathname.split('/').pop() || "title.html";
        currentFile = currentFile.split('?')[0].split('#')[0];
        let idx = Math.max(0, playlist.indexOf(currentFile));
        
        const SPECIAL_ANIMS = {
            'system-architecture.html': 'anim-catchy-flip',
            'why-solid-matters.html': 'anim-catchy-swoosh',
            'er-diagram.html': 'anim-catchy-zoom-spin',
            'thank-you.html': 'anim-catchy-bounce'
        };
        
        let entranceAnim = SPECIAL_ANIMS[currentFile];
        if (!entranceAnim) {
            // Cycle through the unique professional entrance animations for other slides
            entranceAnim = ENTRANCE_ANIMS[idx % ENTRANCE_ANIMS.length];
        }
        
        container.classList.add(entranceAnim);
    }
});

// Also run immediately just in case
scaleSlide();

function navigate(direction) {
    if (isAnimatingOut) return;

    const currentPath = window.location.pathname;
    let currentFile = currentPath.split('/').pop();
    if (!currentFile || currentFile === '') currentFile = "title.html"; 
    currentFile = currentFile.split('?')[0].split('#')[0];

    const currentIndex = playlist.indexOf(currentFile);
    if (currentIndex === -1) return;

    const nextIndex = currentIndex + direction;
    if (nextIndex >= 0 && nextIndex < playlist.length) {
        isAnimatingOut = true;
        const container = document.querySelector('.slide-container');
        
        // Remove the entrance animation classes to avoid conflicts
        ENTRANCE_ANIMS.forEach(cls => container.classList.remove(cls));
        
        // Choose exit animation based on direction
        const exitAnim = direction > 0 ? 'anim-prof-exit-forward' : 'anim-prof-exit-backward';
        container.classList.add(exitAnim);
        
        // Wait for the animation to complete before actually changing the URL
        setTimeout(() => {
            window.location.href = playlist[nextIndex];
        }, 380); // slightly shorter than 400ms to feel responsive
    }
}

// Keyboard Navigation
window.addEventListener('keydown', (e) => {
    if (['ArrowRight', 'PageDown', ' '].includes(e.key)) {
        navigate(1);
    } else if (['ArrowLeft', 'PageUp', 'Backspace'].includes(e.key)) {
        navigate(-1);
    }
});

// Click Navigation
window.addEventListener('click', (e) => {
    // Prevent navigation if the user is selecting text
    if (window.getSelection().toString().length > 0) return;
    
    // Ignore clicks on explicit links
    if (e.target.closest('a')) return;

    if (e.clientX > window.innerWidth / 2) {
        navigate(1); // Right half clicked
    } else {
        navigate(-1); // Left half clicked
    }
});
