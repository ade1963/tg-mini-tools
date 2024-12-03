const TelegramApp = {
    initData: null,
    chatId: null,
    username: null,

    async initData() {
        //this.chatId = 'undefined';
        //const initData = this.getQueryParam('initData');
        const DEFAULT_USER = 12345;
        this.chatId = DEFAULT_USER;
        Telegram.WebApp.ready()
        try {
            //default user
            const initData = Telegram.WebApp.initDataUnsafe;
    
            console.log('initData:', initData); // Debug log
            if (initData) {
                //this.chatId = 'json:' + JSON.stringify(initData);
                try {
                    this.initData = initData;
    
                    if (this.initData.user) {
                        this.chatId = this.initData.user.id;
                        this.username = this.initData.user.last_name;
                    } else {
                        console.error('User data not found in initData:', this.initData);
                    }
                } catch (error) {
                    console.error('Error parsing initData:', error);
                }
            } else {
                console.error('initData is not provided');
            }
        } catch (error) {
            //this.chatId = 'initData is not READY';
        }
    },

    getQueryParam(name) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(name);
    }
};
