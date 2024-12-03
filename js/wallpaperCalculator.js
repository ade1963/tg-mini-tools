import { UserData, TelegramApp } from './user.js';

document.addEventListener('DOMContentLoaded', () => {
    const roomWidthInput = document.getElementById('room-width');
    const roomHeightInput = document.getElementById('room-height');
    const wallpaperWidthInput = document.getElementById('wallpaper-width');
    const wallpaperLengthInput = document.getElementById('wallpaper-length');
    const calculateWallpaperButton = document.getElementById('calculate-wallpaper');
    const rollsNeededSpan = document.getElementById('rolls-needed');

    // Fetch and restore settings when the page loads or tool is switched
    async function restoreSettings() {
        const settings = await UserData.fetchToolSettings(TelegramApp.chatId, UserData.currentToolId);
        if (settings) {
            roomWidthInput.value = settings.roomWidth || '';
            roomHeightInput.value = settings.roomHeight || '';
            wallpaperWidthInput.value = settings.wallpaperWidth || '';
            wallpaperLengthInput.value = settings.wallpaperLength || '';
            rollsNeededSpan.textContent = settings.rollsNeeded || '';
        }
    }

    restoreSettings();

    calculateWallpaperButton.addEventListener('click', async () => {
        const roomWidth = parseFloat(roomWidthInput.value);
        const roomHeight = parseFloat(roomHeightInput.value);
        const wallpaperWidth = parseFloat(wallpaperWidthInput.value);
        const wallpaperLength = parseFloat(wallpaperLengthInput.value);

        if (isNaN(roomWidth) || isNaN(roomHeight) || isNaN(wallpaperWidth) || isNaN(wallpaperLength)) {
            rollsNeededSpan.textContent = 'Invalid input';
            return;
        }

        const roomPerimeter = 2 * (roomWidth + roomHeight);
        const stripsPerRoll = Math.floor(wallpaperLength / roomHeight);
        const stripsNeeded = Math.ceil(roomPerimeter / wallpaperWidth);
        const rollsNeeded = Math.ceil(stripsNeeded / stripsPerRoll);

        rollsNeededSpan.textContent = rollsNeeded;

        // Save the parameters
        await UserData.saveToolSettings(TelegramApp.chatId, UserData.currentToolId, {
            roomWidth: roomWidth,
            roomHeight: roomHeight,
            wallpaperWidth: wallpaperWidth,
            wallpaperLength: wallpaperLength,
            rollsNeeded: rollsNeeded
        });
    });
});
