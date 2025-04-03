/**
 * Updates CSS custom properties based on viewport size
 * to maintain proportional scaling
 */
export function updateScaleFactors() {
  const designWidth = 1440; // Your design canvas width
  const currentWidth = window.innerWidth;

  // Calculate scale based on viewport width relative to design
  let scaleFactor = currentWidth / designWidth;

  // Clamp the scale factor to prevent extreme scaling
  scaleFactor = Math.max(0.7, Math.min(scaleFactor, 1.2));

  // Update CSS custom property
  document.documentElement.style.setProperty("--scale-factor", scaleFactor);
}

// Initialize on load
document.addEventListener("DOMContentLoaded", () => {
  updateScaleFactors();

  // Update on resize
  window.addEventListener("resize", () => {
    updateScaleFactors();
  });
});
