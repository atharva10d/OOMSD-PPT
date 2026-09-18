(function () {
  'use strict';
  
  // Define slide sequence
  var playlist = [
    "title.html",
    "agenda.html",
    "problem-identification.html",
    "literature-review.html",
    "smart-objectives.html",
    "project-scope.html",
    "system-methodology.html",
    "vision-pipeline.html",
    "genai-root-cause.html",
    "architecture-reporting.html",
    "feasibility-plan.html",
    "work-plan-timeline.html",
    "expected-outcomes.html",
    "references.html"
  ];

  function scale() {
    var container = document.querySelector('.slide-container');
    if (!container) return;

    var W = 1920;
    var H = 1080;
    var vw = window.innerWidth;
    var vh = window.innerHeight;

    var ratio = Math.min(vw / W, vh / H);
    
    // Set the CSS variable that the CSS relies on due to !important
    container.style.setProperty('--slide-scale', ratio);
  }

  // Run immediately
  scale();
  
  // Re-run on resize
  window.addEventListener('resize', scale);
  
  // Animation setup
  const ENTRANCE_ANIMS = ['anim-prof-fade', 'anim-prof-slide-up', 'anim-prof-scale-up', 'anim-prof-blur'];
  let isAnimatingOut = false;

  window.addEventListener('DOMContentLoaded', () => {
      const container = document.querySelector('.slide-container');
      if (container) {
          let currentFile = window.location.pathname.split('/').pop() || "title (1).html";
          currentFile = decodeURIComponent(currentFile.split('?')[0].split('#')[0]);
          let idx = Math.max(0, playlist.indexOf(currentFile));
          
          const PPT_TRANSITIONS = [
              'anim-fade',     // 01 title
              'anim-morph',    // 02 agenda
              'anim-push',     // 03 problem
              'anim-wipe',     // 04 lit review
              'anim-zoom',     // 05 smart obj
              'anim-split',    // 06 scope
              'anim-cube',     // 07 methodology
              'anim-reveal',   // 08 vision pipeline
              'anim-cover',    // 09 genai root cause
              'anim-pan',      // 10 architecture
              'anim-fracture', // 11 feasibility
              'anim-switch',   // 12 timeline
              'anim-morph',    // 13 outcomes
              'anim-fade'      // 14 references
          ];
          
          let entranceAnim = PPT_TRANSITIONS[idx];
          if (!entranceAnim) {
              entranceAnim = 'anim-fade';
          }
          
          container.classList.add(entranceAnim);
      }
  });

  // Setup Navigation
  function navigate(direction) {
      if (isAnimatingOut) return;

      const currentPath = window.location.pathname;
      let currentFile = currentPath.split('/').pop();
      if (!currentFile || currentFile === '') currentFile = playlist[0]; 
      currentFile = decodeURIComponent(currentFile.split('?')[0].split('#')[0]);
  
      const currentIndex = playlist.indexOf(currentFile);
      if (currentIndex === -1) return;
  
      const nextIndex = currentIndex + direction;
      if (nextIndex >= 0 && nextIndex < playlist.length) {
          isAnimatingOut = true;
          window.location.href = playlist[nextIndex];
      }
  }
  
  window.addEventListener('keydown', (e) => {
      if (['ArrowRight', 'PageDown', ' '].includes(e.key)) navigate(1);
      else if (['ArrowLeft', 'PageUp', 'Backspace'].includes(e.key)) navigate(-1);
  });
  
  window.addEventListener('click', (e) => {
      if (window.getSelection().toString().length > 0) return;
      if (e.target.closest('a')) return;
      if (e.clientX > window.innerWidth / 2) navigate(1);
      else navigate(-1);
  });
})();
