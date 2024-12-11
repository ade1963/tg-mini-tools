document.addEventListener('DOMContentLoaded', async () => {
    UserData.Init();
    await TelegramApp.initData();

    await UserData.getFavorites(TelegramApp.hashedChatId);

    // Initialize ToolManager
    ToolManagerInstance.init();
    ToolManagerInstance.switchTool(1); // default
    document.getElementById('chat-id').textContent = TelegramApp.hashedChatId;
});
