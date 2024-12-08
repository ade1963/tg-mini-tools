document.addEventListener('DOMContentLoaded', async () => {
    UserData.Init();
    await TelegramApp.initData();

    await UserData.getFavorities(TelegramApp.hashedChatId);

    const toolSettings = await UserData.fetchToolSettings(TelegramApp.hashedChatId, UserData.currentToolId);
    if (toolSettings != null)
        document.getElementById('tax-rate').value = toolSettings.taxRate;


    // Initialize ToolManager
    ToolManagerInstance.init();
});
