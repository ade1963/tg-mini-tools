document.addEventListener('DOMContentLoaded', async () => {
    UserData.Init();
    await TelegramApp.initData();
    await UserData.getTools();
    // Display user info
    document.getElementById('chat-id').textContent = TelegramApp.chatId;

    const toolSettings = await UserData.fetchToolSettings(TelegramApp.chatId, UserData.currentToolId);
    if (toolSettings != null)
        document.getElementById('tax-rate').value = toolSettings.taxRate;

    await UserData.getFavorities(TelegramApp.chatId);

    // Initialize ToolManager
    ToolManagerInstance.init();
});
