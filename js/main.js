document.addEventListener('DOMContentLoaded', async () => {
    UserData.Init();
    await TelegramApp.initData();

    const toolSettings = await UserData.fetchToolSettings(TelegramApp.hashedChatId, UserData.currentToolId);
    if (toolSettings != null)
        document.getElementById('tax-rate').value = toolSettings.taxRate;

    await UserData.getFavorities(TelegramApp.hashedChatId);

    // Initialize ToolManager
    ToolManagerInstance.init();
});
