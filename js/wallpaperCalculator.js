document.addEventListener('DOMContentLoaded', async () => {
    const roomWidthInput = document.getElementById('room-width');
    const roomHeightInput = document.getElementById('room-height');
    const wallpaperWidthInput = document.getElementById('wallpaper-width');
    const wallpaperLengthInput = document.getElementById('wallpaper-length');
    const calculateWallpaperButton = document.getElementById('calculate-wallpaper');
    const rollsNeededSpan = document.getElementById('rolls-needed');

    // Fetch and set saved settings
    const toolSettings = await UserData.fetchToolSettings(TelegramApp.hashedChatId, UserData.currentToolId);
    if (toolSettings != null) {
        roomWidthInput.value = toolSettings.roomWidth || '';
        roomHeightInput.value = toolSettings.roomHeight || '';
        wallpaperWidthInput.value = toolSettings.wallpaperWidth || '';
        wallpaperLengthInput.value = toolSettings.wallpaperLength || '';
    }

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

        // Save the settings
        await UserData.saveToolSettings(TelegramApp.hashedChatId, UserData.currentToolId, {
            roomWidth: roomWidth,
            roomHeight: roomHeight,
            wallpaperWidth: wallpaperWidth,
            wallpaperLength: wallpaperLength
        });
    });
});
