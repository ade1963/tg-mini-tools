
// not working, return empty strnig
function generateUserHash(chat_id) {
        const salt = 'non_random_salt_123'; //no way to store salt securely
        // Combine the chat_id and salt into a single string
        const data = `${chat_id}:${salt}`;
        
        // Encode the data as a Uint8Array
        const encoder = new TextEncoder();
        const dataBuffer = encoder.encode(data);
        
        // Generate the hash using SHA-256
        const hashBuffer = crypto.subtle.digest('SHA-256', dataBuffer);
        
        // Convert the hash buffer to a hexadecimal string
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        console.error(`Hash: ${hashHex}`);
        
        return hashHex;
};

// Simple hash function (based on djb2)
function simpleHash(chat_id) {
    const salt = 'non_random_salt_123'; //no way to store salt securely
    const input = `${chat_id}:${salt}`; // Combine chat_id and salt
    let hash = 5381; // Initialize with a prime number
    for (let i = 0; i < input.length; i++) {
        hash = (hash * 33) ^ input.charCodeAt(i); // Multiply hash by 33 and XOR with the character code
    }
    return (hash >>> 0).toString(16); // Convert to an unsigned 32-bit integer in hex
}

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
                        this.hashedChatId = simpleHash(this.initData.user.id);
                        this.username = this.initData.user.last_name;
                    } else {
                        this.hashedChatId='01';
                        console.error('User data not found in initData:', this.initData);
                    }
                } catch (error) {
                        this.hashedChatId='02';
                    console.error('Error parsing initData:', error);
                }
            } else {
                        this.hashedChatId='02';
                console.error('initData is not provided');
            }
        } catch (error) {
                        this.hashedChatId='03';
                console.error('error fetching Telegram data');
        }
    },

    getQueryParam(name) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(name);
    }


};
