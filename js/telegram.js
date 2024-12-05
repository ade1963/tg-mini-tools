//const crypto = require('crypto');

const TelegramApp = {
    initData: null,
    username: null,
    hashedChatId: null,

    async initData() {
        //this.chatId = 'undefined';
        //const initData = this.getQueryParam('initData');
        const DEFAULT_USER = 12345;
        this.hashedChatId = DEFAULT_USER;
        
        Telegram.WebApp.ready()
        try {
            //default user
            const initData = Telegram.WebApp.initDataUnsafe;
    
            console.log('initData:', initData); // Debug log
            if (initData) {
                try {
                    this.initData = initData;
    
                    if (this.initData.user) {
                        this.hashedChatId = generateUserHash(this.initData.user.id);
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
                console.error('error fetching Telegram data');
        }
    },

    getQueryParam(name) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(name);
    },

    /*
    generateUserHash(chat_id) {
        const hash = crypto.createHmac('sha256', salt) // Using HMAC with SHA-256
                       .update(chat_id.toString()) // Convert chat_id to string before hashing
                       .digest('hex'); // Get the hash as a hex string
        return hash;
    }
    */
    async generateUserHash(chat_id) {
        const salt = 'non_random_salt_123'; //no way to store salt securely
        // Combine the chat_id and salt into a single string
        const data = `${chat_id}:${salt}`;
        
        // Encode the data as a Uint8Array
        const encoder = new TextEncoder();
        const dataBuffer = encoder.encode(data);
        
        // Generate the hash using SHA-256
        const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer);
        
        // Convert the hash buffer to a hexadecimal string
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        
        return hashHex;
    }

};
