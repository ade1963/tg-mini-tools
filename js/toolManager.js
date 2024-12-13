class ToolManager {
    constructor() {
        this.tools = [
            { id: 1, name: 'Calculator', iconId: 'calculator-icon', divId: 'calculator' },
            { id: 2, name: 'Scanner', iconId: 'scanner-icon', divId: 'scanner' },
            { id: 3, name: 'Wallpaper Calculator', iconId: 'wallpaper-icon', divId: 'wallpaper-calculator' },
            { id: 4, name: 'Unit Converter', iconId: 'unit-icon', divId: 'unit-converter' },
            { id: 5, name: 'Minesweeper', iconId: 'minesweeper-icon', divId: 'minesweeper' },
            { id: 6, name: 'Color Picker', iconId: 'color-picker-icon', divId: 'color-picker' },
            { id: 7, name: 'Date Calculator', iconId: 'date-calculator-icon', divId: 'date-calculator' }
        ];
    }

    init() {
        this.tools.forEach(tool => {
            const icon = document.getElementById(tool.iconId);
            icon.addEventListener('click', () => this.switchTool(tool.id));
        });
    }

    async switchTool(toolId) {
        this.tools.forEach(tool => {
            const div = document.getElementById(tool.divId);
            if (tool.id === toolId) {
                div.style.display = 'block';
                document.getElementById(tool.iconId).classList.add('active');
                if (tool.id !== 2) { // If not the scanner tool
                    this.stopCamera();
                }
            } else {
                div.style.display = 'none';
                document.getElementById(tool.iconId).classList.remove('active');
            }
        });

        // Update current tool ID and fetch settings if available
        UserData.currentToolId = toolId;
        if (toolId === 3) { // Wallpaper Calculator
            const toolSettings = await UserData.fetchToolSettings(TelegramApp.hashedChatId, UserData.currentToolId);
            if (toolSettings != null) {
                document.getElementById('room-width').value = toolSettings.roomWidth || '';
                document.getElementById('room-height').value = toolSettings.roomHeight || '';
                document.getElementById('wallpaper-width').value = toolSettings.wallpaperWidth || '';
                document.getElementById('wallpaper-length').value = toolSettings.wallpaperLength || '';
            }
        } else if (toolId === 1) { // Tax Calculator
            const toolSettings = await UserData.fetchToolSettings(TelegramApp.hashedChatId, UserData.currentToolId);
            if (toolSettings != null) {
                document.getElementById('tax-rate').value = toolSettings.taxRate || '';
            }
        }
    }

    stopCamera() {
        const video = document.getElementById('video');
        if (video.srcObject) {
            video.srcObject.getTracks().forEach(track => track.stop());
            video.style.display = 'none';
            document.getElementById('canvas').style.display = 'none';
            document.getElementById('start-camera').textContent = 'Start Camera';
        }
    }
}

const ToolManagerInstance = new ToolManager();
