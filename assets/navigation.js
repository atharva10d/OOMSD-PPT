const slides = [
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

document.addEventListener("DOMContentLoaded", () => {
  const currentPath = window.location.pathname;
  let currentFile = currentPath.split("/").pop();
  
  if (currentFile === "" || currentFile === "index.html") {
    currentFile = "title.html";
  }

  let currentIndex = slides.indexOf(currentFile);
  
  if (currentIndex === -1) {
    currentIndex = 0;
  }

  const navigateTo = (url) => {
    // Add fade out animation class defined in theme.css
    document.body.classList.add("fade-out");
    // Wait for animation to finish before changing URL
    setTimeout(() => {
      window.location.href = url;
    }, 380);
  };

  const goNext = () => {
    if (currentIndex < slides.length - 1) {
      navigateTo(slides[currentIndex + 1]);
    }
  };

  const goPrev = () => {
    if (currentIndex > 0) {
      navigateTo(slides[currentIndex - 1]);
    }
  };

  // Keyboard navigation
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight" || e.key === " " || e.key === "PageDown") {
      goNext();
    } else if (e.key === "ArrowLeft" || e.key === "Backspace" || e.key === "PageUp") {
      goPrev();
    }
  });
});
