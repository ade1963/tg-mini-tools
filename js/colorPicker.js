document.addEventListener('DOMContentLoaded', async () => {
    const colorInput = document.getElementById('color-input');
    const matchColorButton = document.getElementById('match-color');
    const colorPreview = document.getElementById('color-preview');
    const colorMatchResult = document.getElementById('color-match-result');

    // Fetch and set saved settings
    const toolSettings = await UserData.fetchToolSettings(TelegramApp.hashedChatId, UserData.currentToolId);
    if (toolSettings != null) {
        colorInput.value = toolSettings.colorInput || '';
        if (toolSettings.colorInput) {
            colorPreview.style.backgroundColor = toolSettings.colorInput;
        }
    }

    matchColorButton.addEventListener('click', async () => {
        const color = colorInput.value.trim();
        if (!color) {
            colorMatchResult.textContent = 'Please enter a color.';
            colorPreview.style.backgroundColor = '';
            return;
        }

        // Set preview color
        colorPreview.style.backgroundColor = color;

        // Find the closest matching color (basic example)
        const closestColor = findClosestColor(color);
        colorMatchResult.textContent = closestColor;

        // Save the settings
        await UserData.saveToolSettings(TelegramApp.hashedChatId, UserData.currentToolId, {
            colorInput: color
        });
    });

    function findClosestColor(color) {
        // Basic color matching logic (can be improved)
        const colors = {
            'red': '#ff0000',
            'green': '#00ff00',
            'blue': '#0000ff',
            'yellow': '#ffff00',
            'black': '#000000',
            'white': '#ffffff',
            'gray': '#808080',
            'purple': '#800080',
            'orange': '#ffa500',
            'pink': '#ffc0cb'
        };

        let closestMatch = null;
        let minDistance = Infinity;

        const inputColor = parseColor(color);

        if (!inputColor) {
            return 'Invalid color';
        }

        for (const colorName in colors) {
            const colorValue = parseColor(colors[colorName]);
            const distance = colorDistance(inputColor, colorValue);

            if (distance < minDistance) {
                minDistance = distance;
                closestMatch = colorName;
            }
        }
        return closestMatch;
    }

    function parseColor(color) {
        // Check if the color is a hex code
        const hexMatch = color.match(/^#([0-9a-f]{3}){1,2}$/i);
        if (hexMatch) {
            let hex = hexMatch[1];
            if (hex.length === 3) {
                hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
            }
            const r = parseInt(hex.substring(0, 2), 16);
            const g = parseInt(hex.substring(2, 4), 16);
            const b = parseInt(hex.substring(4, 6), 16);
            return { r, g, b };
        }

        // Check if the color is a named color
        const namedColors = {
            'red': { r: 255, g: 0, b: 0 },
            'green': { r: 0, g: 255, b: 0 },
            'blue': { r: 0, g: 0, b: 255 },
            'yellow': { r: 255, g: 255, b: 0 },
            'black': { r: 0, g: 0, b: 0 },
            'white': { r: 255, g: 255, b: 255 },
            'gray': { r: 128, g: 128, b: 128 },
            'purple': { r: 128, g: 0, b: 128 },
            'orange': { r: 255, g: 165, b: 0 },
            'pink': { r: 255, g: 192, b: 203 }
        };

        if (namedColors[color.toLowerCase()]) {
            return namedColors[color.toLowerCase()];
        }

        return null;
    }

    function colorDistance(color1, color2) {
        const rDiff = color1.r - color2.r;
        const gDiff = color1.g - color2.g;
        const bDiff = color1.b - color2.b;
        return Math.sqrt(rDiff * rDiff + gDiff * gDiff + bDiff * bDiff);
    }
});
