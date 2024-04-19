const handiCapToolbar = () => {
    const enlargeMouse = () => {
      // Implement functionality to enlarge mouse
    };
  
    const invertColors = () => {
      // Implement functionality to invert colors
    };
  
    const activateScreenReader = () => {
      // Implement functionality to activate screen reader
    };
  
    const toggleAccessibilityMenu = () => {
      const accessibilityMenu = document.querySelector('.accessibility-menu');
      accessibilityMenu.classList.toggle('active');
    };
  
    return `
      <div class="accessibility-widget">
        <button id="accessibility-toggle" aria-label="Accessibility Options" onclick="toggleAccessibilityMenu()">
          <span class="sr-only">Accessibility Options</span>
          <img src="icon.svg" alt="Accessibility Icon">
        </button>
        <div class="accessibility-menu" aria-hidden="true">
          <button onclick="enlargeMouse()">Enlarge Mouse</button>
          <button onclick="invertColors()">Invert Colors</button>
          <button onclick="activateScreenReader()">Activate Screen Reader</button>
        </div>
      </div>
    `;
  };
  
  export default handiCapToolbar;

  /* all these examples below are how to implement it into our main index.html file
  <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Accessible Features</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <script src="handiCapToolbar.js" type="module"></script>
  <script>
    import HandiCapToolbar from './handiCapToolbar.js';

    document.addEventListener('DOMContentLoaded', () => {
      const toolbarContainer = document.getElementById('toolbar-container');
      toolbarContainer.innerHTML = HandiCapToolbar();
    });
  </script>
  <div id="toolbar-container"></div>
</body>
</html>

*/